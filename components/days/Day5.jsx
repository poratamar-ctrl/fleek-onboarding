'use client';

import { MANAGER } from '../../data';
import { Icon, Avatar, SectionHead } from '../ui';
import { useTaskMark } from '../DayContent';

const VISION = [
  {
    icon: 'users',
    title: "Onboarding that's measurably the reason people stay.",
    body: 'Every new joiner has the operating context to make their first real contribution inside 30 days. We measure this. We don\'t guess at it.',
  },
  {
    icon: 'workflow',
    title: 'An AI layer that handles the repetitive 60%.',
    body: 'Drafting, summarising, triaging, scheduling. Automated, with humans focused on the judgment-heavy 40%.',
  },
  {
    icon: 'map',
    title: 'Cross-region culture that actually feels like one company.',
    body: 'Karachi, Bengaluru, London sharing context, decisions, and credit. Async-first written culture. Not three companies in a trench coat.',
  },
  {
    icon: 'compass',
    title: 'Managers who get scaffolding, not just titles.',
    body: 'Every manager has a clear bar, a 1:1 cadence, a feedback rhythm, and the tools to do this without inventing it from scratch.',
  },
];

const ROADMAP = [
  {
    label: 'Week 1',
    intent: 'Land. Listen. Don\'t propose anything yet.',
    items: [
      'Shadow Sofia for a full workspace day — every vendor, every contract',
      'Sit in on two new-joiner Day 1s with Maya',
      "1:1 with each of the four teammates on Day 1's list",
      'Watch one full payroll cycle in Deel end-to-end',
    ],
  },
  {
    label: 'Week 2',
    intent: 'Start drawing the map. Name three things that feel broken.',
    items: [
      'Own your first new-joiner Day 1 as the lead',
      'Audit the onboarding experience, find the seams',
      'Draft a one-pager on what you\'d improve, share with Alex',
      'Sync with the Karachi and Bengaluru ops leads on what they need from London',
    ],
  },
  {
    label: 'Month 1',
    intent: 'Ship one visible improvement. Earn the right to propose the bigger one.',
    items: [
      'Run your first payroll cycle in Deel, no slip-ups',
      'Ship one onboarding improvement, end-to-end',
      'Build your first Zapier or Make automation that removes a manual step',
      'Plan and execute the next All Hands',
      'Propose your Q2 priorities to Alex',
    ],
  },
];

export default function Day5({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);
  const firstName = profile.name?.split(' ')[0] || 'operator';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section onMouseEnter={() => mark('vision')}>
        <SectionHead
          eyebrow="The big picture"
          title="What People Ops looks like at Fleek in 18 months"
          sub="This is the canvas. Some of it is wrong. The parts that are wrong, you'll be the one to fix."
        />
        <VisionGrid />
      </section>

      <section onMouseEnter={() => mark('roadmap')}>
        <SectionHead
          eyebrow={`Your roadmap, ${firstName}`}
          title="Your first 30 days, broken into something actionable"
        />
        <Roadmap />
      </section>

      <section onMouseEnter={() => mark('final')}>
        <SectionHead eyebrow="One more thing" title="A message before you close this tab" />
        <FinalMessage profile={profile} />
      </section>
    </div>
  );
}

function VisionGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
      {VISION.map((v) => (
        <div key={v.title} className="card" style={{ padding: 24 }}>
          <Icon name={v.icon} size={20} style={{ color: 'var(--d5)', marginBottom: 16 }} />
          <div className="serif" style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 10 }}>{v.title}</div>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{v.body}</p>
        </div>
      ))}
    </div>
  );
}

function Roadmap() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {ROADMAP.map((r, i) => (
        <div key={r.label} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--d5)', letterSpacing: '0.1em' }}>
              {r.label.toUpperCase()}
            </span>
            <span className="serif" style={{ fontSize: 32, color: 'var(--text-3)', lineHeight: 1 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="serif" style={{ fontSize: 19, lineHeight: 1.3, color: 'var(--text)' }}>
            {r.intent}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {r.items.map((it) => (
              <div key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--text-3)', flexShrink: 0 }} />
                <span>{it}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FinalMessage({ profile }) {
  const firstName = profile.name?.split(' ')[0] || 'you';
  return (
    <div className="card" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(600px 300px at 80% 0%, rgba(232,159,122,0.08), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative' }}>
        <Icon name="quote" size={28} style={{ color: 'var(--d5)', marginBottom: 18 }} />
        <p className="serif" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', lineHeight: 1.25, margin: '0 0 24px', color: 'var(--text)', letterSpacing: '-0.01em' }}>
          You&apos;re not here to maintain the system.<br />
          You&apos;re here to help redesign it.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text-1)', lineHeight: 1.7, margin: '0 0 18px', maxWidth: 680 }}>
          {firstName}, on Monday you told us what excited you about being here.
          You said: <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>
            &ldquo;{profile.excitement || '...'}&rdquo;
          </span>
        </p>
        <p style={{ fontSize: 16, color: 'var(--text-1)', lineHeight: 1.7, margin: '0 0 30px', maxWidth: 680 }}>
          Keep that exact sentence somewhere. You&apos;ll come back to it at six months. At a year.
          The job is to still be able to point at it and say <em style={{ fontFamily: "'Instrument Serif', serif" }}>yes, that</em>.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={MANAGER.name} photo={MANAGER.photo} size={36} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Alex &amp; the team</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)' }} className="mono">FRIDAY, 5:47PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
