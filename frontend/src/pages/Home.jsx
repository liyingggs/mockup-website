import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  assistantKnowledge,
  assistantPrompts,
  companyProfile,
  companyValues,
  fallbackAnnouncements,
  quickLinks,
  serviceMetrics,
  whyLeaseWithUs,
} from '../data/portalContent';

export default function Home() {
  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);
  const [chatQuery, setChatQuery] = useState(assistantPrompts[0]);

  useEffect(() => {
    let ignore = false;

    fetch('/api/announcements')
      .then((response) => response.json())
      .then((data) => {
        if (!ignore && Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  const assistantReply = useMemo(() => {
    const normalized = chatQuery.toLowerCase();
    return (
      assistantKnowledge.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword))) ||
      {
        answer:
          'Use the 13-stage Tenant Journey for stage-specific guidance, the Resources hub for manuals and documents, and Contact Us if you need a team follow-up.',
        links: ['/journey', '/resources', '/contact'],
      }
    );
  }, [chatQuery]);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Welcome to the Company</p>
          <h2>Interactive tenant collaboration across a 13-stage leasing and fit-out journey.</h2>
          <p className="lead">{companyProfile.overview}</p>
          <div className="button-row">
            <Link className="button-link" to="/journey">Open Tenant Journey & Fit-Out</Link>
            <Link className="button-link button-link-secondary" to="/resources">Open Resources Hub</Link>
          </div>
        </div>

        <div className="hero-aside">
          <div className="metrics-grid">
            {serviceMetrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="home-layout">
        <div className="home-primary-stack">
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Company Overview</p>
                <h3>Corporate, structured, and self-service by design.</h3>
              </div>
            </div>
            <div className="value-grid compact-grid">
              {companyValues.map((value) => (
                <article key={value.title} className="value-card">
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Quick Navigation</p>
                <h3>Direct access to the 13-stage journey and supporting resources.</h3>
              </div>
            </div>
            <div className="feature-grid home-feature-grid">
              {quickLinks.map((card) => (
                <Link key={card.title} to={card.path} className="feature-card">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="panel">
            <p className="eyebrow">Why Lease With Us?</p>
            <h3>A clearer path from enquiry to occupation.</h3>
            <ul className="bullet-list">
              {whyLeaseWithUs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="home-sidebar-stack">
          <section className="panel home-sidebar-panel">
            <div className="section-heading assistant-heading">
              <div>
                <p className="eyebrow">AI Assistant</p>
                <h3>Quick tenant help.</h3>
              </div>
            </div>
            <div className="search-bar assistant-bar compact-assistant-bar">
              <input
                value={chatQuery}
                onChange={(event) => setChatQuery(event.target.value)}
                placeholder="Ask about submissions or next steps"
              />
            </div>
            <div className="chip-row compact-chip-row">
              {assistantPrompts.map((prompt) => (
                <button key={prompt} type="button" className="chip-button" onClick={() => setChatQuery(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
            <article className="assistant-card compact-assistant-card">
              <p>{assistantReply.answer}</p>
              <div className="button-row small-gap compact-link-row">
                {assistantReply.links.map((link) => (
                  <Link key={link} className="button-link button-link-secondary" to={link}>
                    {link === '/journey' ? 'Journey' : link === '/contact' ? 'Contact' : 'Resources'}
                  </Link>
                ))}
              </div>
            </article>
          </section>

          <section className="panel home-sidebar-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Latest Announcements</p>
                <h3>Recent portal updates.</h3>
              </div>
              <Link className="text-link" to="/announcements">View all</Link>
            </div>
            <div className="stack-list compact-stack-list">
              {announcements.slice(0, 3).map((announcement) => (
                <article key={announcement.id} className="announcement-card compact">
                  <span className="pill">{announcement.tag || 'Update'}</span>
                  <h4>{announcement.title}</h4>
                  <p>{announcement.body}</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
