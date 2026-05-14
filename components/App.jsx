'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './Welcome';
import Hub from './Hub';
import DayShell from './DayShell';
import Completion from './Completion';
import Assistant from './Assistant';

const STORAGE_KEY = 'fleek-onboarding-v1';

const blankDay = () => ({ tasks: {}, reflection: '', shared: [], submitted: false, complete: false });

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
};

const saveState = (s) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
};

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [days, setDays] = useState({
    1: blankDay(), 2: blankDay(), 3: blankDay(), 4: blankDay(), 5: blankDay(),
  });
  const [view, setView] = useState('welcome');
  const [activeDay, setActiveDay] = useState(1);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      if (saved.profile) setProfile(saved.profile);
      if (saved.days) setDays(saved.days);
      if (saved.view) setView(saved.view);
      if (saved.activeDay) setActiveDay(saved.activeDay);
    }
    setHydrated(true);
  }, []);

  // Persist whenever state changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    saveState({ profile, days, view, activeDay });
  }, [hydrated, profile, days, view, activeDay]);

  const start = (p) => {
    setProfile(p);
    setView('hub');
  };

  const openDay = (id) => {
    setActiveDay(id);
    setView('day');
    window.scrollTo({ top: 0 });
  };

  const backToHub = () => {
    setView('hub');
    window.scrollTo({ top: 0 });
  };

  const handleDayUpdate = (next) => {
    setDays((d) => ({ ...d, [activeDay]: { ...d[activeDay], ...next } }));
  };

  const finishOnboarding = () => {
    setView('complete');
    window.scrollTo({ top: 0 });
  };

  const restart = () => {
    if (!confirm('Start your first week over? Your reflections and progress will be cleared.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    setDays({ 1: blankDay(), 2: blankDay(), 3: blankDay(), 4: blankDay(), 5: blankDay() });
    setView('welcome');
    setActiveDay(1);
  };

  const state = { days };
  const dayState = days[activeDay] || blankDay();

  // Avoid flash of wrong content during SSR hydration
  if (!hydrated) return null;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {(view === 'welcome' || !profile) && (
          <motion.div key="welcome" {...pageVariants}>
            <Welcome onStart={start} />
          </motion.div>
        )}

        {view === 'hub' && profile && (
          <motion.div key="hub" {...pageVariants}>
            <Hub
              state={state}
              profile={profile}
              onOpenDay={openDay}
              onOpenAssistant={() => setAssistantOpen(true)}
              onHome={() => setView('hub')}
            />
          </motion.div>
        )}

        {view === 'day' && profile && (
          <motion.div key={`day-${activeDay}`} {...pageVariants}>
            <DayShell
              dayId={activeDay}
              state={state}
              profile={profile}
              onUpdate={handleDayUpdate}
              onComplete={finishOnboarding}
              onBack={backToHub}
              onOpenAssistant={() => setAssistantOpen(true)}
            />
          </motion.div>
        )}

        {view === 'complete' && profile && (
          <motion.div key="complete" {...pageVariants}>
            <Completion
              profile={profile}
              state={state}
              onRestart={restart}
              onOpenAssistant={() => setAssistantOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Assistant
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        profile={profile || { name: '' }}
        state={state}
      />
    </>
  );
}
