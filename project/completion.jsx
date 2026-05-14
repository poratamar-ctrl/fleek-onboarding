// Completion screen. Celebratory.
const Completion = ({ profile, state, onRestart, onOpenAssistant }) => {
 const reflections = DAY_DEFS
 .map((d) => ({ day: d, refl: state.days?.[d.id]?.reflection }))
 .filter((r) => r.refl?.trim());

 return (
 <div className="app">
 <Chrome state={state} onHome={onRestart} onOpenAssistant={onOpenAssistant} />

 <Page max={920}>
 <div className="enter" style={{ textAlign: "center", marginBottom: 56 }}>
 <Sparkles />
 <div className="eyebrow enter enter-1" style={{ marginTop: 32, marginBottom: 16, color: "var(--accent)" }}>
 Week one complete
 </div>
 <h1 className="display enter enter-2" style={{ margin: "0 0 22px" }}>
 Now let's build<br/>
 something <em style={{ color: "var(--accent)" }}>meaningful</em>.
 </h1>
 <p className="enter enter-3" style={{ color: "var(--text-2)", fontSize: 17, lineHeight: 1.6, margin: "0 auto", maxWidth: 540 }}>
 {profile.name?.split(" ")[0]}. you walked through five days. You met the people, saw the system, learned how we operate, built a workflow, and named what you want your impact to be. That's the easy part.
 </p>
 </div>

 {/* Your week, summarised */}
 <div className="enter enter-4" style={{ marginBottom: 48 }}>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
 <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--border)" }} />
 <span className="eyebrow">Your week, in your own words</span>
 <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--border)" }} />
 </div>
 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
 {reflections.map(({ day, refl }) => (
 <div key={day.id} style={{
 display: "grid", gridTemplateColumns: "auto 1fr",
 gap: 18, alignItems: "flex-start",
 padding: "18px 20px",
 background: "var(--surface-1)", border: "1px solid var(--border)",
 borderRadius: 12,
 }}>
 <div style={{
 display: "flex", flexDirection: "column", alignItems: "center",
 minWidth: 56,
 }}>
 <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
 DAY
 </span>
 <span className="serif" style={{ fontSize: 30, color: day.color, lineHeight: 1 }}>
 {day.id}
 </span>
 </div>
 <div style={{ paddingTop: 4 }}>
 <div className="mono" style={{ fontSize: 10.5, color: "var(--text-3)", marginBottom: 8, letterSpacing: "0.08em" }}>
 {day.value.toUpperCase()}. {day.reflection.toUpperCase()}
 </div>
 <div className="serif" style={{ fontSize: 18, lineHeight: 1.45, color: "var(--text)" }}>
 "{refl}"
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Next steps */}
 <div className="enter enter-5" style={{
 background: "var(--surface)", border: "1px solid var(--border)",
 borderRadius: 18, padding: "28px 28px",
 marginBottom: 36,
 }}>
 <div className="eyebrow" style={{ marginBottom: 14 }}>What happens next</div>
 <div style={{ display: "grid", gap: 10 }}>
 {[
 { t: "Monday 9am", b: "1:1 with Ayesha. Bring the reflection from Day 5. that's the conversation." },
 { t: "Tuesday", b: "Maya is taking you on a workspace walkthrough. Be curious, take notes." },
 { t: "Wednesday", b: "Sit in on your first new-joiner Day 1. Listen for what's missing." },
 { t: "By end of week 2", b: "Draft your one-pager: three things you'd improve, in order of bet." },
 ].map((n) => (
 <div key={n.t} style={{
 display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, alignItems: "baseline",
 padding: "10px 0", borderBottom: "1px solid var(--border)",
 }}>
 <span className="mono" style={{ fontSize: 11.5, color: "var(--accent)", letterSpacing: "0.06em" }}>
 {n.t.toUpperCase()}
 </span>
 <span style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.5 }}>{n.b}</span>
 </div>
 ))}
 </div>
 </div>

 <div className="enter enter-6" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
 <button className="btn btn-quiet" onClick={onOpenAssistant}>
 <Icon name="sparkle" size={13} />
 Keep asking
 </button>
 <button className="btn btn-ghost" onClick={onRestart}>
 <Icon name="refresh" size={13} />
 Start over
 </button>
 </div>

 <div className="enter enter-6" style={{
 marginTop: 48, textAlign: "center",
 fontSize: 13, color: "var(--text-3)",
 }} >
 <span className="mono">Fleek · 22 Commercial Street, London · {new Date().getFullYear()}</span>
 </div>
 </Page>
 </div>
 );
};

const Sparkles = () => (
 <div style={{ position: "relative", height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
 <div style={{
 position: "absolute",
 width: 200, height: 200,
 borderRadius: "50%",
 background: "radial-gradient(circle, var(--accent-glow), transparent 60%)",
 filter: "blur(20px)",
 }} />
 <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
 {[0, 1, 2, 3, 4].map((i) => (
 <span key={i} className="status-dot status-done"
 style={{
 width: 12, height: 12,
 animation: `pop 0.5s ${i * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
 }}
 />
 ))}
 </div>
 <style>{`@keyframes pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
 </div>
);

window.Completion = Completion;
