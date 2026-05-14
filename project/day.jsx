// Day shell. wraps individual day content with header, tasks sidebar, reflection
const DayShell = ({ dayId, state, profile, onUpdate, onComplete, onBack, onOpenAssistant }) => {
 const def = DAY_DEFS[dayId - 1];
 const dayState = state.days?.[dayId] || { tasks: {}, reflection: "", shared: [], submitted: false, complete: false };
 const tasksDef = DAY_TASKS[dayId] || [];
 const tasksDone = tasksDef.filter((t) => dayState.tasks?.[t.id]).length;
 const tasksComplete = tasksDone === tasksDef.length;
 const canSubmitReflection = tasksComplete;
 const [showTransition, setShowTransition] = useState(false);

 const toggleTask = (taskId) => {
 onUpdate({
 ...dayState,
 tasks: { ...dayState.tasks, [taskId]: !dayState.tasks?.[taskId] },
 });
 };

 const setReflection = (v) => onUpdate({ ...dayState, reflection: v });
 const setShared = (arr) => onUpdate({ ...dayState, shared: arr });
 const submitReflection = () => {
 onUpdate({ ...dayState, submitted: true, complete: true, completedAt: Date.now() });
 setShowTransition(true);
 };

 const continueAfter = () => {
 setShowTransition(false);
 if (dayId === 5) onComplete();
 else onBack();
 };

 return (
 <div className="app">
 <Chrome
 state={state}
 onHome={onBack}
 onOpenAssistant={onOpenAssistant}
 crumbs={[`Day ${dayId}`, def.value]}
 />

 <Page max={1180}>
 {/* Day header */}
 <div className="enter" style={{ marginBottom: 40 }}>
 <button
 onClick={onBack}
 className="chip"
 style={{ marginBottom: 24, cursor: "pointer" }}
 >
 <Icon name="arrowLeft" size={12} />
 All days
 </button>

 <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 12 }}>
 <span className="mono" style={{ fontSize: 12, color: def.color, letterSpacing: "0.08em" }}>
 DAY {String(dayId).padStart(2, "0")} / 05
 </span>
 <span className="eyebrow" style={{ color: "var(--text-3)" }}>{def.value}</span>
 </div>

 <h1 className="display" style={{ margin: "0 0 14px", maxWidth: 880 }}>
 {def.theme}
 </h1>

 <p style={{ color: "var(--text-2)", fontSize: 17, lineHeight: 1.55, margin: 0, maxWidth: 640 }}>
 {def.promise}
 </p>
 </div>

 {/* Layout: content + sticky tasks */}
 <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 40, alignItems: "start" }}>
 <div className="enter enter-1" style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 56 }}>
 {/* Day-specific body slotted in */}
 <DayContent dayId={dayId} profile={profile} state={dayState} onUpdate={onUpdate} />

 {/* Reflection. appears once tasks done */}
 <div>
 <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
 <span className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>End of day</span>
 <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
 {!canSubmitReflection && (
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>
 {tasksDone}/{tasksDef.length} steps · reflection unlocks after
 </span>
 )}
 </div>

 {canSubmitReflection ? (
 <Reflection
 prompt={def.reflection}
 value={dayState.reflection || ""}
 onChange={setReflection}
 onSubmit={submitReflection}
 shared={dayState.shared}
 onShare={setShared}
 submitted={dayState.submitted}
 />
 ) : (
 <div className="reflection" style={{ opacity: 0.55 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
 <Icon name="lock" size={14} style={{ color: "var(--text-3)" }} />
 <span className="eyebrow" style={{ color: "var(--text-3)" }}>Reflection</span>
 </div>
 <p className="serif" style={{ fontSize: 22, margin: 0, color: "var(--text-3)" }}>
 {def.reflection}
 </p>
 </div>
 )}

 {dayState.submitted && !showTransition && (
 <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
 <button className="btn btn-primary" onClick={() => setShowTransition(true)}>
 {dayId === 5 ? "Complete onboarding" : "Continue"}
 <Icon name="arrowRight" size={14} />
 </button>
 </div>
 )}
 </div>
 </div>

 {/* Sticky tasks rail */}
 <aside style={{ position: "sticky", top: 80 }}>
 <div className="card" style={{ padding: 18 }}>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
 <span className="eyebrow">Today's path</span>
 <span className="mono" style={{ fontSize: 11, color: tasksComplete ? "var(--sage)" : "var(--text-3)" }}>
 {tasksDone}/{tasksDef.length}
 </span>
 </div>

 <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
 {tasksDef.map((t, i) => {
 const done = !!dayState.tasks?.[t.id];
 return (
 <button
 key={t.id}
 onClick={() => toggleTask(t.id)}
 style={{
 display: "flex", alignItems: "flex-start", gap: 10,
 padding: "10px 10px", borderRadius: 8,
 background: "transparent", border: "none",
 color: "inherit", textAlign: "left", cursor: "pointer",
 transition: "background 0.15s",
 }}
 onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-2)"}
 onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
 >
 <span style={{
 width: 16, height: 16, borderRadius: 4,
 border: done ? "none" : "1.5px solid var(--border-strong)",
 background: done ? def.color : "transparent",
 display: "flex", alignItems: "center", justifyContent: "center",
 flexShrink: 0, marginTop: 2, color: "#1a1308",
 }}>
 {done && <Icon name="check" size={10} />}
 </span>
 <span style={{
 fontSize: 13.5, lineHeight: 1.4,
 color: done ? "var(--text-3)" : "var(--text-1)",
 textDecoration: done ? "line-through" : "none",
 }}>
 {t.label}
 </span>
 </button>
 );
 })}
 </div>

 <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
 <ProgressBar value={(tasksDone / tasksDef.length) * 100} />
 </div>
 </div>

 <div style={{ marginTop: 14, padding: 14, fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.55 }}>
 <div className="eyebrow" style={{ marginBottom: 8 }}>Intent</div>
 {def.intent}
 </div>
 </aside>
 </div>
 </Page>

 {/* Transition overlay */}
 {showTransition && (
 <DayTransition dayId={dayId} def={def} profile={profile} onContinue={continueAfter} />
 )}
 </div>
 );
};

// ---------- Transition between days ----------
const DayTransition = ({ dayId, def, profile, onContinue }) => {
 const next = DAY_DEFS[dayId];
 return (
 <div style={{
 position: "fixed", inset: 0, zIndex: 200,
 background: "rgba(10, 9, 8, 0.96)",
 backdropFilter: "blur(20px)",
 display: "flex", alignItems: "center", justifyContent: "center",
 padding: 32,
 animation: "fadeUp 0.5s ease both",
 }}>
 <div style={{ maxWidth: 640, textAlign: "center" }}>
 <div className="enter" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 28 }}>
 <span className="status-dot status-done" />
 <span className="mono" style={{ fontSize: 11, color: "var(--sage)", letterSpacing: "0.1em" }}>
 DAY {String(dayId).padStart(2, "0")} COMPLETE
 </span>
 </div>

 <h2 className="display enter enter-1" style={{ fontSize: "clamp(36px, 5.5vw, 56px)", margin: "0 0 22px" }}>
 {dayId === 5 ? (
 <>That's your first week, {profile.name?.split(" ")[0]}.</>
 ) : (
 <>{def.handoff}</>
 )}
 </h2>

 {dayId < 5 && (
 <p className="enter enter-2" style={{ color: "var(--text-2)", fontSize: 16, lineHeight: 1.6, margin: "0 0 36px" }}>
 Tomorrow → <span style={{ color: next.color }}>{next.value}</span> · {next.theme}
 </p>
 )}

 <button className="btn btn-primary enter enter-3" onClick={onContinue} style={{ padding: "14px 22px", fontSize: 15 }}>
 {dayId === 5 ? "See what you built" : "Onwards"}
 <Icon name="arrowRight" size={14} />
 </button>
 </div>
 </div>
 );
};

window.DayShell = DayShell;
