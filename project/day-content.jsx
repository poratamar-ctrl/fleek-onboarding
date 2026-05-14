// All 5 days' content. Each day exports a section component.
// Task definitions are kept centralized.

const DAY_TASKS = {
 1: [
 { id: "welcome", label: "Read your welcome message" },
 { id: "waiting", label: "See what's waiting for you on your desk" },
 { id: "office", label: "Explore the London HQ" },
 { id: "buddy", label: "Meet your onboarding buddy" },
 { id: "team", label: "Find three people to talk to this week" },
 ],
 2: [
 { id: "supply", label: "Walk the secondhand supply chain" },
 { id: "impact", label: "Read the impact numbers" },
 { id: "customer", label: "Hear from a customer" },
 { id: "founders", label: "Meet the founders" },
 ],
 3: [
 { id: "principles", label: "Read the operating principles" },
 { id: "scenario1", label: "Scenario: the missing laptop" },
 { id: "scenario2", label: "Scenario: the slack thread at 11pm" },
 { id: "operators", label: "How operators think here" },
 ],
 4: [
 { id: "ai-use", label: "See how People Ops uses AI today" },
 { id: "library", label: "Open the prompt library" },
 { id: "build", label: "Build your first workflow" },
 { id: "honest", label: "Read what we're still figuring out" },
 ],
 5: [
 { id: "vision", label: "Read the People Ops vision" },
 { id: "roadmap", label: "Review your 30-day roadmap" },
 { id: "final", label: "Open the final message" },
 ],
};

window.DAY_TASKS = DAY_TASKS;

// Dispatcher
const DayContent = ({ dayId, profile, state, onUpdate }) => {
 if (dayId === 1) return <Day1 profile={profile} state={state} onUpdate={onUpdate} />;
 if (dayId === 2) return <Day2 profile={profile} state={state} onUpdate={onUpdate} />;
 if (dayId === 3) return <Day3 profile={profile} state={state} onUpdate={onUpdate} />;
 if (dayId === 4) return <Day4 profile={profile} state={state} onUpdate={onUpdate} />;
 if (dayId === 5) return <Day5 profile={profile} state={state} onUpdate={onUpdate} />;
 return null;
};
window.DayContent = DayContent;

// Helper for marking a task done from within content
const useTaskMark = (state, onUpdate) => (id) => {
 if (state.tasks?.[id]) return;
 onUpdate({ ...state, tasks: { ...state.tasks, [id]: true } });
};

// =====================================================================
// DAY 1. Embrace Diversity / You Belong Here
// =====================================================================
const Day1 = ({ profile, state, onUpdate }) => {
 const mark = useTaskMark(state, onUpdate);
 const firstName = profile.name?.split(" ")[0] || "there";
 const buddy = TEAMMATES[0];

 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

 {/* Welcome */}
 <section onMouseEnter={() => mark("welcome")}>
 <SectionHead eyebrow="A note from your manager" title={`Welcome in, ${firstName}.`} />
 <div className="card" style={{ padding: 28 }}>
 <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
 <Avatar name="Ayesha Khan" size={44} />
 <div>
 <div style={{ fontWeight: 500, fontSize: 14.5 }}>Ayesha Khan</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)" }} className="mono">HEAD OF PEOPLE · 9:14am</div>
 </div>
 </div>
 <div style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-1)" }}>
 <p style={{ marginTop: 0 }}>
 We hired you because you've built things that didn't exist before. And you're calm in the messy middle. That's exactly the shape of this role.
 </p>
 <p>
 The next five days aren't a checklist. They're a slow handoff of the operating manual you'll help us rewrite. You'll meet the people, see the mission, learn how we operate, and by Friday you'll know where to spend your first real swing.
 </p>
 <p>
 About <span style={{ color: "var(--accent)" }}>"{profile.excitement}"</span>. We'll come back to this. Hold onto it for now.
 </p>
 <p style={{ marginBottom: 0, color: "var(--text-2)", fontStyle: "italic", fontFamily: "'Instrument Serif', serif", fontSize: 18 }}>
 Ayesha
 </p>
 </div>
 </div>
 </section>

 {/* What's waiting */}
 <section onMouseEnter={() => mark("waiting")}>
 <SectionHead
 eyebrow="On your desk this morning"
 title="What's waiting for you"
 sub="The basics, prepared in advance. The fact that you didn't have to ask is the entire point."
 />
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
 {[
 { icon: "laptop", title: "Your MacBook", sub: "Provisioned, encrypted, signed in. Slack and Notion already loaded." },
 { icon: "book", title: "Field notebook", sub: "We're old-fashioned about this. Take messy notes in week one." },
 { icon: "coffee", title: "Welcome coffee", sub: "From Allpress. Your buddy ordered it. Flat white, oat." },
 { icon: "user", title: "Buddy intro", sub: "Maya is at her desk. She blocked 11am for your first walk." },
 ].map((item) => (
 <div key={item.title} className="card card-hover" style={{ padding: 20 }}>
 <div style={{
 width: 36, height: 36, borderRadius: 10,
 background: "var(--surface-2)", border: "1px solid var(--border)",
 display: "flex", alignItems: "center", justifyContent: "center",
 color: "var(--accent)", marginBottom: 14,
 }}>
 <Icon name={item.icon} size={18} />
 </div>
 <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
 <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{item.sub}</div>
 </div>
 ))}
 </div>
 </section>

 {/* Office guide */}
 <section onMouseEnter={() => mark("office")}>
 <SectionHead
 eyebrow="The London HQ"
 title="The building you'll come to know"
 sub="22 Commercial Street. Spitalfields. You'll know the doorman by Thursday."
 />
 <OfficeGuide />
 </section>

 {/* Buddy */}
 <section onMouseEnter={() => mark("buddy")}>
 <SectionHead eyebrow="Meet your onboarding buddy" title="Maya. She's your first call." />
 <BuddyCard buddy={buddy} firstName={firstName} />
 </section>

 {/* People to talk to */}
 <section onMouseEnter={() => mark("team")}>
 <SectionHead
 eyebrow="People to talk to"
 title="The five conversations to have this week"
 sub="In a 140-person company, the operating manual lives inside people. These are the five who hold the parts you need."
 />
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
 {TEAMMATES.map((p) => <PersonCard key={p.name} person={p} />)}
 </div>
 </section>
 </div>
 );
};

const OfficeGuide = () => {
 const [tab, setTab] = useState("floor");
 return (
 <div className="card" style={{ overflow: "hidden" }}>
 {/* Tabs */}
 <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
 {[
 { id: "floor", label: "The floor", icon: "map" },
 { id: "coffee", label: "Coffee & lunch", icon: "coffee" },
 { id: "logistics", label: "Logistics", icon: "pin" },
 ].map((t) => (
 <button
 key={t.id}
 onClick={() => setTab(t.id)}
 style={{
 padding: "14px 20px", fontSize: 13.5,
 background: "transparent", border: "none",
 color: tab === t.id ? "var(--text)" : "var(--text-3)",
 borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
 display: "flex", alignItems: "center", gap: 8,
 cursor: "pointer", fontWeight: tab === t.id ? 500 : 400,
 }}
 >
 <Icon name={t.icon} size={14} />
 {t.label}
 </button>
 ))}
 </div>

 <div style={{ padding: 24 }}>
 {tab === "floor" && (
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
 <div className="placeholder-img" style={{ aspectRatio: "4/3" }}>
 <span>Floor plan · 2F · Spitalfields</span>
 </div>
 <div>
 <div className="serif" style={{ fontSize: 22, marginBottom: 12 }}>
 Three desks from the window. East-facing.
 </div>
 <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginTop: 0 }}>
 People Ops sits on the second floor, near the breakout kitchen. Engineering is one floor up. Yes, that matters, you'll bump into them constantly. Quiet rooms are bookable for 1:1s. The roof terrace is open weather-permitting.
 </p>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
 <span className="chip"><Icon name="check" size={11} />Standing desk</span>
 <span className="chip"><Icon name="check" size={11} />Second monitor</span>
 <span className="chip"><Icon name="check" size={11} />Decent chair</span>
 </div>
 </div>
 </div>
 )}

 {tab === "coffee" && (
 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
 {COFFEE_SPOTS.map((c) => (
 <div key={c.name} style={{
 display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center",
 padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)",
 borderRadius: 10,
 }}>
 <div style={{
 width: 36, height: 36, borderRadius: 10,
 background: "var(--surface-2)",
 display: "flex", alignItems: "center", justifyContent: "center",
 color: "var(--accent)",
 }}>
 <Icon name="coffee" size={16} />
 </div>
 <div>
 <div style={{ fontWeight: 500, fontSize: 14 }}>{c.name}</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{c.note}</div>
 </div>
 <div className="mono" style={{ fontSize: 11, color: "var(--text-2)" }}>{c.dist}</div>
 </div>
 ))}
 </div>
 )}

 {tab === "logistics" && (
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
 {[
 { k: "Building hours", v: "Mon–Fri, 7am–10pm. After-hours via Sofia." },
 { k: "Anchor days", v: "Wed + Thu in-office. Rest hybrid by team." },
 { k: "Wifi", v: "fleek-hq · password in the welcome doc" },
 { k: "Print", v: "Second floor, behind the kitchen" },
 { k: "Quiet rooms", v: "Bookable in Slack via /room" },
 { k: "Bikes", v: "Rack in basement. Showers on floor 1." },
 ].map((row) => (
 <div key={row.k} style={{ padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
 <div className="eyebrow" style={{ marginBottom: 6 }}>{row.k}</div>
 <div style={{ fontSize: 14, color: "var(--text-1)" }}>{row.v}</div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
};

const BuddyCard = ({ buddy, firstName }) => (
 <div className="card" style={{ padding: 28, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24 }}>
 <Avatar name={buddy.name} size={96} />
 <div>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
 <span className="chip" style={{ background: "var(--accent-glow)", color: "var(--accent)", borderColor: "var(--accent-deep)" }}>
 <Icon name="sparkle" size={11} /> Your buddy
 </span>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{buddy.tenure.toUpperCase()}</span>
 </div>
 <h3 className="serif" style={{ fontSize: 28, margin: "0 0 4px" }}>{buddy.name}</h3>
 <div style={{ color: "var(--text-2)", fontSize: 14, marginBottom: 16 }}>{buddy.role} · {buddy.location}</div>
 <p style={{ fontSize: 15, color: "var(--text-1)", lineHeight: 1.6, margin: "0 0 18px", maxWidth: 540 }}>
 Hey {firstName} 👋 I'm Maya. I joined Fleek seven months ago, so the messy bits of starting here are <em>very</em> fresh in my head. I blocked Tuesday and Thursday afternoons this week. Bring me whatever, especially the questions you feel silly asking.
 </p>
 <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
 <button className="btn btn-quiet" onClick={() => alert("Message sent. Maya will see it in Slack.")}><Icon name="message" size={13} />Slack Maya</button>
 <button className="btn btn-quiet" onClick={() => alert("Calendar invite drafted.")}><Icon name="clock" size={13} />Book a walk-and-talk</button>
 </div>
 </div>
 </div>
);

const PersonCard = ({ person }) => (
 <div className="card card-hover" style={{ padding: 20 }}>
 <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
 <Avatar name={person.name} size={44} />
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14.5, fontWeight: 500 }}>{person.name}</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{person.role}</div>
 </div>
 <span className="chip" style={{ fontSize: 10.5, padding: "3px 8px" }}>{person.tag}</span>
 </div>
 <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5, marginBottom: 14, minHeight: 56 }}>
 "{person.ask}"
 </div>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
 <span className="mono" style={{ fontSize: 10.5, color: "var(--text-3)" }}>{person.tenure.toUpperCase()}</span>
 <button className="chip" style={{ cursor: "pointer" }}>
 <Icon name="message" size={11} />Message
 </button>
 </div>
 </div>
);

// =====================================================================
// DAY 2. Talk to the Customer / Why Fleek Exists
// =====================================================================
const Day2 = ({ profile, state, onUpdate }) => {
 const mark = useTaskMark(state, onUpdate);
 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

 <section onMouseEnter={() => mark("supply")}>
 <SectionHead
 eyebrow="The broken system"
 title="The journey of one secondhand t-shirt"
 sub="Before you can fix something, you have to see exactly how it breaks. Click through the chain."
 />
 <SupplyChainExplorer />
 </section>

 <section onMouseEnter={() => mark("impact")}>
 <SectionHead eyebrow="The numbers" title="What we measure ourselves against" />
 <ImpactNumbers />
 </section>

 <section onMouseEnter={() => mark("customer")}>
 <SectionHead
 eyebrow="The customer"
 title="Two people Fleek exists for"
 sub="We call them sellers and buyers. They're real, with names, in cities. Talk to them often."
 />
 <CustomerStories />
 </section>

 <section onMouseEnter={() => mark("founders")}>
 <SectionHead eyebrow="The founders" title="Why they started, in their words" />
 <FoundersBlock />
 </section>

 {/* Closing emotional beat */}
 <section style={{
 background: "var(--surface)", border: "1px solid var(--border)",
 borderRadius: 18, padding: "40px 32px",
 }}>
 <div className="eyebrow" style={{ marginBottom: 16, color: "var(--accent)" }}>Why this work matters</div>
 <p className="serif" style={{ fontSize: 28, lineHeight: 1.3, margin: 0, maxWidth: 720, letterSpacing: "-0.015em" }}>
 Every garment we route correctly is a small refusal to participate in the way fashion currently works.
 Multiply that by the millions and you have a different industry.
 </p>
 <div style={{ marginTop: 22, fontSize: 14, color: "var(--text-3)" }} className="mono">
 INTERNAL MEMO, JAN 2025
 </div>
 </section>
 </div>
 );
};

const SUPPLY_STEPS = [
 { id: 1, title: "Donation", body: "A jacket is donated to a charity shop in Manchester. It will be touched by 6+ people across 4 countries before its next wear.", stat: "100B garments / year produced globally" },
 { id: 2, title: "Sorting", body: "Most charity shops can't sell 70% of donations. The surplus is baled and sold by weight to graders.", stat: "70% never reaches a shop floor" },
 { id: 3, title: "Export", body: "Bales travel, often to Pakistan, Kenya, the Philippines. Pricing is opaque. Quality is unknown until the bale is opened.", stat: "$5B annual secondhand export market" },
 { id: 4, title: "Grading", body: "Graders manually sort by type and condition. This is where Fleek operates, and where AI vision changes the unit economics.", stat: "~9s per garment, manual" },
 { id: 5, title: "Resale", body: "Sorted garments reach local shops, online marketplaces, or, too often, landfill. Fleek routes them where they have most value.", stat: "60% still end up in landfill" },
];

const SupplyChainExplorer = () => {
 const [active, setActive] = useState(1);
 const step = SUPPLY_STEPS.find((s) => s.id === active);
 return (
 <div className="card" style={{ padding: 28 }}>
 <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
 {SUPPLY_STEPS.map((s, i) => (
 <button
 key={s.id}
 onClick={() => setActive(s.id)}
 style={{
 display: "flex", alignItems: "center", gap: 10,
 padding: "10px 14px", borderRadius: 8,
 background: active === s.id ? "var(--surface-2)" : "transparent",
 border: active === s.id ? "1px solid var(--border-strong)" : "1px solid transparent",
 color: active === s.id ? "var(--text)" : "var(--text-3)",
 cursor: "pointer", fontSize: 13,
 transition: "all 0.15s",
 flex: "1 1 0", minWidth: 0,
 }}
 >
 <span className="mono" style={{ fontSize: 10.5, color: active === s.id ? "var(--accent)" : "var(--text-3)" }}>
 {String(i + 1).padStart(2, "0")}
 </span>
 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</span>
 </button>
 ))}
 </div>

 <div key={active} className="enter" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28 }}>
 <div>
 <div className="mono" style={{ fontSize: 11, color: "var(--accent)", marginBottom: 12, letterSpacing: "0.1em" }}>
 STEP {String(step.id).padStart(2, "0")} / {step.title.toUpperCase()}
 </div>
 <p className="serif" style={{ fontSize: 26, lineHeight: 1.3, margin: "0 0 18px", color: "var(--text)" }}>
 {step.body}
 </p>
 <div style={{
 padding: "14px 16px", background: "var(--surface)", borderLeft: "2px solid var(--accent-deep)",
 fontSize: 14, color: "var(--text-1)",
 }}>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", display: "block", marginBottom: 4 }}>
 FOR CONTEXT
 </span>
 {step.stat}
 </div>
 </div>
 <div className="placeholder-img" style={{ minHeight: 240 }}>
 <span>Photo · Step {step.id}</span>
 </div>
 </div>
 </div>
 );
};

const ImpactNumbers = () => {
 const numbers = [
 { v: "9.2M", l: "garments routed away from landfill", sub: "Since Q3 2023" },
 { v: "47%", l: "reduction in sorting time", sub: "AI vision vs manual" },
 { v: "3", l: "countries operating", sub: "London, Karachi, Bengaluru" },
 { v: "$22M", l: "Series B raised", sub: "October 2025" },
 ];
 return (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
 {numbers.map((n) => (
 <div key={n.l} className="card" style={{ padding: 24 }}>
 <div className="serif" style={{ fontSize: 52, lineHeight: 1, marginBottom: 12, color: "var(--accent)", letterSpacing: "-0.02em" }}>
 {n.v}
 </div>
 <div style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.4, marginBottom: 8 }}>{n.l}</div>
 <div className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{n.sub}</div>
 </div>
 ))}
 </div>
 );
};

const CUSTOMERS = [
 {
 name: "Imran Sheikh",
 role: "Grader at Karachi facility",
 quote: "Before Fleek, I'd open a bale and just hope. Now I scan a bag, the app tells me what's likely inside and where it'll sell best. I sort twice as much and I don't go home with my back aching.",
 },
 {
 name: "Lena Vasquez",
 role: "Resale shop owner in East London",
 quote: "I used to buy bales blind. Fleek shows me condition, category, and likely sell-through before I commit. My margins are real now. I hire one more person this winter because of that.",
 },
];

const CustomerStories = () => {
 const [active, setActive] = useState(0);
 const c = CUSTOMERS[active];
 return (
 <div className="card" style={{ padding: 28 }}>
 <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
 {CUSTOMERS.map((cc, i) => (
 <button
 key={cc.name}
 onClick={() => setActive(i)}
 className="chip"
 style={{
 cursor: "pointer",
 background: active === i ? "var(--surface-2)" : "var(--surface-1)",
 borderColor: active === i ? "var(--border-strong)" : "var(--border)",
 color: active === i ? "var(--text)" : "var(--text-2)",
 }}
 >
 <Avatar name={cc.name} size={18} />
 {cc.name}
 </button>
 ))}
 </div>
 <div key={active} className="enter" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 28 }}>
 <div className="placeholder-img" style={{ minHeight: 220 }}>
 <span>Portrait · {c.name}</span>
 </div>
 <div>
 <Icon name="quote" size={22} style={{ color: "var(--accent)", marginBottom: 12 }} />
 <p className="serif" style={{ fontSize: 24, lineHeight: 1.35, margin: "0 0 18px", color: "var(--text)" }}>
 {c.quote}
 </p>
 <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
 <div style={{ fontSize: 13, color: "var(--text-3)" }}>{c.role}</div>
 </div>
 </div>
 </div>
 );
};

const FoundersBlock = () => (
 <div>
 <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
 <div className="placeholder-img" style={{ height: 280, border: "none", borderRadius: 0, position: "relative" }}>
 <span>Founder welcome · video placeholder</span>
 <button style={{
 position: "absolute",
 width: 64, height: 64, borderRadius: "50%",
 background: "var(--accent)", color: "#1a1308",
 border: "none", display: "flex", alignItems: "center", justifyContent: "center",
 cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
 }}>
 <Icon name="play" size={22} />
 </button>
 </div>
 <div style={{ padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
 <div>
 <div style={{ fontWeight: 500, fontSize: 14 }}>The founder hello, recorded for new joiners</div>
 <div style={{ fontSize: 12, color: "var(--text-3)" }}>Sanya & Rohan · 6:42</div>
 </div>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>UPDATED Q1 2026</span>
 </div>
 </div>

 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
 {LEADERSHIP.map((p) => (
 <div key={p.name} className="card" style={{ padding: 22 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
 <Avatar name={p.name} size={44} />
 <div>
 <div style={{ fontWeight: 500, fontSize: 14.5 }}>{p.name}</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{p.role}</div>
 </div>
 </div>
 <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55, margin: "0 0 14px" }}>
 {p.bio}
 </p>
 <div style={{ padding: "12px 14px", background: "var(--surface)", borderLeft: "2px solid var(--accent-deep)", fontSize: 13.5, color: "var(--text-1)", lineHeight: 1.5, fontStyle: "italic", fontFamily: "'Instrument Serif', serif" }}>
 "{p.quote}"
 </div>
 </div>
 ))}
 </div>
 </div>
);

window.Day1 = Day1;
window.Day2 = Day2;
window.DayContent = DayContent;
