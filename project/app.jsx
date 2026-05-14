// Main app. Routing + persistent state
const STORAGE_KEY = "fleek-onboarding-v1";

const blankDay = () => ({ tasks: {}, reflection: "", shared: [], submitted: false, complete: false });

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

const App = () => {
 const initial = loadState();
 const [profile, setProfile] = useState(initial?.profile || null);
 const [days, setDays] = useState(initial?.days || { 1: blankDay(), 2: blankDay(), 3: blankDay(), 4: blankDay(), 5: blankDay() });
 const [view, setView] = useState(initial?.view || "welcome"); // welcome | hub | day | complete
 const [activeDay, setActiveDay] = useState(initial?.activeDay || 1);
 const [scenarios, setScenarios] = useState(initial?.scenarios || {});
 const [workflow, setWorkflow] = useState(initial?.workflow || null);
 const [assistantOpen, setAssistantOpen] = useState(false);

 // Persist
 useEffect(() => {
 saveState({ profile, days, view, activeDay });
 }, [profile, days, view, activeDay]);

 const start = (p) => {
 setProfile(p);
 setView("hub");
 };

 const openDay = (id) => {
 setActiveDay(id);
 setView("day");
 window.scrollTo({ top: 0 });
 };

 const backToHub = () => {
 setView("hub");
 window.scrollTo({ top: 0 });
 };

 const updateDay = (id) => (next) => {
 setDays((d) => ({ ...d, [id]: { ...d[id], ...next } }));
 };

 // Aggregate state shape passed to children
 const state = { days, scenarios, workflow };
 // updateDay merges Day-shell-relevant fields; day content needs full day state
 const dayState = days[activeDay] || blankDay();
 const handleDayUpdate = (next) => {
 setDays((d) => ({ ...d, [activeDay]: { ...d[activeDay], ...next } }));
 };

 const finishOnboarding = () => {
 setView("complete");
 window.scrollTo({ top: 0 });
 };

 const restart = () => {
 if (!confirm("Start your first week over? Your reflections and progress will be cleared.")) return;
 localStorage.removeItem(STORAGE_KEY);
 setProfile(null);
 setDays({ 1: blankDay(), 2: blankDay(), 3: blankDay(), 4: blankDay(), 5: blankDay() });
 setView("welcome");
 setActiveDay(1);
 };

 if (view === "welcome" || !profile) {
 return (
 <>
 <Welcome onStart={start} />
 <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} profile={profile || { name: "" }} state={state} />
 </>
 );
 }

 if (view === "hub") {
 return (
 <>
 <Hub
 state={state}
 profile={profile}
 onOpenDay={openDay}
 onOpenAssistant={() => setAssistantOpen(true)}
 onHome={() => setView("hub")}
 />
 <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} profile={profile} state={state} />
 </>
 );
 }

 if (view === "day") {
 return (
 <>
 <DayShell
 dayId={activeDay}
 state={state}
 profile={profile}
 onUpdate={handleDayUpdate}
 onComplete={finishOnboarding}
 onBack={backToHub}
 onOpenAssistant={() => setAssistantOpen(true)}
 />
 <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} profile={profile} state={state} />
 </>
 );
 }

 if (view === "complete") {
 return (
 <>
 <Completion
 profile={profile}
 state={state}
 onRestart={restart}
 onOpenAssistant={() => setAssistantOpen(true)}
 />
 <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} profile={profile} state={state} />
 </>
 );
 }

 return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
