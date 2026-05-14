// Journey hub. the home view between days
const Hub = ({ state, profile, onOpenDay, onOpenAssistant, onHome }) => {
 const completed = Object.values(state.days || {}).filter((d) => d?.complete).length;
 const nextDayId = Math.min(completed + 1, 5);

 const greeting = (() => {
 const h = new Date().getHours();
 if (h < 5) return "Late night";
 if (h < 12) return "Good morning";
 if (h < 17) return "Afternoon";
 return "Evening";
 })();

 return (
 <div className="app">
 <Chrome state={state} onHome={onHome} onOpenAssistant={onOpenAssistant} />
 <Page max={1100}>
 {/* Hero */}
 <div className="enter" style={{ marginBottom: 56 }}>
 <div className="eyebrow" style={{ marginBottom: 16 }}>
 <span className="mono">W1 · {greeting}, {profile.name?.split(" ")[0]}</span>
 </div>
 <h1 className="display" style={{ margin: "0 0 28px", maxWidth: 920 }}>
 You're not here to <em style={{ color: "var(--text-3)" }}>maintain</em> the system.<br/>
 You're here to help <em style={{ color: "var(--accent)" }}>redesign</em> it.
 </h1>
 <p style={{ color: "var(--text-2)", fontSize: 17, lineHeight: 1.55, margin: 0, maxWidth: 640 }}>
 Five days. One company value per day. Each one builds on the last. By Friday you'll know exactly why we hired you for this role. and where you'll have impact.
 </p>
 </div>

 {/* Day grid */}
 <div className="enter enter-1" style={{ display: "grid", gap: 14 }}>
 {DAY_DEFS.map((def, i) => {
 const dayState = state.days?.[def.id] || {};
 const isComplete = !!dayState.complete;
 const isUnlocked = def.id <= nextDayId;
 const isCurrent = def.id === nextDayId && !isComplete;

 return (
 <DayCard
 key={def.id}
 def={def}
 index={i}
 state={dayState}
 isComplete={isComplete}
 isUnlocked={isUnlocked}
 isCurrent={isCurrent}
 onOpen={() => isUnlocked && onOpenDay(def.id)}
 />
 );
 })}
 </div>

 {/* Quiet footer cue */}
 <div className="enter enter-3" style={{
 marginTop: 56, padding: "20px 22px",
 background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14,
 display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
 }}>
 <Icon name="sparkle" size={16} style={{ color: "var(--accent)" }} />
 <span style={{ fontSize: 14, color: "var(--text-1)", flex: 1, minWidth: 220 }}>
 Stuck or curious? Ask someone who's been here before.
 </span>
 <button className="btn btn-quiet" onClick={onOpenAssistant}>
 Open the assistant
 <Icon name="arrowRight" size={13} />
 </button>
 </div>
 </Page>
 </div>
 );
};

const DayCard = ({ def, index, state, isComplete, isUnlocked, isCurrent, onOpen }) => {
 const status = isComplete ? "done" : isCurrent ? "active" : "locked";
 const dayLabel = ["Mon", "Tue", "Wed", "Thu", "Fri"][index];

 return (
 <button
 onClick={onOpen}
 disabled={!isUnlocked}
 style={{
 display: "grid",
 gridTemplateColumns: "auto 1fr auto",
 gap: 28,
 alignItems: "center",
 padding: "26px 28px",
 background: isCurrent
 ? "linear-gradient(180deg, var(--surface-2) 0%, var(--surface-1) 100%)"
 : "linear-gradient(180deg, var(--surface-1) 0%, var(--surface) 100%)",
 border: `1px solid ${isCurrent ? "var(--border-strong)" : "var(--border)"}`,
 borderRadius: 16,
 color: "inherit",
 textAlign: "left",
 cursor: isUnlocked ? "pointer" : "not-allowed",
 opacity: isUnlocked ? 1 : 0.55,
 transition: "all 0.18s",
 position: "relative",
 overflow: "hidden",
 }}
 onMouseEnter={(e) => {
 if (isUnlocked) {
 e.currentTarget.style.borderColor = "var(--border-strong)";
 e.currentTarget.style.transform = "translateY(-1px)";
 }
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.borderColor = isCurrent ? "var(--border-strong)" : "var(--border)";
 e.currentTarget.style.transform = "translateY(0)";
 }}
 >
 {/* Color rail */}
 <div style={{
 position: "absolute", left: 0, top: 0, bottom: 0,
 width: 3,
 background: isComplete ? "var(--sage)" : isCurrent ? def.color : "transparent",
 transition: "background 0.3s",
 }} />

 {/* Day number */}
 <div style={{
 width: 72, height: 72,
 borderRadius: 14,
 background: isComplete ? "transparent" : "var(--bg-1)",
 border: isComplete ? "1px solid var(--sage-deep)" : "1px solid var(--border)",
 display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
 flexShrink: 0,
 }}>
 <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
 {dayLabel}
 </span>
 <span className="serif" style={{ fontSize: 30, lineHeight: 1, marginTop: 2, color: isComplete ? "var(--sage)" : isCurrent ? def.color : "var(--text)" }}>
 {def.id}
 </span>
 </div>

 {/* Title */}
 <div>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
 <span className="eyebrow" style={{ color: isCurrent ? def.color : "var(--text-3)" }}>
 {def.value}
 </span>
 <span className={`status-dot status-${status}`} />
 {isCurrent && <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>← you are here</span>}
 {isComplete && <span className="mono" style={{ fontSize: 11, color: "var(--sage)" }}>complete</span>}
 </div>
 <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.015em", lineHeight: 1.15, marginBottom: 6 }}>
 {def.theme}
 </div>
 <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.45, maxWidth: 540 }}>
 {def.promise}
 </div>
 </div>

 {/* CTA */}
 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
 {!isUnlocked && <Icon name="lock" size={16} style={{ color: "var(--text-3)" }} />}
 {isUnlocked && !isComplete && (
 <span className="btn btn-primary" style={{ pointerEvents: "none" }}>
 {isCurrent ? "Begin" : "Open"}
 <Icon name="arrowRight" size={13} />
 </span>
 )}
 {isComplete && (
 <span className="btn btn-ghost" style={{ pointerEvents: "none", borderColor: "var(--border)" }}>
 Revisit
 <Icon name="arrowRight" size={13} />
 </span>
 )}
 </div>
 </button>
 );
};

window.Hub = Hub;
window.DayCard = DayCard;
