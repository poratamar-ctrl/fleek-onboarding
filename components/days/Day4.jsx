'use client';

import { useState } from 'react';
import { Icon, SectionHead } from '../ui';
import { useTaskMark } from '../DayContent';

const TOOLKIT = [
  { kind: 'core', name: 'Deel', role: 'HRIS · payroll · contracts · visas', note: 'Your single source of truth. The 25th of each month is non-negotiable.' },
  { kind: 'core', name: 'Slack', role: 'Sync + async', note: 'Public channels over DMs. #ask-operations is judgment-free.' },
  { kind: 'core', name: 'Notion', role: 'Docs · handbook · onboarding plans', note: "If it isn't in Notion, it doesn't exist." },
  { kind: 'core', name: 'Linear', role: 'We run People Ops in sprints', note: "Two-week cycles. You'll set yours in week three." },
  { kind: 'core', name: 'Google Workspace', role: 'Calendar · drive · meet', note: 'Calendars are public by default. Block focus time deliberately.' },
  { kind: 'ai', name: 'ChatGPT', role: 'Default thinking partner', note: 'Paid seats for everyone. Strong on drafting, long-context summarisation, code.' },
  { kind: 'ai', name: 'Claude', role: 'The other default', note: 'Paid seats too. Stronger writing, better with tone, sharper on judgment calls.' },
  { kind: 'ai', name: 'Zapier', role: 'No-code automation', note: 'Most internal automations live here today.' },
  { kind: 'ai', name: 'Make', role: 'When Zapier hits a ceiling', note: 'Heavier flows, branching logic, error handling.' },
  { kind: 'ai', name: 'n8n', role: 'Trialling for self-hosted flows', note: "We're testing whether to consolidate. Pick a workflow and benchmark." },
];

const AI_USES = [
  { icon: 'workflow', title: 'Drafting offer letters in Deel', note: 'Pulls from candidate notes + comp band. You always edit. AI never sends.' },
  { icon: 'message', title: 'Triaging #ask-operations', note: 'Suggests answers from our internal handbook. Routes the ones it can\'t answer to a human.' },
  { icon: 'book', title: 'Summarising 1:1 notes', note: 'If you record retros with consent, AI gives you a structured summary in 30 seconds.' },
  { icon: 'users', title: 'Drafting interview scorecards', note: 'From a JD + transcript. Standardises evaluation. Bias-checked monthly.' },
  { icon: 'flag', title: 'Payroll diff explainer', note: "AI reads Deel's monthly export and flags anomalies in plain English." },
  { icon: 'sparkle', title: 'New-joiner welcome notes', note: 'Personalised from their intake form. Your manager adds two sentences. Sent same-day.' },
  { icon: 'send', title: 'Vendor follow-ups', note: 'Drafts and chases vendor emails. Office contracts, catering, cleaners.' },
  { icon: 'clock', title: 'All Hands agenda first draft', note: 'From updates posted in Slack the week prior. You shape it from there.' },
];

const PROMPTS = [
  {
    title: 'Summarise a 1:1',
    use: 'Turn rough 1:1 notes into a structured follow-up: themes, action items, who owns what.',
    body: `You are a People Ops partner at Fleek. From the rough 1:1 notes below, return:
1. 3 themes
2. Action items with owner + due date
3. One sentence to send the person summarising what I heard.

Tone: warm, specific, no jargon. Notes:
{{notes}}`,
    fork: 12,
  },
  {
    title: 'Draft an interview scorecard',
    use: 'Generates a structured scorecard from a JD and interview transcript.',
    body: `Given the job description {{jd}} and interview transcript {{transcript}}, produce a scorecard with:
- 4 competencies with evidence
- Hire/no-hire recommendation
- 2 follow-up questions for the next round.
Stay neutral. Quote specific lines as evidence.`,
    fork: 7,
  },
  {
    title: 'Welcome a new joiner',
    use: 'Personalised welcome note from intake form answers.',
    body: `Write a warm 4-sentence welcome to a new joiner.
Their name: {{name}}
Their role: {{role}}
What excites them: {{excitement}}
Tone: human, specific, no corporate phrases. End by naming their buddy ({{buddy}}).`,
    fork: 21,
  },
  {
    title: 'Internal announcement',
    use: 'Drafts a #fleek-all announcement in our voice.',
    body: `Draft an internal announcement for #fleek-all.
What happened: {{news}}
Why it matters: {{why}}
Tone: direct, warm, slightly bold. Avoid "thrilled", "excited to announce", "synergy".`,
    fork: 9,
  },
];

export default function Day4({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section onMouseEnter={() => mark('stack')}>
        <SectionHead
          eyebrow="Your toolkit"
          title="The stack you'll run People Ops on"
          sub="Day-one provisioned. You have opinions on which of these actually pay back. We want to hear them."
        />
        <ToolkitGrid />
      </section>

      <section onMouseEnter={() => mark('ai-use')}>
        <SectionHead
          eyebrow="AI inside People Ops"
          title="What we already trust AI to do"
          sub="None of this replaces judgment. All of it removes the parts of the job that drain it."
        />
        <AIUseGrid />
      </section>

      <section onMouseEnter={() => mark('library')}>
        <SectionHead
          eyebrow="The People Ops prompt library"
          title="Prompts we share, version, and improve"
          sub="Open one. Try it. If it could be better, fork it. That's how the library grows."
        />
        <PromptLibrary />
      </section>

      <section onMouseEnter={() => mark('honest')}>
        <SectionHead eyebrow="The honest section" title="What we're still figuring out" />
        <HonestSection />
      </section>
    </div>
  );
}

function ToolkitGrid() {
  return (
    <div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 12 }}>
        HRIS, COLLAB, AND DOCS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {TOOLKIT.filter((t) => t.kind === 'core').map((t) => <ToolCard key={t.name} t={t} />)}
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 12 }}>
        AI + AUTOMATION
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {TOOLKIT.filter((t) => t.kind === 'ai').map((t) => <ToolCard key={t.name} t={t} highlight />)}
      </div>
    </div>
  );
}

function ToolCard({ t, highlight }) {
  return (
    <div className="card card-hover" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{
          width: 28, height: 28, borderRadius: 7,
          background: highlight ? 'var(--accent)' : 'var(--surface-2)',
          color: highlight ? 'var(--on-accent)' : 'var(--text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em',
          border: '1px solid var(--border)',
        }}>
          {t.name[0]}
        </span>
        <div style={{ fontWeight: 500, fontSize: 14.5 }}>{t.name}</div>
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 8, textTransform: 'uppercase' }}>
        {t.role}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{t.note}</div>
    </div>
  );
}

function AIUseGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
      {AI_USES.map((u) => (
        <div key={u.title} className="card card-hover" style={{ padding: 20 }}>
          <Icon name={u.icon} size={18} style={{ color: 'var(--d4)', marginBottom: 14 }} />
          <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 6 }}>{u.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{u.note}</div>
        </div>
      ))}
    </div>
  );
}

function PromptLibrary() {
  const [open, setOpen] = useState(0);
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {PROMPTS.map((p, i) => (
        <div key={p.title} style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 22px', background: 'transparent', border: 'none',
              color: 'inherit', textAlign: 'left', cursor: 'pointer',
            }}
          >
            <Icon name="sparkle" size={14} style={{ color: 'var(--d4)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{p.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{p.use}</div>
            </div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.fork} forks</span>
            <Icon name="chevronDown" size={14} style={{
              color: 'var(--text-3)',
              transform: open === i ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.18s',
            }} />
          </button>
          {open === i && (
            <div className="enter" style={{ padding: '0 22px 22px' }}>
              <pre className="mono" style={{
                background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 10,
                padding: 16, fontSize: 12.5, lineHeight: 1.65, color: 'var(--text-1)',
                whiteSpace: 'pre-wrap', margin: 0,
              }}>{p.body}</pre>
              <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                <button className="btn btn-quiet"><Icon name="plus" size={12} />Fork &amp; edit</button>
                <button className="btn btn-quiet"><Icon name="play" size={12} />Run with sample input</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HonestSection() {
  return (
    <div className="card" style={{ padding: 28 }}>
      <p className="serif" style={{ fontSize: 22, lineHeight: 1.45, margin: '0 0 22px', color: 'var(--text-1)' }}>
        A few things we&apos;d want you to know honestly, before you&apos;ve earned the right to be told:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Cross-region rituals are still rough.', body: "We have three time zones. Our async writing isn't where it needs to be. Karachi and Bengaluru sometimes hear about decisions last. We know. You can help fix this." },
          { title: 'Onboarding has been inconsistent.', body: "The last three new joiners had three different Day 1 experiences. This product you're using right now is, in part, our attempt to fix that. It's not done." },
          { title: 'Manager training is on the roadmap.', body: "We promoted four ICs into manager roles this year. We haven't given them enough scaffolding. People Ops should be running a manager bootcamp by Q3." },
          { title: 'We over-rely on a few people.', body: "Sofia knows everything about the office. If she leaves, we'd lose months. We need this documented. Yes, this is one of your first projects." },
        ].map((h) => (
          <div key={h.title} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--d4)', marginTop: 10 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{h.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>{h.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
