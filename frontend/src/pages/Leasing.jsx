import React, { useMemo, useState } from 'react';
import { fitOutGuides } from '../data/portalContent';

export default function Leasing() {
  const [selected, setSelected] = useState(fitOutGuides[0].id);
  const activeGuide = useMemo(
    () => fitOutGuides.find((guide) => guide.id === selected) || fitOutGuides[0],
    [selected]
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Fit-Out Guidelines</p>
          <h2>Structured guidance by tenancy type.</h2>
        </div>
      </div>

      <div className="fitout-layout">
        <aside className="fitout-nav" aria-label="Fit-out categories">
          {fitOutGuides.map((guide) => (
            <button
              key={guide.id}
              type="button"
              className={selected === guide.id ? 'fitout-nav-button active' : 'fitout-nav-button'}
              onClick={() => setSelected(guide.id)}
            >
              <strong>{guide.title}</strong>
              <span>{guide.audience}</span>
            </button>
          ))}
        </aside>

        <article className="guideline-card fitout-card">
          <div className="fitout-header">
            <p className="eyebrow">{activeGuide.audience}</p>
            <h3>{activeGuide.title}</h3>
            <p>{activeGuide.overview}</p>
          </div>

          <div className="fitout-detail-grid">
            <section className="fitout-section-card">
              <h4>Key Requirements</h4>
              <ul className="bullet-list">
                {activeGuide.standards.map((standard) => (
                  <li key={standard}>{standard}</li>
                ))}
              </ul>
            </section>

            <section className="fitout-section-card">
              <h4>Typical Submission Items</h4>
              <ul className="bullet-list">
                {activeGuide.submissions.map((submission) => (
                  <li key={submission}>{submission}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
