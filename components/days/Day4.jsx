'use client';

import { useState } from 'react';
import { Icon, SectionHead } from '../ui';
import { useTaskMark } from '../DayContent';

const AI_USES = [
  { icon: 'workflow', title: 'Drafting offer letters', note: 'Pulls from candidate notes + comp band. You always edit. AI never sends.' },
  { icon: 'message', title: 'Triaging #ask-people', note: 'Suggests answers from our internal handbook. Routes the ones it can\'t answer to a human.' },
  { icon: 'book', title: 'Summarising 1:1 notes', note: 'If you record retros with consent, AI gives you a structured summary in 30 seconds.' },
  { icon: 'users', title: 'Drafting interview scorecards', note: 'From a JD + transcript. Standardises evaluation. Bias-checked monthly.' },
  { icon: 'flag', title: 'Internal announcements', note: 'First draft in our tone. You add the warmth and the specifics.' },
  { icon: 'sparkle', title: 'New-joiner welcome notes', note: 'Personalised from their intake form. Your manager adds two sentences. Sent same-day.' },
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

const WORKFLOW_TRIGGERS = [
  'When offer is accepted',
  '7 days before start date',
  'Morning of start date',
  'End of week 1',
];

export default function Day4({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
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

      <section onMouseEnter={() => mark('build')}>
        <SectionHead
          eyebrow="Hands on"
          title="Build your first onboarding workflow"
          sub="Draft a simple Day-1 automation for a future new joiner. Just sketch it. We'll refine in real life."
        />
        <WorkflowBuilder state={state} onUpdate={onUpdate} />
      </section>

      <section onMouseEnter={() => mark('honest')}>
        <SectionHead eyebrow="The honest section" title="What we're still figuring out" />
        <HonestSection />
      </section>
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
                <button className="btn btn-quiet"><Icon name="plus" size={12} />Fork & edit</button>
                <button className="btn btn-quiet"><Icon name="play" size={12} />Run with sample input</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WorkflowBuilder({ state, onUpdate }) {
  const wf = state.workflow || { trigger: 'Morning of start date', steps: [] };
  const update = (next) => onUpdate({ ...state, workflow: next });

  const addStep = (kind) => {
    update({ ...wf, steps: [...wf.steps, { id: Date.now(), kind, text: '' }] });
  };
  const editStep = (id, text) => {
    update({ ...wf, steps: wf.steps.map((s) => s.id === id ? { ...s, text } : s) });
  };
  const removeStep = (id) => {
    update({ ...wf, steps: wf.steps.filter((s) => s.id !== id) });
  };

  const stepKinds = {
    slack: { icon: 'message', label: 'Send Slack', placeholder: 'e.g. Send #ops a heads up about new joiner' },
    email: { icon: 'send', label: 'Send email', placeholder: 'e.g. Welcome email with Day 1 logistics' },
    ai: { icon: 'sparkle', label: 'Generate with AI', placeholder: 'e.g. Personalised welcome note from intake form' },
    task: { icon: 'check', label: 'Create task', placeholder: 'e.g. Sofia, set up desk by 5pm prior day' },
  };

  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 18 }}>
        <span className="eyebrow">When</span>
        <select
          value={wf.trigger}
          onChange={(e) => update({ ...wf, trigger: e.target.value })}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
            padding: '12px 14px', color: 'var(--text)', fontSize: 15, fontFamily: 'inherit',
            outline: 'none', appearance: 'none', cursor: 'pointer',
          }}
        >
          {WORKFLOW_TRIGGERS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ borderLeft: '2px dashed var(--border)', marginLeft: 12, paddingLeft: 20, paddingTop: 8, paddingBottom: 8 }}>
        {wf.steps.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--text-3)', padding: '12px 0', fontStyle: 'italic' }}>
            Add a step below. Just sketch. This is a draft, not a script.
          </div>
        )}
        {wf.steps.map((s) => {
          const k = stepKinds[s.kind];
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, position: 'relative' }}>
              <span style={{
                position: 'absolute', left: -29, top: 14,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--surface-2)', border: '1.5px solid var(--accent-deep)',
              }} />
              <div style={{
                flex: 1, padding: '12px 14px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Icon name={k.icon} size={14} style={{ color: 'var(--d4)' }} />
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 90 }}>{k.label.toUpperCase()}</span>
                <input
                  value={s.text}
                  onChange={(e) => editStep(s.id, e.target.value)}
                  placeholder={k.placeholder}
                  style={{ flex: 1, fontSize: 14, background: 'transparent', color: 'var(--text)', border: 'none', outline: 'none' }}
                />
                <button onClick={() => removeStep(s.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 4 }}>
                  <Icon name="close" size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
        {Object.entries(stepKinds).map(([id, k]) => (
          <button key={id} className="chip" onClick={() => addStep(id)} style={{ cursor: 'pointer' }}>
            <Icon name="plus" size={11} />
            {k.label}
          </button>
        ))}
      </div>

      {wf.steps.length > 0 && (
        <div style={{
          marginTop: 18, padding: 14,
          background: 'var(--surface)', borderRadius: 10,
          fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55,
        }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--d4)', display: 'block', marginBottom: 4 }}>NICE.</span>
          You just drafted a {wf.steps.length}-step automation. In real life, you&apos;d build this in our internal tool (or just doc it in Notion first). Either is fine. Start with the doc.
        </div>
      )}
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
          { title: 'Cross-region rituals are still rough.', body: 'We have three time zones. Our async writing isn\'t where it needs to be. Karachi and Bengaluru sometimes hear about decisions last. We know. You can help fix this.' },
          { title: 'Onboarding has been inconsistent.', body: 'The last three new joiners had three different Day 1 experiences. This product you\'re using right now is, in part, our attempt to fix that. It\'s not done.' },
          { title: 'Manager training is on the roadmap.', body: 'We promoted four ICs into manager roles this year. We haven\'t given them enough scaffolding. People Ops should be running a manager bootcamp by Q3.' },
          { title: 'We over-rely on a few people.', body: 'Sofia knows everything about the office. If she leaves, we\'d lose months. We need this documented. Yes, this is one of your first projects.' },
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
