import React, { useEffect, useMemo, useState } from 'react';
import { appendices, documentResources } from '../data/portalContent';

export default function FormsDownloads() {
  const [docs, setDocs] = useState(documentResources);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/documents')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDocs(data);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(docs.map((doc) => doc.category || 'General'))];
  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesFilter = filter === 'All' || (doc.category || 'General') === filter;
      const haystack = `${doc.name} ${doc.description || ''} ${doc.stage || ''}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [docs, filter, search]);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Downloads & Resources</p>
          <h2>Central repository for forms, standards, templates, and 13-stage journey references.</h2>
        </div>
      </div>

      <p className="feedback">Use stage names like Landlord Submission, Contractor Onboarding, or Pre-Opening Handover to narrow the document list.</p>

      <div className="toolbar-row">
        <div className="search-bar grow">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search forms, templates, standards, and appendices"
          />
        </div>
        <label className="filter-control">
          Category
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading documents…</p>
      ) : filteredDocs.length === 0 ? (
        <p>No documents available. Check back later.</p>
      ) : (
        <div className="download-grid">
          {filteredDocs.map((d) => (
            <article key={d.id} className="download-card">
              <h3>{d.name}</h3>
              <p>{d.description || 'Download the document.'}</p>
              <div className="resource-meta">
                <span>{d.type || 'Reference'}</span>
                <span>{d.stage || 'Across all 13 stages'}</span>
              </div>
              <p className="muted">Access method: {d.access || 'Portal document register'}</p>
            </article>
          ))}
        </div>
      )}

      <div className="appendix-panel">
        <p className="eyebrow">Appendices</p>
        <div className="chip-row">
          {appendices.map((item) => (
            <span key={item} className="info-chip">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
