// Shared UI primitives. Icons, Avatar, Progress, etc.
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Icons (stroke-based, hand-drawn feel) ----------
const Icon = ({ name, size = 18, ...rest }) => {
 const paths = {
 arrowRight: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
 arrowLeft: <><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></>,
 check: <path d="M5 12l4.5 4.5L19 7"/>,
 lock: <><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
 sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>,
 coffee: <><path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M7 2v3M11 2v3"/></>,
 book: <><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></>,
 laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 20h20"/></>,
 user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></>,
 users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M22 21c0-3.1-1.8-5.7-4.5-6.5"/></>,
 map: <><path d="M9 4 3 7v13l6-3 6 3 6-3V4l-6 3-6-3z"/><path d="M9 4v13M15 7v13"/></>,
 leaf: <><path d="M11 20A8 8 0 0 1 5 6c2-2 5-2 8-2s7 0 9 0c0 6 0 9-2 11a8 8 0 0 1-9 5z"/><path d="M5 21c2-8 8-12 14-12"/></>,
 bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>,
 target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
 compass: <><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2z"/></>,
 flag: <><path d="M4 22V4"/><path d="M4 4h14l-2 4 2 4H4"/></>,
 message: <><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5A8 8 0 1 1 21 12z"/></>,
 send: <><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="m22 2-11 11"/></>,
 close: <><path d="m6 6 12 12M18 6 6 18"/></>,
 chevron: <path d="m9 6 6 6-6 6"/>,
 chevronDown: <path d="m6 9 6 6 6-6"/>,
 play: <path d="M8 5v14l11-7L8 5z"/>,
 pin: <><path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></>,
 plus: <><path d="M12 5v14M5 12h14"/></>,
 quote: <><path d="M7 7h4v6a4 4 0 0 1-4 4M14 7h4v6a4 4 0 0 1-4 4"/></>,
 grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
 heart: <path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11h-2z"/>,
 rocket: <><path d="M14 4s4 0 6 2 2 6 2 6-3-1-6 2-7 8-7 8L4 17l5-9c3-3 5-4 5-4z"/><path d="m9 15-3 3 3 1 1 3 3-3"/></>,
 workflow: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></>,
 refresh: <><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 21v-5h5M21 3v5h-5"/></>,
 share: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></>,
 };
 return (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
 {...rest}>{paths[name]}</svg>
 );
};

// ---------- Avatar from initials (darker, work on cream bg) ----------
const avatarGradients = [
 ["#161410", "#3a3429"],
 ["#4f6e48", "#3a5535"],
 ["#4f5fc7", "#3540a0"],
 ["#d23a3a", "#8f1f1f"],
 ["#ea7e2c", "#b85a18"],
 ["#3a6a7e", "#1f4254"],
];

// ---------- Starburst (Fleek brand glyph) ----------
const Starburst = ({ size = 24, color = "var(--accent)", spin = false }) => (
 <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "inline-block" }} className={spin ? "spin-slow" : ""}>
 <path d="M50 2 L58 32 L88 18 L66 44 L98 50 L66 56 L88 82 L58 68 L50 98 L42 68 L12 82 L34 56 L2 50 L34 44 L12 18 L42 32 Z"
 fill={color} />
 </svg>
);
const initials = (name) =>
 (name || "")
 .split(/\s+/)
 .filter(Boolean)
 .slice(0, 2)
 .map((w) => w[0])
 .join("")
 .toUpperCase();

const hashSeed = (s) => {
 let h = 0;
 for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
 return Math.abs(h);
};

const Avatar = ({ name, size = 40, src }) => {
 const g = avatarGradients[hashSeed(name) % avatarGradients.length];
 const style = {
 width: size, height: size,
 background: `linear-gradient(140deg, ${g[0]} 0%, ${g[1]} 100%)`,
 fontSize: size * 0.36,
 };
 return (
 <span className="avatar" style={style}>
 <span style={{ position: "relative", zIndex: 1 }}>{initials(name)}</span>
 </span>
 );
};

// ---------- Progress bar ----------
const ProgressBar = ({ value }) => (
 <div className="progress-track" style={{ flex: 1 }}>
 <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
 </div>
);

// ---------- Top chrome ----------
const Chrome = ({ state, onHome, onOpenAssistant, crumbs = [] }) => {
 const completed = Object.values(state.days || {}).filter((d) => d?.complete).length;
 const pct = Math.round((completed / 5) * 100);
 return (
 <header className="chrome">
 <div className="chrome-inner">
 <button className="brand" onClick={onHome} style={{ background: "transparent", border: "none", color: "inherit", padding: 0, cursor: "pointer" }}>
 <img src="assets/fleek-logo.png" alt="Fleek" className="brand-mark" />
 <span style={{ color: "var(--text-3)", fontWeight: 400, marginLeft: 4 }}>Onboarding</span>
 </button>

 {crumbs.length > 0 && (
 <div className="crumb">
 {crumbs.map((c, i) => (
 <React.Fragment key={i}>
 {i > 0 && <span className="sep">/</span>}
 <span>{c}</span>
 </React.Fragment>
 ))}
 </div>
 )}

 <div className="chrome-spacer" />

 <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 240 }}>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}>
 {completed}/5 · {pct}%
 </span>
 <ProgressBar value={pct} />
 </div>

 <button className="chip" onClick={onOpenAssistant} title="Ask someone who's been here before">
 <Icon name="sparkle" size={12} />
 <span>Ask</span>
 </button>
 </div>
 </header>
 );
};

// ---------- Section header ----------
const SectionHead = ({ eyebrow, title, sub }) => (
 <div style={{ marginBottom: 22 }}>
 {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
 <h2 className="serif" style={{ fontSize: 32, margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-0.015em" }}>{title}</h2>
 {sub && <p style={{ margin: 0, color: "var(--text-2)", fontSize: 15, maxWidth: 620, lineHeight: 1.5 }}>{sub}</p>}
 </div>
);

// ---------- Toast ----------
const Toast = ({ children, icon = "check" }) => (
 <div className="toast">
 <Icon name={icon} size={14} />
 <span>{children}</span>
 </div>
);

// ---------- Reflection block ----------
const Reflection = ({ prompt, value, onChange, onSubmit, shared, onShare, submitted }) => {
 const [shareOpen, setShareOpen] = useState(false);
 const [shareWith, setShareWith] = useState([]);

 const toggleShare = (who) => {
 setShareWith((arr) => arr.includes(who) ? arr.filter((x) => x !== who) : [...arr, who]);
 };

 const handleSubmit = () => {
 onShare && onShare(shareWith);
 onSubmit();
 };

 return (
 <div className="reflection">
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
 <Icon name="quote" size={16} style={{ color: "var(--accent)" }} />
 <span className="eyebrow" style={{ color: "var(--text-1)" }}>Daily Reflection</span>
 </div>

 <p className="serif" style={{ fontSize: 22, margin: "0 0 14px", lineHeight: 1.25, color: "var(--text)" }}>
 {prompt}
 </p>

 <textarea
 placeholder="Take a moment. There's no wrong answer here."
 value={value}
 onChange={(e) => onChange(e.target.value)}
 disabled={submitted}
 />

 <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
 {!submitted && (
 <button
 className="chip"
 onClick={() => setShareOpen((v) => !v)}
 style={{ alignSelf: "flex-start", cursor: "pointer" }}
 >
 <Icon name="share" size={12} />
 <span>{shareWith.length > 0 ? `Sharing with ${shareWith.length}` : "Share this reflection (optional)"}</span>
 <Icon name="chevronDown" size={12} style={{ transform: shareOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
 </button>
 )}

 {shareOpen && !submitted && (
 <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 2 }}>
 {["HR", "Onboarding buddy", "Manager"].map((who) => (
 <button
 key={who}
 className="chip"
 onClick={() => toggleShare(who)}
 style={{
 background: shareWith.includes(who) ? "var(--accent-glow)" : "var(--surface-1)",
 borderColor: shareWith.includes(who) ? "var(--accent-deep)" : "var(--border)",
 color: shareWith.includes(who) ? "var(--accent)" : "var(--text-1)",
 cursor: "pointer",
 }}
 >
 {shareWith.includes(who) && <Icon name="check" size={11} />}
 {who}
 </button>
 ))}
 </div>
 )}

 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>
 {submitted ? "Saved · only you can see this" : "Saved locally as you type"}
 </span>
 {!submitted ? (
 <button
 className="btn btn-primary"
 disabled={!value.trim()}
 onClick={handleSubmit}
 >
 Save reflection
 <Icon name="arrowRight" size={14} />
 </button>
 ) : (
 <span className="chip" style={{ borderColor: "var(--sage-deep)", color: "var(--sage)" }}>
 <Icon name="check" size={12} />
 {shared && shared.length > 0 ? `Shared with ${shared.join(", ")}` : "Reflection saved"}
 </span>
 )}
 </div>
 </div>
 </div>
 );
};

// ---------- Task / checkbox row ----------
const TaskRow = ({ done, label, sub, onToggle, accent = "var(--accent)" }) => (
 <button
 onClick={onToggle}
 style={{
 display: "flex", alignItems: "flex-start", gap: 14,
 width: "100%", textAlign: "left",
 padding: "14px 16px",
 background: done ? "var(--surface)" : "var(--surface-1)",
 border: "1px solid var(--border)",
 borderRadius: 12,
 color: "inherit",
 transition: "all 0.15s",
 }}
 onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
 onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
 >
 <span style={{
 width: 20, height: 20, borderRadius: 6,
 border: done ? "none" : "1.5px solid var(--border-strong)",
 background: done ? accent : "transparent",
 color: "#1a1308",
 display: "flex", alignItems: "center", justifyContent: "center",
 flexShrink: 0, marginTop: 1,
 transition: "all 0.15s",
 }}>
 {done && <Icon name="check" size={12} />}
 </span>
 <span style={{ flex: 1 }}>
 <div style={{
 fontSize: 14.5, fontWeight: 500, lineHeight: 1.4,
 color: done ? "var(--text-2)" : "var(--text)",
 textDecoration: done ? "line-through" : "none",
 textDecorationColor: "var(--text-3)",
 }}>{label}</div>
 {sub && <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
 </span>
 </button>
);

// ---------- Page wrapper ----------
const Page = ({ children, max = 1100 }) => (
 <main style={{ flex: 1, position: "relative", zIndex: 2 }}>
 <div style={{ maxWidth: max, margin: "0 auto", padding: "44px 28px 120px" }}>
 {children}
 </div>
 </main>
);

Object.assign(window, {
 Icon, Avatar, ProgressBar, Chrome, SectionHead, Toast, Reflection, TaskRow, Page,
 Starburst, initials, hashSeed,
});
