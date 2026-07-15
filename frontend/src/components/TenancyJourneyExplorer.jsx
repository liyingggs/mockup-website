import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tenancyJourneyMap, tenancyOptions } from '../data/portalContent';

function RetailIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M20 24h24l3 28H17l3-28Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 24v-4a8 8 0 0 1 16 0v4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 31a2 2 0 1 0 0 .01" fill="currentColor" />
      <path d="M40 31a2 2 0 1 0 0 .01" fill="currentColor" />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M18 14h20v38H18Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 22h8a4 4 0 0 1 4 4v26H38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 22h4M24 30h4M24 38h4M32 22h0M32 30h0M32 38h0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 52h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const iconMap = {
  retail: RetailIcon,
  workplace: OfficeIcon,
};

export default function TenancyJourneyExplorer({ eyebrow, title, description }) {
  const [selectedTenancy, setSelectedTenancy] = useState(null);
  const [selectedStageByTenancy, setSelectedStageByTenancy] = useState(() => (
    Object.fromEntries(
      tenancyOptions.map((option) => [option.id, tenancyJourneyMap[option.id][0].id])
    )
  ));

  const activeTenancy = useMemo(
    () => tenancyOptions.find((option) => option.id === selectedTenancy) || null,
    [selectedTenancy]
  );

  const stages = activeTenancy ? tenancyJourneyMap[activeTenancy.id] : [];
  const activeStage = useMemo(() => {
    if (!activeTenancy) {
      return null;
    }

    return stages.find((stage) => stage.id === selectedStageByTenancy[activeTenancy.id]) || stages[0];
  }, [activeTenancy, selectedStageByTenancy, stages]);

  const handleStageSelect = (stageId) => {
    if (!activeTenancy) {
      return;
    }

    setSelectedStageByTenancy((current) => ({
      ...current,
      [activeTenancy.id]: stageId,
    }));
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="lead compact-lead">{description}</p>
        </div>
      </div>

      {activeTenancy ? (
        <div className="journey-explorer-stack">
          <article className="journey-overview-card">
            <div>
              <p className="eyebrow">Selected Path</p>
              <h3>{activeTenancy.journeyTitle}</h3>
              <p>{activeTenancy.summary}</p>
            </div>
            <div className="journey-overview-actions">
              <div className="stage-meta">
                <span className="info-chip">{stages.length} stages</span>
                <span className="info-chip">{activeTenancy.audience}</span>
              </div>
              <button
                type="button"
                className="button-link button-link-secondary"
                onClick={() => setSelectedTenancy(null)}
              >
                Change Tenancy Type
              </button>
            </div>
          </article>

          <div className="journey-explorer-shell">
            <section className="journey-stage-rail">
              <div className="journey-stage-rail-header">
                <p className="eyebrow">Stage List</p>
                <h4>Progression overview</h4>
              </div>

              <div className="journey-stage-list">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={activeStage?.id === stage.id ? 'journey-stage-button active' : 'journey-stage-button'}
                    onClick={() => handleStageSelect(stage.id)}
                  >
                    <span className="journey-stage-number">{stage.number}</span>
                    <span className="journey-stage-copy">
                      <strong>{stage.title}</strong>
                      <small>{stage.phase}</small>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {activeStage ? (
              <article className="journey-spotlight-card">
                <div className="journey-spotlight-header">
                  <div>
                    <p className="eyebrow">Selected Stage</p>
                    <h3>{activeStage.number}. {activeStage.title}</h3>
                    <p>{activeStage.overview}</p>
                  </div>
                  <div className="stage-meta">
                    <span className="info-chip">{activeStage.phase}</span>
                    <span className="info-chip">{activeStage.deadline}</span>
                  </div>
                </div>

                <div className="journey-section-grid">
                  <section className="journey-section-card">
                    <h4>Key Actions</h4>
                    <ul className="bullet-list">
                      {activeStage.actions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="journey-section-card">
                    <h4>Required Deliverables</h4>
                    <ul className="bullet-list">
                      {activeStage.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="journey-section-card">
                    <h4>Review Focus</h4>
                    <ul className="bullet-list">
                      {activeStage.reviewFocus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="journey-reference-block">
                  <p className="eyebrow">Manual References</p>
                  <div className="chip-row">
                    {activeStage.manualSections.map((item) => (
                      <span key={item} className="info-chip">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="button-row">
                  <Link className="button-link" to="/resources">Open Resources Hub</Link>
                  <Link className="button-link button-link-secondary" to="/contact">Ask a Follow-Up Question</Link>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="tenancy-selector-block">
          <div className="section-heading compact-section-heading">
            <div>
              <p className="eyebrow">Tenancy Selection</p>
              <h3>What tenancy type are you looking for?</h3>
            </div>
          </div>

          <div className="tenancy-selector-grid" role="list" aria-label="Tenancy types">
            {tenancyOptions.map((option) => {
              const Icon = iconMap[option.id];

              return (
                <button
                  key={option.id}
                  type="button"
                  className="tenancy-selector-card"
                  onClick={() => setSelectedTenancy(option.id)}
                >
                  <span className="tenancy-selector-icon">
                    <Icon />
                  </span>
                  <strong>{option.label}</strong>
                  <span>{option.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}