import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Leasing from './pages/Leasing';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import SubmitInquiry from './pages/SubmitInquiry';
import Resources from './pages/Resources';
import TenantJourney from './pages/TenantJourney';
import { companyProfile } from './data/portalContent';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Tenant Journey', path: '/journey' },
  { label: 'Fit-Out Guidelines', path: '/fit-out' },
  { label: 'Resources', path: '/resources' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

const footerUtilityLinks = [{ label: 'Contact Us', path: '/contact' }];

export default function App() {
  const [textSize, setTextSize] = useState(() => localStorage.getItem('cdl-text-size') || 'base');
  const [theme, setTheme] = useState(() => localStorage.getItem('cdl-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('cdl-text-size', textSize);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('cdl-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-shell" data-text-size={textSize} data-theme={theme}>
        <header className="site-header">
          <div className="utility-bar">
            <div className="utility-actions" aria-label="Accessibility controls">
              <button type="button" onClick={() => setTextSize('base')}>A-</button>
              <button type="button" onClick={() => setTextSize('large')}>A+</button>
              <button type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>

          <div className="topbar">
            <div className="brand-block">
              <p className="eyebrow">CDL Tenant Website</p>
              <h1>{companyProfile.name}</h1>
              <p>{companyProfile.tagline}</p>
            </div>

            <nav className="app-nav" aria-label="Primary navigation">
              {navigation.map((item) => (
                <NavLink key={item.path} to={item.path} end={item.path === '/'}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/journey" element={<TenantJourney />} />
            <Route path="/tenant-journey" element={<TenantJourney />} />
            <Route path="/leasing" element={<Leasing />} />
            <Route path="/fit-out" element={<Leasing />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/handbook" element={<Resources />} />
            <Route path="/manual" element={<Resources />} />
            <Route path="/forms" element={<Resources />} />
            <Route path="/downloads" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<SubmitInquiry />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-top-row">
            <div className="footer-location-block">
              <span className="footer-label">Locate Us</span>
              <p>9 Raffles Place #12-01 Republic Plaza Singapore 048619</p>
            </div>

            <div className="footer-follow-block">
              <span className="footer-label">Follow Us</span>
              <div className="footer-socials" aria-label="Social links">
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">in</a>
                <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">ig</a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer">yt</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-copyright">Copyright @ 2026 City Developments Limited</p>
            <div className="footer-links">
              {footerUtilityLinks.map((item) => (
                <Link key={item.path} to={item.path}>{item.label}</Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
