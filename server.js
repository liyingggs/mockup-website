const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { Op } = require('sequelize');
const { sequelize, User } = require('./db');

const app = express();
const port = process.env.PORT || 4000;
const sqlSeedPath = path.join(__dirname, 'database.sql');
let sqlKnowledgeBase = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Announcements
const {
  Announcement,
  Document,
  Contact,
  FAQ,
  Inquiry,
  LeasingInfo,
  ChatbotKnowledge,
} = require('./db');
const chatbotKnowledgeData = require('./chatbotKnowledgeData');

const normalizeText = (value = '') => value.toLowerCase().trim();

const parseKnowledgeBaseRows = (sqlScript) => {
  const rows = [];
  const insertBlockRegex = /INSERT INTO knowledge_base \(category, question, answer, keywords\) VALUES([\s\S]*?);/gi;
  const tupleRegex = /\(\s*'((?:''|[^'])*)'\s*,\s*'((?:''|[^'])*)'\s*,\s*'((?:''|[^'])*)'\s*,\s*'((?:''|[^'])*)'\s*\)/g;

  let blockMatch;
  while ((blockMatch = insertBlockRegex.exec(sqlScript)) !== null) {
    const block = blockMatch[1];
    let tupleMatch;

    while ((tupleMatch = tupleRegex.exec(block)) !== null) {
      rows.push({
        category: tupleMatch[1].replace(/''/g, "'"),
        question: tupleMatch[2].replace(/''/g, "'"),
        answer: tupleMatch[3].replace(/''/g, "'"),
        keywords: tupleMatch[4].replace(/''/g, "'"),
      });
    }
  }

  return rows;
};

const loadKnowledgeBaseFromSqlFile = async () => {
  const sqlScript = await fs.readFile(sqlSeedPath, 'utf8');
  sqlKnowledgeBase = parseKnowledgeBaseRows(sqlScript);
  console.log(`Loaded ${sqlKnowledgeBase.length} chatbot entries from database.sql.`);
};

const scoreKnowledge = (normalizedQuery, keywords = '', topic = '') => {
  const terms = keywords
    .split(',')
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);

  if (normalizeText(topic) && normalizedQuery.includes(normalizeText(topic))) {
    return 100;
  }

  let score = 0;
  terms.forEach((term) => {
    if (normalizedQuery.includes(term)) {
      score += term.split(' ').length > 1 ? 4 : 2;
    }
  });
  return score;
};

const findChatbotResponse = async (message) => {
  const normalizedQuery = normalizeText(message);

  if (!normalizedQuery) {
    return {
      text: 'Ask about any stage, chapter, submission, or document and I will try to help.',
      canHelp: true,
    };
  }

  if (sqlKnowledgeBase.length === 0) {
    try {
      await loadKnowledgeBaseFromSqlFile();
    } catch (error) {
      console.warn('Unable to read database.sql for chatbot:', error.message);
    }
  }

  const sqlMatch = sqlKnowledgeBase
    .map((entry) => {
      const question = normalizeText(entry.question);
      const keywords = normalizeText(entry.keywords);
      const category = normalizeText(entry.category);

      const score =
        (question.includes(normalizedQuery) ? 5 : 0)
        + (keywords.includes(normalizedQuery) ? 4 : 0)
        + (category.includes(normalizedQuery) ? 2 : 0);

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0];

  if (sqlMatch) {
    return {
      text: sqlMatch.entry.answer,
      canHelp: true,
      source: 'knowledge-base-sql-file',
    };
  }

  const knowledgeEntries = await ChatbotKnowledge.findAll({
    order: [['priority', 'DESC'], ['updatedAt', 'DESC']],
  });

  let bestEntry = null;
  let bestScore = 0;

  knowledgeEntries.forEach((entry) => {
    const score = scoreKnowledge(normalizedQuery, entry.keywords, entry.topic);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  });

  if (bestEntry && bestScore > 0) {
    return {
      text: bestEntry.answer,
      canHelp: true,
      source: 'knowledge-base',
    };
  }

  const faqMatch = await FAQ.findOne({
    where: {
      [Op.or]: [
        { question: { [Op.like]: `%${message}%` } },
        { answer: { [Op.like]: `%${message}%` } },
      ],
    },
    order: [['updatedAt', 'DESC']],
  });

  if (faqMatch) {
    return {
      text: faqMatch.answer || faqMatch.question,
      canHelp: true,
      source: 'faq',
    };
  }

  return {
    text: 'I cannot help with that confidently. Please use the contact form so the team can follow up properly.',
    canHelp: false,
  };
};

app.post('/api/chatbot/query', async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await findChatbotResponse(message || '');
    res.json(reply);
  } catch (error) {
    res.status(500).json({
      text: 'Something went wrong while searching the knowledge base.',
      canHelp: false,
      error: error.message,
    });
  }
});

app.get('/api/announcements', async (req, res) => {
  const list = await Announcement.findAll({ order: [['publishedAt', 'DESC']] });
  res.json(list);
});

app.post('/api/announcements', async (req, res) => {
  const { title, body } = req.body;
  try {
    const a = await Announcement.create({ title, body });
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Documents (forms, downloads)
app.get('/api/documents', async (req, res) => {
  const docs = await Document.findAll({ order: [['name', 'ASC']] });
  res.json(docs);
});

// Contacts
app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.findAll({ order: [['department', 'ASC']] });
  res.json(contacts);
});

// FAQ
app.get('/api/faqs', async (req, res) => {
  const faqs = await FAQ.findAll();
  res.json(faqs);
});

// Leasing info
app.get('/api/leasing', async (req, res) => {
  const info = await LeasingInfo.findAll();
  res.json(info);
});

// Inquiries / FAQ submissions
app.post('/api/inquiries', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const q = await Inquiry.create({ name, email, subject, message });
    res.status(201).json({ success: true, inquiry: q });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.render('index');
  });
}

const startServer = async () => {
  try {
    await sequelize.sync();

    const kbCount = await ChatbotKnowledge.count();
    if (kbCount === 0) {
      await ChatbotKnowledge.bulkCreate(chatbotKnowledgeData);
      console.log('Seeded default chatbot knowledge entries.');
    }

    let attempt = 0;
    const maxAttempts = 5;
    let listenPort = port;

    const tryListen = () => {
      const server = app.listen(listenPort, () => {
        console.log(`Server listening on http://localhost:${listenPort}`);

        loadKnowledgeBaseFromSqlFile().catch((error) => {
          console.warn('Unable to load database.sql at startup:', error.message);
        });
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempt < maxAttempts) {
          attempt += 1;
          listenPort += 1;
          console.warn(`Port ${listenPort - 1} in use, trying ${listenPort}...`);
          setTimeout(tryListen, 200);
        } else {
          console.error('Unable to start server:', err);
        }
      });
    };

    tryListen();
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();
