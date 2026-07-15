import React, { useEffect, useState } from 'react';
import { fallbackContacts } from '../data/portalContent';

export default function Contacts() {
  const [contacts, setContacts] = useState(fallbackContacts);
  const [department, setDepartment] = useState('All');

  useEffect(() => {
    fetch('/api/contacts')
      .then((r) => r.json())
      .then(setContacts)
      .catch(() => setContacts([]));
  }, []);

  const departments = ['All', ...new Set(contacts.map((c) => c.department || 'General'))];
  const filtered = department === 'All' ? contacts : contacts.filter((c) => (c.department || 'General') === department);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Contact Us</p>
          <h2>Connect with the right team for the next action.</h2>
        </div>
      </div>
      <div className="filter-row">
        <label>
          Filter by department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ul className="contact-grid">
          {filtered.map((c) => (
            <li key={c.id} className="contact-card">
              <div>
                <strong>{c.name}</strong>
                <div className="muted">{c.role} • {c.department}</div>
              </div>
              <div className="contact-links">
                {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
                {c.phone && <a href={`tel:${c.phone}`}>{c.phone}</a>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="feedback">A portal staff member can respond to enquiries within 3 working days, depending on submission completeness.</p>
    </section>
  );
}
