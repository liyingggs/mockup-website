import React from 'react';
import { Link } from 'react-router-dom';
import ManualJourneyExplorer from '../components/ManualJourneyExplorer';

export default function Handbook() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Digital Tenancy Manual</p>
          <h2>Searchable online manual with chapter navigation and bookmarks.</h2>
        </div>
        <div className="button-row small-gap">
          <button type="button" className="button-link" onClick={() => window.print()}>Print / Save as PDF</button>
          <Link className="button-link button-link-secondary" to="/downloads">View supporting documents</Link>
        </div>
      </div>

      <ManualJourneyExplorer />

      <p className="feedback">Use print-to-PDF in the browser when you need an offline copy of the currently curated manual content.</p>
    </section>
  );
}
