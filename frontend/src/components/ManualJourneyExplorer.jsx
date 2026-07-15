import React, { useMemo, useState } from 'react';
import { manualChapters } from '../data/portalContent';

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

  const activeChapter = manualChapters.find((chapter) => chapter.id === selectedChapterId) || manualChapters[0];
  const activeChapterIndex = manualChapters.findIndex((chapter) => chapter.id === activeChapter.id);

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
            <button
              key={chapter.id}
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
          ))}
        </div>
      </section>

      <section className="manual-detail-panel">
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
      </section>
    </div>
  );
}