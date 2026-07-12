const express = require('express');
const path = require('path');
const { sequelize, User } = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const { Announcement, Document, Contact, FAQ, Inquiry, LeasingInfo } = require('./db');

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
    let attempt = 0;
    const maxAttempts = 5;
    let listenPort = port;

    const tryListen = () => {
      const server = app.listen(listenPort, () => {
        console.log(`Server listening on http://localhost:${listenPort}`);
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
