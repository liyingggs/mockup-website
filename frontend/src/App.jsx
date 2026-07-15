import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Contacts from './pages/Contacts';
import SubmitInquiry from './pages/SubmitInquiry';
import Resources from './pages/Resources';
import TenantJourney from './pages/TenantJourney';
import FloatingChatbot from './components/FloatingChatbot';
import { companyProfile } from './data/portalContent';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Tenant Journey & Fit-Out', path: '/journey' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact Us', path: '/contact' },
];

export default function App() {
  const [textSize, setTextSize] = useState(() => localStorage.getItem('portal-text-size') || 'base');
  const [theme, setTheme] = useState(() => localStorage.getItem('portal-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('portal-text-size', textSize);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('portal-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
              <p className="eyebrow">Tenant Website</p>
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
            <Route path="/leasing" element={<TenantJourney />} />
            <Route path="/fit-out" element={<TenantJourney />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/handbook" element={<Resources />} />
            <Route path="/manual" element={<Resources />} />
            <Route path="/forms" element={<Resources />} />
            <Route path="/downloads" element={<Resources />} />
            <Route path="/faq" element={<Navigate to="/journey" replace />} />
            <Route path="/contact" element={<SubmitInquiry />} />
          </Routes>
        </main>

        <FloatingChatbot />

      </div>
    </BrowserRouter>
  );
}
