import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { manualChapters } from '../data/portalContent';

export default function Handbook() {
  const [selected, setSelected] = useState(manualChapters[0].id);
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cdl-manual-bookmarks') || '[]');
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
        chapter.sections.some((section) => section.toLowerCase().includes(normalized))
      );
    });
  }, [search]);

  const selectedChapter = manualChapters.find((chapter) => chapter.id === selected) || manualChapters[0];
  const chapterIndex = manualChapters.findIndex((chapter) => chapter.id === selectedChapter.id);

  const toggleBookmark = (chapterId) => {
    const nextBookmarks = bookmarks.includes(chapterId)
      ? bookmarks.filter((item) => item !== chapterId)
      : [...bookmarks, chapterId];

    setBookmarks(nextBookmarks);
    localStorage.setItem('cdl-manual-bookmarks', JSON.stringify(nextBookmarks));
  };

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

      <div className="manual-layout">
        <aside className="manual-sidebar">
          <div className="search-bar">
            <input
              value={search}
              placeholder="Search manual chapters and topics"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="manual-meta">
            <p><strong>Bookmarks:</strong> {bookmarks.length}</p>
            <p><strong>Chapters:</strong> {manualChapters.length}</p>
          </div>
          <div className="manual-toc">
            {filteredChapters.map((chapter) => (
              <button
                key={chapter.id}
                type="button"
                className={selectedChapter.id === chapter.id ? 'manual-link active' : 'manual-link'}
                onClick={() => setSelected(chapter.id)}
              >
                <span>{chapter.title}</span>
                {bookmarks.includes(chapter.id) ? <strong>Saved</strong> : null}
              </button>
            ))}
          </div>
        </aside>

        <div className="manual-content">
          <div className="manual-header-card">
            <div>
              <p className="eyebrow">Chapter Navigation</p>
              <h3>{selectedChapter.title}</h3>
              <p>{selectedChapter.summary}</p>
            </div>
            <button type="button" className="chip-button" onClick={() => toggleBookmark(selectedChapter.id)}>
              {bookmarks.includes(selectedChapter.id) ? 'Remove Bookmark' : 'Bookmark Page'}
            </button>
          </div>

          <div className="interactive-tabs">
            <div className="tab-panel manual-panel">
              <h4>Included Topics</h4>
              <ul className="bullet-list">
                {selectedChapter.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
              <div className="button-row small-gap">
                <button
                  type="button"
                  className="button-link button-link-secondary"
                  onClick={() => setSelected(manualChapters[Math.max(chapterIndex - 1, 0)].id)}
                  disabled={chapterIndex === 0}
                >
                  Previous Chapter
                </button>
                <button
                  type="button"
                  className="button-link"
                  onClick={() => setSelected(manualChapters[Math.min(chapterIndex + 1, manualChapters.length - 1)].id)}
                  disabled={chapterIndex === manualChapters.length - 1}
                >
                  Next Chapter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="feedback">Use print-to-PDF in the browser when you need an offline copy of the currently curated manual content.</p>
    </section>
  );
}
