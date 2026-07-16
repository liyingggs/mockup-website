import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fallbackAnnouncements,
  quickLinks,
  serviceMetrics,
} from '../data/portalContent';

const defaultWorkspaceSnapshot = {
  currentStage: 'Stage 01 - Concept Briefing',
  nextSubmission: 'Concept brief + preliminary area schedule',
  deadline: 'Week 1',
  updatedAt: null,
};

const formatUpdatedTime = (value) => {
  if (!value) {
    return 'Not updated yet';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not updated yet';
  }

  return date.toLocaleString();
};

const readWorkspaceSnapshot = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('portal-workspace-status') || 'null');
    if (saved?.currentStage && saved?.nextSubmission && saved?.deadline) {
      return saved;
    }
  } catch {
    // Ignore parse errors and use default fallback.
  }

  return defaultWorkspaceSnapshot;
};

export default function Home() {
  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);
  const [workspaceSnapshot, setWorkspaceSnapshot] = useState(readWorkspaceSnapshot);

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

  useEffect(() => {
    const refreshWorkspaceSnapshot = () => {
      setWorkspaceSnapshot(readWorkspaceSnapshot());
    };

    window.addEventListener('portal-workspace-updated', refreshWorkspaceSnapshot);
    window.addEventListener('storage', refreshWorkspaceSnapshot);

    return () => {
      window.removeEventListener('portal-workspace-updated', refreshWorkspaceSnapshot);
      window.removeEventListener('storage', refreshWorkspaceSnapshot);
    };
  }, []);

  const topStats = serviceMetrics.slice(0, 3);

  return (
    <div className="page-stack workspace-page">
      <section className="panel workspace-priority-panel">
        <p className="eyebrow">Current Priority</p>
        <h2>What you need to do next</h2>
        <p className="muted">Last updated: {formatUpdatedTime(workspaceSnapshot.updatedAt)}</p>
        <div className="workspace-priority-grid">
          <article>
            <span>Current Stage</span>
            <strong>{workspaceSnapshot.currentStage}</strong>
          </article>
          <article>
            <span>Next Required Submission</span>
            <strong>{workspaceSnapshot.nextSubmission}</strong>
          </article>
          <article>
            <span>Deadline</span>
            <strong>{workspaceSnapshot.deadline}</strong>
          </article>
        </div>
      </section>

      <section className="hero-panel workspace-hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Tenant Workspace</p>
          <h2>Move your tenancy forward with one clear next action.</h2>
          <p className="lead">Track your stage, submit what is required, and stay on deadline across the 13-stage journey.</p>
          <div className="button-row">
            <Link className="button-link" to="/journey">Start 13-Stage Journey</Link>
            <Link className="button-link button-link-secondary" to="/resources">Open Resources</Link>
          </div>
        </div>

        <div className="hero-aside">
          <div className="metrics-grid">
            {topStats.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="home-layout workspace-layout">
        <div className="home-primary-stack">
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Workspace Shortcuts</p>
                <h3>Go directly to the page you need now.</h3>
              </div>
            </div>
            <div className="feature-grid home-feature-grid">
              {quickLinks.map((card) => (
                <Link key={card.title} to={card.path} className="feature-card">
                  <h4>{card.title}</h4>
                  <p>{card.description.split('. ')[0]}.</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="home-sidebar-stack">
          <section className="panel home-sidebar-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Latest Announcements</p>
                <h3>Recent updates</h3>
              </div>
              <Link className="text-link" to="/announcements">View all</Link>
            </div>
            <div className="stack-list compact-stack-list">
              {announcements.slice(0, 2).map((announcement) => (
                <article key={announcement.id} className="announcement-card compact">
                  <span className="pill">{announcement.tag || 'Update'}</span>
                  <h4>{announcement.title}</h4>
                  <p>{announcement.body.split('. ')[0]}.</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
