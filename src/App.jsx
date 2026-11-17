import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Preloader } from './components/Preloader/Preloader';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { BackToTop } from './components/BackToTop/BackToTop';
import { ResumeModal } from './components/ResumeModal/ResumeModal';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SkillsExperience from './pages/SkillsExperience';
import Contact from './pages/Contact';

function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function AppShell({ theme, toggleTheme, resumeOpen, setResumeOpen }) {
  const { pathname } = useLocation();
  const isMinimalLanding = pathname === '/';

  return (
    <>
      <ScrollToTopOnRouteChange />
      {!isMinimalLanding && <Preloader />}

      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[var(--color-deep-purple)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        {!isMinimalLanding && (
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenResume={() => setResumeOpen(true)}
          />
        )}

        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenResume={() => setResumeOpen(true)} />} />
            <Route path="/about" element={<About onOpenResume={() => setResumeOpen(true)} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<SkillsExperience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isMinimalLanding && <Footer onOpenResume={() => setResumeOpen(true)} />}
        {!isMinimalLanding && <BackToTop />}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppShell
        theme={theme}
        toggleTheme={toggleTheme}
        resumeOpen={resumeOpen}
        setResumeOpen={setResumeOpen}
      />
    </BrowserRouter>
  );
}
