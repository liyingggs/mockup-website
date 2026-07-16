import React, { useMemo, useState } from 'react';
import { manualChapters } from '../data/portalContent';

const manualPdfHref = `${import.meta.env.BASE_URL}manual.pdf`;

export default function ManualJourneyExplorer() {
  const [selectedChapterId, setSelectedChapterId] = useState(manualChapters[0].id);
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('portal-manual-bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const filteredChapters = useMemo(() => {
    const normalized = search.toLowerCase();

    return manualChapters.filter((chapter) => {
      if (!normalized) {
        return true;
      }

      return (
        chapter.title.toLowerCase().includes(normalized) ||
        chapter.summary.toLowerCase().includes(normalized) ||
        chapter.sections.some((section) => section.toLowerCase().includes(normalized)) ||
        chapter.relatedStages.some((stage) => stage.toLowerCase().includes(normalized))
      );
    });
  }, [search]);

  const activeChapter = filteredChapters.find((chapter) => chapter.id === selectedChapterId)
    || filteredChapters[0]
    || null;
  const activeChapterIndex = activeChapter
    ? manualChapters.findIndex((chapter) => chapter.id === activeChapter.id)
    : -1;

  const toggleBookmark = (chapterId) => {
    const nextBookmarks = bookmarks.includes(chapterId)
      ? bookmarks.filter((item) => item !== chapterId)
      : [...bookmarks, chapterId];

    setBookmarks(nextBookmarks);
    localStorage.setItem('portal-manual-bookmarks', JSON.stringify(nextBookmarks));
  };

  return (
    <div className="manual-journey-stack">
      <section className="manual-top-panel">
        <div className="manual-toolbar-row">
          <div className="search-bar grow">
            <input
              value={search}
              placeholder="Search manual chapters and topics"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="manual-meta compact-manual-meta">
            <p><strong>Bookmarks:</strong> {bookmarks.length}</p>
            <p><strong>Chapters:</strong> {manualChapters.length}</p>
          </div>
        </div>

        <div className="manual-stage-list">
          {filteredChapters.map((chapter) => (
            <article
              key={chapter.id}
              className={activeChapter.id === chapter.id ? 'manual-stage-item active' : 'manual-stage-item'}
            >
              <button
                type="button"
                className={activeChapter.id === chapter.id ? 'manual-stage-button active' : 'manual-stage-button'}
                onClick={() => setSelectedChapterId(chapter.id)}
              >
                <span className="manual-stage-number">{chapter.number}</span>
                <span className="manual-stage-copy">
                  <strong>{chapter.shortTitle}</strong>
                  <small>{chapter.phase}</small>
                </span>
              </button>
              <a
                href={manualPdfHref}
                download="Digital-Tenancy-Manual.pdf"
                className="manual-mini-download"
                title="Download manual PDF"
                aria-label={`Download manual PDF from chapter ${chapter.number}`}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M8 2v7m0 0 3-3m-3 3-3-3M3 12h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="manual-detail-panel">
        {activeChapter ? (
          <>
        <div className="manual-detail-header">
          <div>
            <p className="eyebrow">Chapter Navigation</p>
            <h3>{activeChapter.title}</h3>
            <p>{activeChapter.summary}</p>
          </div>
          <div className="manual-detail-actions">
            <div className="stage-meta">
              <span className="info-chip">{activeChapter.phase}</span>
              {activeChapter.relatedStages.map((stage) => (
                <span key={stage} className="info-chip">{stage}</span>
              ))}
            </div>
            <button type="button" className="chip-button" onClick={() => toggleBookmark(activeChapter.id)}>
              {bookmarks.includes(activeChapter.id) ? 'Remove Bookmark' : 'Bookmark Page'}
            </button>
          </div>
        </div>

        <div className="journey-section-grid">
          <section className="journey-section-card">
            <h4>Included Topics</h4>
            <ul className="bullet-list">
              {activeChapter.sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </section>

          <section className="journey-section-card">
            <h4>Core Checks</h4>
            <ul className="bullet-list">
              {activeChapter.checkpoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="journey-section-card">
            <h4>Typical Outputs</h4>
            <ul className="bullet-list">
              {activeChapter.outputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="button-row small-gap">
          <button
            type="button"
            className="button-link button-link-secondary"
            onClick={() => setSelectedChapterId(manualChapters[Math.max(activeChapterIndex - 1, 0)].id)}
            disabled={activeChapterIndex === 0}
          >
            Previous Chapter
          </button>
          <button
            type="button"
            className="button-link"
            onClick={() => setSelectedChapterId(manualChapters[Math.min(activeChapterIndex + 1, manualChapters.length - 1)].id)}
            disabled={activeChapterIndex === manualChapters.length - 1}
          >
            Next Chapter
          </button>
        </div>
          </>
        ) : (
          <div className="resources-empty-state">
            <p className="empty-state">No chapters match this search.</p>
            <button type="button" className="button-link" onClick={() => setSearch('')}>Clear Search</button>
          </div>
        )}
      </section>
    </div>
  );
}