// Days 3, 4, 5

// =====================================================================
// DAY 3. Absolute Ownership / How We Operate
// =====================================================================
const Day3 = ({ profile, state, onUpdate }) => {
 const mark = useTaskMark(state, onUpdate);
 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

 <section onMouseEnter={() => mark("principles")}>
 <SectionHead
 eyebrow="The operating principles"
 title="How decisions actually get made here"
 sub="Four rules. Not a manifesto. Each one is something we'd re-explain in a doorway."
 />
 <PrinciplesGrid />
 </section>

 <section onMouseEnter={() => mark("scenario1")}>
 <SectionHead
 eyebrow="Scenario 1"
 title="A new joiner arrives. Their laptop hasn't been prepared."
 sub="What do you do? There's no single right answer, but there are tells."
 />
 <Scenario
 scenarioKey="laptop"
 state={state}
 onUpdate={onUpdate}
 options={[
 { id: "a", label: "Email IT and ask when it'll be ready. Apologise to the new joiner.", grade: "low",
 feedback: "Honest, but it makes the new joiner the buffer. Their first hour at Fleek shouldn't include 'I'm sorry, we're not ready for you.'" },
 { id: "b", label: "Grab a loaner from the kit cabinet, get them productive in 20 minutes, and post-mortem with IT after lunch.", grade: "high",
 feedback: "This is the move. Speed for the human in front of you, accountability through the post-mortem. Ownership is felt by the new joiner inside an hour." },
 { id: "c", label: "Walk them to coffee, talk through Day 1 content, and quietly pull IT into a Slack DM.", grade: "mid",
 feedback: "Warm, and not wrong. But you've delayed the obvious fix. A loaner exists for exactly this. Combine this with option B." },
 { id: "d", label: "Escalate to your manager. They'll know what to do.", grade: "low",
 feedback: "Your manager hired you so they wouldn't have to make this call. The loaner cabinet is two doors down. Make it." },
 ]}
 />
 </section>

 <section onMouseEnter={() => mark("scenario2")}>
 <SectionHead
 eyebrow="Scenario 2"
 title="11:47pm. A panicked DM from a teammate in Karachi."
 sub="Their offer letter has the wrong start date. Candidate signs tomorrow morning."
 />
 <Scenario
 scenarioKey="slack"
 state={state}
 onUpdate={onUpdate}
 options={[
 { id: "a", label: "Reply in the morning when you're sharp.", grade: "low",
 feedback: "By morning London time, Karachi is end-of-day and the candidate has either signed something wrong or walked. A two-minute fix tonight saves a day tomorrow." },
 { id: "b", label: "Fix the doc, send the corrected version, and write a one-liner in #people-ops so others see the gotcha.", grade: "high",
 feedback: "Fast, written down, learnable. This is how a 140-person company stays coordinated. The note in #people-ops is the part most people skip." },
 { id: "c", label: "Reply, fix the doc, and don't tell anyone. It's done.", grade: "mid",
 feedback: "Half the job. The fix is good. But the system didn't learn. So it'll happen again to someone else next month." },
 { id: "d", label: "Call your teammate to walk through it together.", grade: "mid",
 feedback: "Kind. At 11:47pm, probably overkill. Save calls for ambiguous problems, use written async for crisp ones." },
 ]}
 />
 </section>

 <section onMouseEnter={() => mark("operators")}>
 <SectionHead eyebrow="The internal language" title="How successful operators think at Fleek" />
 <OperatorsGrid />
 </section>
 </div>
 );
};

const PRINCIPLES = [
 { icon: "bolt", title: "Speed over perfection.", body: "A 7/10 decision today beats a 9/10 next month. The cost of slowness is invisible. But real." },
 { icon: "target", title: "Solve problems directly.", body: "If you can fix it, fix it. Don't route it through three Slacks. Tell people after, not before." },
 { icon: "refresh", title: "Improve the system, not just the ticket.", body: "If you fixed it once, write the doc, change the template, or build the script. The same problem twice is a culture problem." },
 { icon: "message", title: "Communicate in writing, loudly.", body: "Async by default. Public channels over DMs. The note no one reads is still the note that helped someone tomorrow." },
];

const PrinciplesGrid = () => (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
 {PRINCIPLES.map((p) => (
 <div key={p.title} className="card" style={{ padding: 24 }}>
 <Icon name={p.icon} size={22} style={{ color: "var(--d3)", marginBottom: 16 }} />
 <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 10 }}>{p.title}</div>
 <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
 </div>
 ))}
 </div>
);

const Scenario = ({ scenarioKey, options, state, onUpdate }) => {
 const picked = state.scenarios?.[scenarioKey];
 const choose = (id) => {
 onUpdate({ ...state, scenarios: { ...state.scenarios, [scenarioKey]: id } });
 };
 const reset = () => {
 const next = { ...state.scenarios };
 delete next[scenarioKey];
 onUpdate({ ...state, scenarios: next });
 };
 const pickedOption = options.find((o) => o.id === picked);

 const gradeColor = { high: "var(--sage)", mid: "var(--accent)", low: "var(--d5)" };

 return (
 <div className="card" style={{ padding: 24 }}>
 {!picked ? (
 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
 {options.map((o) => (
 <button
 key={o.id}
 onClick={() => choose(o.id)}
 style={{
 display: "flex", alignItems: "flex-start", gap: 14,
 padding: "16px 18px", background: "var(--surface)",
 border: "1px solid var(--border)", borderRadius: 12,
 textAlign: "left", color: "inherit", cursor: "pointer",
 transition: "all 0.15s",
 }}
 onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--surface-1)"; }}
 onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
 >
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2, minWidth: 18 }}>
 {o.id.toUpperCase()}
 </span>
 <span style={{ fontSize: 15, color: "var(--text-1)", lineHeight: 1.45 }}>{o.label}</span>
 </button>
 ))}
 </div>
 ) : (
 <div className="enter">
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
 <span style={{
 padding: "4px 10px", borderRadius: 999, fontSize: 11,
 background: "var(--surface-2)", color: gradeColor[pickedOption.grade],
 border: `1px solid ${gradeColor[pickedOption.grade]}`,
 }} className="mono">
 {pickedOption.grade === "high" ? "STRONG MOVE" : pickedOption.grade === "mid" ? "MIXED" : "WEAK MOVE"}
 </span>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>YOU PICKED {pickedOption.id.toUpperCase()}</span>
 </div>
 <div style={{ padding: 18, background: "var(--surface)", borderRadius: 12, marginBottom: 16 }}>
 <div className="eyebrow" style={{ marginBottom: 10, color: "var(--accent)" }}>
 <Icon name="sparkle" size={11} style={{ display: "inline-block", marginRight: 6 }} />
 Fleek feedback
 </div>
 <p className="serif" style={{ fontSize: 19, lineHeight: 1.45, margin: 0, color: "var(--text)" }}>
 {pickedOption.feedback}
 </p>
 </div>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
 <span style={{ fontSize: 13, color: "var(--text-3)" }}>
 There isn't one right answer. There are tells.
 </span>
 <button className="btn btn-quiet" onClick={reset}>
 <Icon name="refresh" size={13} />Try a different answer
 </button>
 </div>
 </div>
 )}
 </div>
 );
};

const OPERATORS = [
 { word: "Ownership", say: "You don't say 'someone should'. You say 'I'll have it by Thursday.'" },
 { word: "Velocity", say: "You measure your week by what shipped, not what's in flight." },
 { word: "Systems", say: "After you solve it twice, you build the thing that solves it the third time without you." },
 { word: "Async", say: "You write the doc before the meeting. The meeting becomes a 15-min decision, not a 45-min explanation." },
 { word: "Customer", say: "You can name the person whose week your work just changed." },
 { word: "Honesty", say: "You say 'I don't know' early, not late. You name what you're worried about before it lands." },
];

const OperatorsGrid = () => (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
 {OPERATORS.map((o) => (
 <div key={o.word} style={{
 padding: "18px 20px",
 background: "var(--surface-1)", border: "1px solid var(--border)",
 borderRadius: 12,
 }}>
 <div className="mono" style={{ fontSize: 11, color: "var(--d3)", letterSpacing: "0.1em", marginBottom: 8 }}>
 {o.word.toUpperCase()}
 </div>
 <p className="serif" style={{ fontSize: 18, lineHeight: 1.4, margin: 0, color: "var(--text)" }}>
 {o.say}
 </p>
 </div>
 ))}
 </div>
);

// =====================================================================
// DAY 4. Curiosity Leads the Way / Learn Fast
// =====================================================================
const Day4 = ({ profile, state, onUpdate }) => {
 const mark = useTaskMark(state, onUpdate);
 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

 <section onMouseEnter={() => mark("ai-use")}>
 <SectionHead
 eyebrow="AI inside People Ops"
 title="What we already trust AI to do"
 sub="None of this replaces judgment. All of it removes the parts of the job that drain it."
 />
 <AIUseGrid />
 </section>

 <section onMouseEnter={() => mark("library")}>
 <SectionHead
 eyebrow="The People Ops prompt library"
 title="Prompts we share, version, and improve"
 sub="Open one. Try it. If it could be better, fork it. That's how the library grows."
 />
 <PromptLibrary />
 </section>

 <section onMouseEnter={() => mark("build")}>
 <SectionHead
 eyebrow="Hands on"
 title="Build your first onboarding workflow"
 sub="Draft a simple Day-1 automation for a future new joiner. Just sketch it. We'll refine in real life."
 />
 <WorkflowBuilder state={state} onUpdate={onUpdate} />
 </section>

 <section onMouseEnter={() => mark("honest")}>
 <SectionHead eyebrow="The honest section" title="What we're still figuring out" />
 <HonestSection />
 </section>
 </div>
 );
};

const AI_USES = [
 { icon: "workflow", title: "Drafting offer letters", note: "Pulls from candidate notes + comp band. You always edit. AI never sends." },
 { icon: "message", title: "Triaging #ask-people", note: "Suggests answers from our internal handbook. Routes the ones it can't answer to a human." },
 { icon: "book", title: "Summarising 1:1 notes", note: "If you record retros with consent, AI gives you a structured summary in 30 seconds." },
 { icon: "users", title: "Drafting interview scorecards", note: "From a JD + transcript. Standardises evaluation. Bias-checked monthly." },
 { icon: "flag", title: "Internal announcements", note: "First draft in our tone. You add the warmth and the specifics." },
 { icon: "sparkle", title: "New-joiner welcome notes", note: "Personalised from their intake form. Your manager adds two sentences. Sent same-day." },
];

const AIUseGrid = () => (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
 {AI_USES.map((u) => (
 <div key={u.title} className="card card-hover" style={{ padding: 20 }}>
 <Icon name={u.icon} size={18} style={{ color: "var(--d4)", marginBottom: 14 }} />
 <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 6 }}>{u.title}</div>
 <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{u.note}</div>
 </div>
 ))}
 </div>
);

const PROMPTS = [
 {
 title: "Summarise a 1:1",
 use: "Turn rough 1:1 notes into a structured follow-up: themes, action items, who owns what.",
 body: `You are a People Ops partner at Fleek. From the rough 1:1 notes below, return:
1. 3 themes
2. Action items with owner + due date
3. One sentence to send the person summarising what I heard.

Tone: warm, specific, no jargon. Notes:
{{notes}}`,
 fork: 12,
 },
 {
 title: "Draft an interview scorecard",
 use: "Generates a structured scorecard from a JD and interview transcript.",
 body: `Given the job description {{jd}} and interview transcript {{transcript}}, produce a scorecard with:
- 4 competencies with evidence
- Hire/no-hire recommendation
- 2 follow-up questions for the next round.
Stay neutral. Quote specific lines as evidence.`,
 fork: 7,
 },
 {
 title: "Welcome a new joiner",
 use: "Personalised welcome note from intake form answers.",
 body: `Write a warm 4-sentence welcome to a new joiner.
Their name: {{name}}
Their role: {{role}}
What excites them: {{excitement}}
Tone: human, specific, no corporate phrases. End by naming their buddy ({{buddy}}).`,
 fork: 21,
 },
 {
 title: "Internal announcement",
 use: "Drafts a #fleek-all announcement in our voice.",
 body: `Draft an internal announcement for #fleek-all.
What happened: {{news}}
Why it matters: {{why}}
Tone: direct, warm, slightly bold. Avoid "thrilled", "excited to announce", "synergy".`,
 fork: 9,
 },
];

const PromptLibrary = () => {
 const [open, setOpen] = useState(0);
 return (
 <div className="card" style={{ overflow: "hidden" }}>
 {PROMPTS.map((p, i) => (
 <div key={p.title} style={{ borderTop: i ? "1px solid var(--border)" : "none" }}>
 <button
 onClick={() => setOpen(open === i ? -1 : i)}
 style={{
 width: "100%", display: "flex", alignItems: "center", gap: 16,
 padding: "18px 22px", background: "transparent", border: "none",
 color: "inherit", textAlign: "left", cursor: "pointer",
 }}
 >
 <Icon name="sparkle" size={14} style={{ color: "var(--d4)" }} />
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 15, fontWeight: 500 }}>{p.title}</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>{p.use}</div>
 </div>
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{p.fork} forks</span>
 <Icon name="chevronDown" size={14} style={{
 color: "var(--text-3)",
 transform: open === i ? "rotate(180deg)" : "none",
 transition: "transform 0.18s",
 }} />
 </button>
 {open === i && (
 <div className="enter" style={{ padding: "0 22px 22px" }}>
 <pre className="mono" style={{
 background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: 10,
 padding: 16, fontSize: 12.5, lineHeight: 1.65, color: "var(--text-1)",
 whiteSpace: "pre-wrap", margin: 0,
 }}>{p.body}</pre>
 <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
 <button className="btn btn-quiet"><Icon name="plus" size={12} />Fork & edit</button>
 <button className="btn btn-quiet"><Icon name="play" size={12} />Run with sample input</button>
 </div>
 </div>
 )}
 </div>
 ))}
 </div>
 );
};

const WORKFLOW_TRIGGERS = [
 "When offer is accepted",
 "7 days before start date",
 "Morning of start date",
 "End of week 1",
];

const WorkflowBuilder = ({ state, onUpdate }) => {
 const wf = state.workflow || { trigger: "Morning of start date", steps: [] };
 const update = (next) => onUpdate({ ...state, workflow: next });

 const addStep = (kind) => {
 update({ ...wf, steps: [...wf.steps, { id: Date.now(), kind, text: "" }] });
 };
 const editStep = (id, text) => {
 update({ ...wf, steps: wf.steps.map((s) => s.id === id ? { ...s, text } : s) });
 };
 const removeStep = (id) => {
 update({ ...wf, steps: wf.steps.filter((s) => s.id !== id) });
 };

 const stepKinds = {
 slack: { icon: "message", label: "Send Slack", placeholder: "e.g. Send #ops a heads up about new joiner" },
 email: { icon: "send", label: "Send email", placeholder: "e.g. Welcome email with Day 1 logistics" },
 ai: { icon: "sparkle", label: "Generate with AI", placeholder: "e.g. Personalised welcome note from intake form" },
 task: { icon: "check", label: "Create task", placeholder: "e.g. Sofia, set up desk by 5pm prior day" },
 };

 return (
 <div className="card" style={{ padding: 24 }}>
 <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 18 }}>
 <span className="eyebrow">When</span>
 <select
 value={wf.trigger}
 onChange={(e) => update({ ...wf, trigger: e.target.value })}
 style={{
 background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
 padding: "12px 14px", color: "var(--text)", fontSize: 15, fontFamily: "inherit",
 outline: "none", appearance: "none", cursor: "pointer",
 }}
 >
 {WORKFLOW_TRIGGERS.map((t) => <option key={t}>{t}</option>)}
 </select>
 </div>

 <div style={{ borderLeft: "2px dashed var(--border)", marginLeft: 12, paddingLeft: 20, paddingTop: 8, paddingBottom: 8 }}>
 {wf.steps.length === 0 && (
 <div style={{ fontSize: 13, color: "var(--text-3)", padding: "12px 0", fontStyle: "italic" }}>
 Add a step below. Just sketch. This is a draft, not a script.
 </div>
 )}
 {wf.steps.map((s, idx) => {
 const k = stepKinds[s.kind];
 return (
 <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12, position: "relative" }}>
 <span style={{
 position: "absolute", left: -29, top: 14,
 width: 16, height: 16, borderRadius: "50%",
 background: "var(--surface-2)", border: "1.5px solid var(--accent-deep)",
 }} />
 <div style={{
 flex: 1, padding: "12px 14px", background: "var(--surface)",
 border: "1px solid var(--border)", borderRadius: 10,
 display: "flex", alignItems: "center", gap: 12,
 }}>
 <Icon name={k.icon} size={14} style={{ color: "var(--d4)" }} />
 <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", minWidth: 90 }}>{k.label.toUpperCase()}</span>
 <input
 value={s.text}
 onChange={(e) => editStep(s.id, e.target.value)}
 placeholder={k.placeholder}
 style={{ flex: 1, fontSize: 14, background: "transparent", color: "var(--text)", border: "none", outline: "none" }}
 />
 <button onClick={() => removeStep(s.id)} style={{ background: "transparent", border: "none", color: "var(--text-3)", cursor: "pointer", padding: 4 }}>
 <Icon name="close" size={14} />
 </button>
 </div>
 </div>
 );
 })}
 </div>

 <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
 {Object.entries(stepKinds).map(([id, k]) => (
 <button key={id} className="chip" onClick={() => addStep(id)} style={{ cursor: "pointer" }}>
 <Icon name="plus" size={11} />
 {k.label}
 </button>
 ))}
 </div>

 {wf.steps.length > 0 && (
 <div style={{
 marginTop: 18, padding: 14,
 background: "var(--surface)", borderRadius: 10,
 fontSize: 13, color: "var(--text-2)", lineHeight: 1.55,
 }}>
 <span className="mono" style={{ fontSize: 11, color: "var(--d4)", display: "block", marginBottom: 4 }}>NICE.</span>
 You just drafted a {wf.steps.length}-step automation. In real life, you'd build this in our internal tool (or just doc it in Notion first). Either is fine. Start with the doc.
 </div>
 )}
 </div>
 );
};

const HonestSection = () => (
 <div className="card" style={{ padding: 28 }}>
 <p className="serif" style={{ fontSize: 22, lineHeight: 1.45, margin: "0 0 22px", color: "var(--text-1)" }}>
 A few things we'd want you to know honestly, before you've earned the right to be told:
 </p>
 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
 {[
 { title: "Cross-region rituals are still rough.", body: "We have three time zones. Our async writing isn't where it needs to be. Karachi and Bengaluru sometimes hear about decisions last. We know. You can help fix this." },
 { title: "Onboarding has been inconsistent.", body: "The last three new joiners had three different Day 1 experiences. This product you're using right now is, in part, our attempt to fix that. It's not done." },
 { title: "Manager training is on the roadmap.", body: "We promoted four ICs into manager roles this year. We haven't given them enough scaffolding. People Ops should be running a manager bootcamp by Q3." },
 { title: "We over-rely on a few people.", body: "Sofia knows everything about the office. If she leaves, we'd lose months. We need this documented. Yes, this is one of your first projects." },
 ].map((h) => (
 <div key={h.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "flex-start" }}>
 <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--d4)", marginTop: 10 }} />
 <div>
 <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{h.title}</div>
 <div style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>{h.body}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
);

// =====================================================================
// DAY 5. Dream Big & Disrupt Yourself / The Future You'll Shape
// =====================================================================
const Day5 = ({ profile, state, onUpdate }) => {
 const mark = useTaskMark(state, onUpdate);
 const firstName = profile.name?.split(" ")[0] || "operator";
 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

 <section onMouseEnter={() => mark("vision")}>
 <SectionHead
 eyebrow="The big picture"
 title="What People Ops looks like at Fleek in 18 months"
 sub="This is the canvas. Some of it is wrong. The parts that are wrong, you'll be the one to fix."
 />
 <VisionGrid />
 </section>

 <section onMouseEnter={() => mark("roadmap")}>
 <SectionHead
 eyebrow={`Your roadmap, ${firstName}`}
 title="Your first 30 days, broken into something actionable"
 />
 <Roadmap firstName={firstName} />
 </section>

 <section onMouseEnter={() => mark("final")}>
 <SectionHead eyebrow="One more thing" title="A message before you close this tab" />
 <FinalMessage profile={profile} />
 </section>
 </div>
 );
};

const VISION = [
 {
 icon: "users",
 title: "Onboarding that's measurably the reason people stay.",
 body: "Every new joiner has the operating context to make their first real contribution inside 30 days. We measure this. We don't guess at it.",
 },
 {
 icon: "workflow",
 title: "An AI layer that handles the repetitive 60%.",
 body: "Drafting, summarising, triaging, scheduling. Automated, with humans focused on the judgment-heavy 40%.",
 },
 {
 icon: "map",
 title: "Cross-region culture that actually feels like one company.",
 body: "Karachi, Bengaluru, London sharing context, decisions, and credit. Async-first written culture. Not three companies in a trench coat.",
 },
 {
 icon: "compass",
 title: "Managers who get scaffolding, not just titles.",
 body: "Every manager has a clear bar, a 1:1 cadence, a feedback rhythm, and the tools to do this without inventing it from scratch.",
 },
];

const VisionGrid = () => (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
 {VISION.map((v) => (
 <div key={v.title} className="card" style={{ padding: 24 }}>
 <Icon name={v.icon} size={20} style={{ color: "var(--d5)", marginBottom: 16 }} />
 <div className="serif" style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 10 }}>{v.title}</div>
 <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>{v.body}</p>
 </div>
 ))}
 </div>
);

const ROADMAP = [
 {
 label: "Week 1",
 intent: "Land. Listen. Don't propose anything yet.",
 items: [
 "Shadow Sofia for a full workspace day",
 "Sit in on two new-joiner Day 1s",
 "1:1 with each of the five teammates on Day 1's list",
 "Read three previous offer letters end-to-end",
 ],
 },
 {
 label: "Week 2",
 intent: "Start drawing the map. Name three things that feel broken.",
 items: [
 "Run your first onboarding session as the lead",
 "Audit the new-joiner experience, find the seams",
 "Draft a one-pager on what you'd improve, share with Ayesha",
 "Take a flight or video call with the Karachi People team",
 ],
 },
 {
 label: "Month 1",
 intent: "Ship one visible improvement. Earn the right to propose the bigger one.",
 items: [
 "Ship one onboarding improvement end-to-end",
 "Document one piece of tribal knowledge that lives in someone's head",
 "Propose your Q2 priorities to Ayesha",
 "First public talk at all-hands, share what you've learned",
 ],
 },
];

const Roadmap = ({ firstName }) => (
 <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
 {ROADMAP.map((r, i) => (
 <div key={r.label} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
 <span className="mono" style={{ fontSize: 11, color: "var(--d5)", letterSpacing: "0.1em" }}>
 {r.label.toUpperCase()}
 </span>
 <span className="serif" style={{ fontSize: 32, color: "var(--text-3)", lineHeight: 1 }}>
 {String(i + 1).padStart(2, "0")}
 </span>
 </div>
 <div className="serif" style={{ fontSize: 19, lineHeight: 1.3, color: "var(--text)" }}>
 {r.intent}
 </div>
 <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
 {r.items.map((it) => (
 <div key={it} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
 <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: "50%", background: "var(--text-3)", flexShrink: 0 }} />
 <span>{it}</span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
);

const FinalMessage = ({ profile }) => {
 const firstName = profile.name?.split(" ")[0] || "you";
 return (
 <div className="card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
 <div style={{
 position: "absolute", inset: 0,
 background: "radial-gradient(600px 300px at 80% 0%, rgba(232,159,122,0.08), transparent 60%)",
 pointerEvents: "none",
 }} />
 <div style={{ position: "relative" }}>
 <Icon name="quote" size={28} style={{ color: "var(--d5)", marginBottom: 18 }} />
 <p className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.25, margin: "0 0 24px", color: "var(--text)", letterSpacing: "-0.01em" }}>
 You're not here to maintain the system.<br/>
 You're here to help redesign it.
 </p>
 <p style={{ fontSize: 16, color: "var(--text-1)", lineHeight: 1.7, margin: "0 0 18px", maxWidth: 680 }}>
 {firstName}, on Monday you told us what excited you about being here.
 You said: <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>
 "{profile.excitement || "..."}"
 </span>
 </p>
 <p style={{ fontSize: 16, color: "var(--text-1)", lineHeight: 1.7, margin: "0 0 30px", maxWidth: 680 }}>
 Keep that exact sentence somewhere. You'll come back to it at six months. At a year.
 The job is to still be able to point at it and say <em style={{ fontFamily: "'Instrument Serif', serif" }}>yes, that</em>.
 </p>
 <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
 <Avatar name="Ayesha Khan" size={36} />
 <div>
 <div style={{ fontSize: 14, fontWeight: 500 }}>Ayesha & the team</div>
 <div style={{ fontSize: 12.5, color: "var(--text-3)" }} className="mono">FRIDAY, 5:47PM</div>
 </div>
 </div>
 </div>
 </div>
 );
};

Object.assign(window, { Day3, Day4, Day5 });
