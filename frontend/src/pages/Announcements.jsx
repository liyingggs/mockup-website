import React, { useEffect, useMemo, useState } from 'react';
import { fallbackAnnouncements } from '../data/portalContent';

export default function Announcements() {
  const [items, setItems] = useState(fallbackAnnouncements);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.body.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <section className="panel">
      <h2>Announcements</h2>
      <div className="search-bar">
        <input
          value={search}
          placeholder="Search announcements, notices, and submission updates"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading announcements…</p>
      ) : filtered.length === 0 ? (
        <p>No announcements match your search.</p>
      ) : (
        <ul className="interactive-list">
          {filtered.map((a) => (
            <li key={a.id} className="expandable-card notice-card">
              <details open>
                <summary>
                  <div>
                    <span className="pill">{a.tag || 'Portal update'}</span>
                    <strong>{a.title}</strong>
                  </div>
                  <span>{new Date(a.publishedAt).toLocaleDateString()}</span>
                </summary>
                <p>{a.body}</p>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
