import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackFaqs } from '../data/portalContent';

export default function FAQ() {
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      })
      .catch(() => undefined);
  }, []);

  const categories = ['All', ...new Set(faqs.map((faq) => faq.category || 'General'))];
  const filtered = faqs.filter((faq) => {
    const haystack = `${faq.question} ${faq.answer}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    const matchesCategory = category === 'All' || (faq.category || 'General') === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2>Search answers by topic before you submit an enquiry.</h2>
        </div>
      </div>
      <div className="toolbar-row">
        <div className="search-bar grow">
        <input
          value={search}
          placeholder="Search leasing, design, construction, technical, and operations questions"
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        <label className="filter-control">
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <div>
          <p>No matching FAQs yet.</p>
          <p>
            Still have a question? <Link to="/contact">Submit it here</Link> and we’ll answer it.
          </p>
        </div>
      ) : (
        <ul className="interactive-list">
          {filtered.map((f) => (
            <li key={f.id} className="expandable-card">
              <details>
                <summary>
                  <div>
                    <span className="pill">{f.category || 'General'}</span>
                    <strong>{f.question}</strong>
                  </div>
                </summary>
                <p>{f.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
