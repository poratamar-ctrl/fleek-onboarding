'use client';

import { Icon, SectionHead } from '../ui';
import { useTaskMark } from '../DayContent';

const PRINCIPLES = [
  { icon: 'bolt', title: 'Speed over perfection.', body: 'A 7/10 decision today beats a 9/10 next month. The cost of slowness is invisible. But real.' },
  { icon: 'target', title: 'Solve problems directly.', body: 'If you can fix it, fix it. Don\'t route it through three Slacks. Tell people after, not before.' },
  { icon: 'refresh', title: 'Improve the system, not just the ticket.', body: 'If you fixed it once, write the doc, change the template, or build the script. The same problem twice is a culture problem.' },
  { icon: 'message', title: 'Communicate in writing, loudly.', body: 'Async by default. Public channels over DMs. The note no one reads is still the note that helped someone tomorrow.' },
];

const OPERATORS = [
  { word: 'Ownership', say: 'You don\'t say \'someone should\'. You say \'I\'ll have it by Thursday.\'' },
  { word: 'Velocity', say: 'You measure your week by what shipped, not what\'s in flight.' },
  { word: 'Systems', say: 'After you solve it twice, you build the thing that solves it the third time without you.' },
  { word: 'Async', say: 'You write the doc before the meeting. The meeting becomes a 15-min decision, not a 45-min explanation.' },
  { word: 'Customer', say: 'You can name the person whose week your work just changed.' },
  { word: 'Honesty', say: 'You say \'I don\'t know\' early, not late. You name what you\'re worried about before it lands.' },
];

export default function Day3({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section onMouseEnter={() => mark('principles')}>
        <SectionHead
          eyebrow="The operating principles"
          title="How decisions actually get made here"
          sub="Four rules. Not a manifesto. Each one is something we'd re-explain in a doorway."
        />
        <PrinciplesGrid />
      </section>

      <section onMouseEnter={() => mark('scenario1')}>
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
            { id: 'a', label: 'Email IT and ask when it\'ll be ready. Apologise to the new joiner.', grade: 'low',
              feedback: 'Honest, but it makes the new joiner the buffer. Their first hour at Fleek shouldn\'t include \'I\'m sorry, we\'re not ready for you.\'' },
            { id: 'b', label: 'Grab a loaner from the kit cabinet, get them productive in 20 minutes, and post-mortem with IT after lunch.', grade: 'high',
              feedback: 'This is the move. Speed for the human in front of you, accountability through the post-mortem. Ownership is felt by the new joiner inside an hour.' },
            { id: 'c', label: 'Walk them to coffee, talk through Day 1 content, and quietly pull IT into a Slack DM.', grade: 'mid',
              feedback: 'Warm, and not wrong. But you\'ve delayed the obvious fix. A loaner exists for exactly this. Combine this with option B.' },
            { id: 'd', label: 'Escalate to your manager. They\'ll know what to do.', grade: 'low',
              feedback: 'Your manager hired you so they wouldn\'t have to make this call. The loaner cabinet is two doors down. Make it.' },
          ]}
        />
      </section>

      <section onMouseEnter={() => mark('scenario2')}>
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
            { id: 'a', label: 'Reply in the morning when you\'re sharp.', grade: 'low',
              feedback: 'By morning London time, Karachi is end-of-day and the candidate has either signed something wrong or walked. A two-minute fix tonight saves a day tomorrow.' },
            { id: 'b', label: 'Fix the doc, send the corrected version, and write a one-liner in #people-ops so others see the gotcha.', grade: 'high',
              feedback: 'Fast, written down, learnable. This is how a 140-person company stays coordinated. The note in #people-ops is the part most people skip.' },
            { id: 'c', label: 'Reply, fix the doc, and don\'t tell anyone. It\'s done.', grade: 'mid',
              feedback: 'Half the job. The fix is good. But the system didn\'t learn. So it\'ll happen again to someone else next month.' },
            { id: 'd', label: 'Call your teammate to walk through it together.', grade: 'mid',
              feedback: 'Kind. At 11:47pm, probably overkill. Save calls for ambiguous problems, use written async for crisp ones.' },
          ]}
        />
      </section>

      <section onMouseEnter={() => mark('operators')}>
        <SectionHead eyebrow="The internal language" title="How successful operators think at Fleek" />
        <OperatorsGrid />
      </section>
    </div>
  );
}

function PrinciplesGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
      {PRINCIPLES.map((p) => (
        <div key={p.title} className="card" style={{ padding: 24 }}>
          <Icon name={p.icon} size={22} style={{ color: 'var(--d3)', marginBottom: 16 }} />
          <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 10 }}>{p.title}</div>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{p.body}</p>
        </div>
      ))}
    </div>
  );
}

function Scenario({ scenarioKey, options, state, onUpdate }) {
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
  const gradeColor = { high: 'var(--sage)', mid: 'var(--accent)', low: 'var(--d5)' };

  return (
    <div className="card" style={{ padding: 24 }}>
      {!picked ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '16px 18px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 12,
                textAlign: 'left', color: 'inherit', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
            >
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, minWidth: 18 }}>
                {o.id.toUpperCase()}
              </span>
              <span style={{ fontSize: 15, color: 'var(--text-1)', lineHeight: 1.45 }}>{o.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="enter">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 11,
              background: 'var(--surface-2)', color: gradeColor[pickedOption.grade],
              border: `1px solid ${gradeColor[pickedOption.grade]}`,
            }} className="mono">
              {pickedOption.grade === 'high' ? 'STRONG MOVE' : pickedOption.grade === 'mid' ? 'MIXED' : 'WEAK MOVE'}
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>YOU PICKED {pickedOption.id.toUpperCase()}</span>
          </div>
          <div style={{ padding: 18, background: 'var(--surface)', borderRadius: 12, marginBottom: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--accent)' }}>
              <Icon name="sparkle" size={11} style={{ display: 'inline-block', marginRight: 6 }} />
              Fleek feedback
            </div>
            <p className="serif" style={{ fontSize: 19, lineHeight: 1.45, margin: 0, color: 'var(--text)' }}>
              {pickedOption.feedback}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>
              There isn&apos;t one right answer. There are tells.
            </span>
            <button className="btn btn-quiet" onClick={reset}>
              <Icon name="refresh" size={13} />Try a different answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OperatorsGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
      {OPERATORS.map((o) => (
        <div key={o.word} style={{
          padding: '18px 20px',
          background: 'var(--surface-1)', border: '1px solid var(--border)',
          borderRadius: 12,
        }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--d3)', letterSpacing: '0.1em', marginBottom: 8 }}>
            {o.word.toUpperCase()}
          </div>
          <p className="serif" style={{ fontSize: 18, lineHeight: 1.4, margin: 0, color: 'var(--text)' }}>
            {o.say}
          </p>
        </div>
      ))}
    </div>
  );
}
