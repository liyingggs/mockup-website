import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessage = async (value) => {
    const nextValue = value.trim();

    if (!nextValue) {
      return;
    }

    setMessages((current) => ([
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text: nextValue },
    ]));
    setInput('');

    setIsLoading(true);
    try {
      const response = await fetch('/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: nextValue }),
      });

      if (!response.ok) {
        throw new Error('Unable to fetch chatbot response');
      }

      const reply = await response.json();
      setMessages((current) => ([
        ...current,
        { id: `assistant-${Date.now() + 1}`, role: 'assistant', text: reply.text, canHelp: reply.canHelp },
      ]));
    } catch (error) {
      setMessages((current) => ([
        ...current,
        {
          id: `assistant-${Date.now() + 1}`,
          role: 'assistant',
          text: 'I could not reach the chatbot service right now. Please try again shortly.',
          canHelp: false,
        },
      ]));
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? (
              <div className="chatbot-message assistant">
                <p>Checking the knowledge base...</p>
              </div>
            ) : null}
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
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 3C6.47 3 2 6.58 2 11c0 2.39 1.33 4.52 3.42 5.98V21l3.26-1.95c1.08.3 2.22.45 3.32.45 5.53 0 10-3.58 10-8s-4.47-8-10-8Zm0 14.5c-1.01 0-2.08-.16-3.07-.48l-.74-.24-1.77 1.06v-2.04l-.52-.35C4.12 14.25 3 12.68 3 11c0-3.83 4.03-7 9-7s9 3.17 9 7-4.03 7-9 7Zm-4-7.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
          />
        </svg>
      </button>
    </div>
  );
}