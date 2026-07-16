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

const buildWorkspaceStatus = (tenancy, stages, completedStageIds) => {
  const defaultStage = stages[0] || null;
  const completedSet = new Set(completedStageIds || []);
  const firstPendingStage = stages.find((stage) => !completedSet.has(stage.id));
  const currentStage = firstPendingStage || defaultStage;

  if (!currentStage) {
    return null;
  }

  const currentIndex = stages.findIndex((stage) => stage.id === currentStage.id);
  const nextStage = currentIndex >= 0 && currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;

  return {
    tenancy: tenancy?.label || 'Tenant',
    currentStage: `Stage ${currentStage.number} - ${currentStage.title}`,
    nextSubmission: nextStage
      ? (nextStage.deliverables.slice(0, 2).join(' + ') || `${nextStage.title} package`)
      : 'Final close-out package submitted',
    deadline: nextStage ? nextStage.deadline : 'Completed',
    updatedAt: new Date().toISOString(),
  };
};

export default function TenancyJourneyExplorer({ eyebrow, title, description }) {
  const [copyFeedback, setCopyFeedback] = useState('');
  const [completedStagesByTenancy, setCompletedStagesByTenancy] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portal-journey-progress') || '{}');
      return Object.fromEntries(
        tenancyOptions.map((option) => [option.id, Array.isArray(saved[option.id]) ? saved[option.id] : []])
      );
    } catch {
      return Object.fromEntries(tenancyOptions.map((option) => [option.id, []]));
    }
  });
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
  const completedStageIds = activeTenancy ? (completedStagesByTenancy[activeTenancy.id] || []) : [];

  const currentStage = useMemo(() => {
    if (!activeTenancy || stages.length === 0) {
      return null;
    }

    return stages.find((stage) => !completedStageIds.includes(stage.id)) || stages[stages.length - 1];
  }, [activeTenancy, completedStageIds, stages]);

  const nextStage = useMemo(() => {
    if (!currentStage) {
      return null;
    }

    const currentIndex = stages.findIndex((stage) => stage.id === currentStage.id);
    if (currentIndex < 0 || currentIndex >= stages.length - 1) {
      return null;
    }

    return stages[currentIndex + 1];
  }, [currentStage, stages]);

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

  const syncWorkspaceStatus = (nextProgress) => {
    if (!activeTenancy || stages.length === 0) {
      return;
    }

    const status = buildWorkspaceStatus(activeTenancy, stages, nextProgress);
    if (!status) {
      return;
    }

    localStorage.setItem('portal-workspace-status', JSON.stringify(status));
    window.dispatchEvent(new Event('portal-workspace-updated'));
  };

  const updateProgress = (nextProgress) => {
    if (!activeTenancy) {
      return;
    }

    const nextState = {
      ...completedStagesByTenancy,
      [activeTenancy.id]: nextProgress,
    };

    setCompletedStagesByTenancy(nextState);
    localStorage.setItem('portal-journey-progress', JSON.stringify(nextState));
    localStorage.setItem('portal-active-tenancy', activeTenancy.id);
    syncWorkspaceStatus(nextProgress);
  };

  const handleSetCurrentStage = (stageId) => {
    if (!activeTenancy) {
      return;
    }

    const stageIndex = stages.findIndex((stage) => stage.id === stageId);
    if (stageIndex < 0) {
      return;
    }

    const nextProgress = stages.slice(0, stageIndex).map((stage) => stage.id);
    updateProgress(nextProgress);
    handleStageSelect(stageId);
  };

  const markCurrentStageDone = () => {
    if (!currentStage || !activeTenancy) {
      return;
    }

    const currentIndex = stages.findIndex((stage) => stage.id === currentStage.id);
    if (currentIndex < 0) {
      return;
    }

    const nextProgress = stages.slice(0, currentIndex + 1).map((stage) => stage.id);
    updateProgress(nextProgress);

    if (currentIndex < stages.length - 1) {
      handleStageSelect(stages[currentIndex + 1].id);
    }
  };

  const copySubmissionChecklist = async () => {
    if (!activeStage) {
      return;
    }

    const checklist = [
      `${activeStage.number}. ${activeStage.title}`,
      'Required Deliverables:',
      ...activeStage.deliverables.map((item) => `- ${item}`),
      '',
      'Key Actions:',
      ...activeStage.actions.map((item) => `- ${item}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(checklist);
      setCopyFeedback('Checklist copied');
    } catch {
      setCopyFeedback('Unable to copy checklist');
    }

    setTimeout(() => setCopyFeedback(''), 1800);
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
              <p className="single-line">{activeTenancy.summary}</p>
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
            <article className="journey-progress-summary">
              <div>
                <p className="eyebrow">Current Checklist Status</p>
                <h4>{currentStage ? `${currentStage.number}. ${currentStage.title}` : 'No stage selected yet'}</h4>
                <p>
                  {nextStage
                    ? `Next stage: ${nextStage.number}. ${nextStage.title}`
                    : 'You have reached the final stage in this journey.'}
                </p>
              </div>
              <div className="button-row small-gap">
                <button
                  type="button"
                  className="button-link button-link-secondary"
                  onClick={markCurrentStageDone}
                >
                  Mark Current Stage Done
                </button>
                {nextStage ? (
                  <button
                    type="button"
                    className="button-link"
                    onClick={() => handleStageSelect(nextStage.id)}
                  >
                    Go To Next Stage
                  </button>
                ) : null}
              </div>
            </article>

            {activeStage ? (
              <article className="journey-spotlight-card">
                <div className="journey-spotlight-header">
                  <div>
                    <p className="eyebrow">Selected Stage</p>
                    <h3>{activeStage.number}. {activeStage.title}</h3>
                    <p className="single-line">{activeStage.overview}</p>
                  </div>
                  <div className="stage-meta">
                    <span className="info-chip">{activeStage.phase}</span>
                    <span className="info-chip">{activeStage.deadline}</span>
                  </div>
                </div>

                <div className="journey-section-grid compact-two-col-grid">
                  <section className="journey-section-card">
                    <h4>Actions & Deliverables</h4>
                    <p className="eyebrow">Key Actions</p>
                    <ul className="bullet-list">
                      {activeStage.actions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="eyebrow">Required Deliverables</p>
                    <ul className="bullet-list">
                      {activeStage.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="journey-section-card">
                    <h4>Review & References</h4>
                    <p className="eyebrow">Review Focus</p>
                    <ul className="bullet-list">
                      {activeStage.reviewFocus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="eyebrow">Manual References</p>
                    <div className="chip-row">
                      {activeStage.manualSections.map((item) => (
                        <span key={item} className="info-chip">{item}</span>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="button-row">
                  <Link className="button-link" to="/resources">Open Resources Hub</Link>
                  <button type="button" className="button-link button-link-secondary" onClick={copySubmissionChecklist}>Copy Submission Checklist</button>
                  <Link className="button-link button-link-secondary" to="/contact">Ask a Follow-Up Question</Link>
                </div>
                {copyFeedback ? <p className="feedback">{copyFeedback}</p> : null}
              </article>
            ) : null}

            <section className="journey-stage-rail">
              <div className="journey-stage-rail-header">
                <p className="eyebrow">Progress List</p>
                <h4>Set your current stage</h4>
              </div>

              <div className="journey-stage-list">
                {stages.map((stage) => (
                  <article
                    key={stage.id}
                    className={
                      currentStage?.id === stage.id
                        ? 'journey-checklist-item current'
                        : completedStageIds.includes(stage.id)
                          ? 'journey-checklist-item complete'
                          : 'journey-checklist-item faded'
                    }
                  >
                    <span className="journey-stage-status">
                      {currentStage?.id === stage.id ? 'Current' : completedStageIds.includes(stage.id) ? 'Done' : 'Pending'}
                    </span>
                    <button
                      type="button"
                      className={activeStage?.id === stage.id ? 'journey-stage-button active' : 'journey-stage-button'}
                      onClick={() => {
                        handleSetCurrentStage(stage.id);
                      }}
                    >
                      <span className="journey-stage-number">{stage.number}</span>
                      <span className="journey-stage-copy">
                        <strong>{stage.title}</strong>
                        <small className="single-line">{stage.phase} - {stage.deadline}</small>
                      </span>
                    </button>
                  </article>
                ))}
              </div>
            </section>
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
                  onClick={() => {
                    setSelectedTenancy(option.id);

                    const selectedOption = tenancyOptions.find((item) => item.id === option.id);
                    const optionStages = tenancyJourneyMap[option.id] || [];
                    const savedProgress = completedStagesByTenancy[option.id] || [];
                    const status = buildWorkspaceStatus(selectedOption, optionStages, savedProgress);

                    if (status) {
                      localStorage.setItem('portal-active-tenancy', option.id);
                      localStorage.setItem('portal-workspace-status', JSON.stringify(status));
                      window.dispatchEvent(new Event('portal-workspace-updated'));
                    }
                  }}
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