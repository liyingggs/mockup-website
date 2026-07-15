import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { assistantKnowledge, journeyStages, manualChapters } from '../data/portalContent';

function getReply(query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return {
      text: 'Ask about any stage, chapter, submission, or document and I will try to help.',
      canHelp: true,
    };
  }

  const knowledgeMatch = assistantKnowledge.find((entry) => (
    entry.keywords.some((keyword) => normalized.includes(keyword))
  ));

  if (knowledgeMatch) {
    return {
      text: knowledgeMatch.answer,
      canHelp: true,
    };
  }

  const journeyMatch = journeyStages.find((stage) => (
    normalized.includes(stage.title.toLowerCase()) ||
    normalized.includes(stage.phase.toLowerCase()) ||
    normalized.includes(stage.tenancyLabel.toLowerCase())
  ));

  if (journeyMatch) {
    return {
      text: `${journeyMatch.tenancyLabel} ${journeyMatch.number} ${journeyMatch.title}: ${journeyMatch.overview} Key actions include ${journeyMatch.actions.slice(0, 2).join(' and ')}.`,
      canHelp: true,
    };
  }

  const manualMatch = manualChapters.find((chapter) => (
    normalized.includes(chapter.shortTitle.toLowerCase()) ||
    normalized.includes(chapter.title.toLowerCase()) ||
    chapter.sections.some((section) => normalized.includes(section.toLowerCase()))
  ));

  if (manualMatch) {
    return {
      text: `${manualMatch.title}: ${manualMatch.summary} Key topics include ${manualMatch.sections.slice(0, 2).join(' and ')}.`,
      canHelp: true,
    };
  }

  return {
    text: 'I cannot help with that confidently. Please use the contact form so the team can follow up properly.',
    canHelp: false,
  };
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ask me about the 13-stage journey, the manual, or submission requirements.',
      canHelp: true,
    },
  ]);

  const suggestions = useMemo(() => [
    'What is landlord submission?',
    'What happens during contractor onboarding?',
    'Show me concept briefing topics',
  ], []);

  const sendMessage = (value) => {
    const nextValue = value.trim();

    if (!nextValue) {
      return;
    }

    const reply = getReply(nextValue);

    setMessages((current) => ([
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text: nextValue },
      { id: `assistant-${Date.now() + 1}`, role: 'assistant', text: reply.text, canHelp: reply.canHelp },
    ]));
    setInput('');
  };

  return (
    <div className="chatbot-shell">
      {isOpen ? (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <p className="eyebrow">AI Chatbot</p>
              <h4>Quick tenant help</h4>
            </div>
            <button type="button" className="chip-button" onClick={() => setIsOpen(false)}>Close</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={message.role === 'user' ? 'chatbot-message user' : 'chatbot-message assistant'}>
                <p>{message.text}</p>
                {message.role === 'assistant' && message.canHelp === false ? (
                  <Link className="text-link" to="/contact">Open contact form</Link>
                ) : null}
              </div>
            ))}
          </div>

          <div className="chip-row compact-chip-row chatbot-suggestions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" className="chip-button" onClick={() => sendMessage(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <div className="chatbot-input-row">
            <input
              value={input}
              placeholder="Ask about stages, chapters, or submissions"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
            />
            <button type="button" className="button-link" onClick={() => sendMessage(input)}>Send</button>
          </div>
        </div>
      ) : null}

      <button type="button" className="chatbot-fab" onClick={() => setIsOpen((current) => !current)} aria-label="Open AI chatbot">
        AI
      </button>
    </div>
  );
}