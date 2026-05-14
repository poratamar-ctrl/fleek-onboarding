'use client';

import { useState } from 'react';
import { TEAMMATES, COFFEE_SPOTS } from '../../data';
import { Icon, Avatar, SectionHead } from '../ui';
import { useTaskMark } from '../DayContent';

export default function Day1({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);
  const firstName = profile.name?.split(' ')[0] || 'there';
  const buddy = TEAMMATES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      {/* Welcome */}
      <section onMouseEnter={() => mark('welcome')}>
        <SectionHead eyebrow="A note from your manager" title={`Welcome in, ${firstName}.`} />
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            <Avatar name="Ayesha Khan" size={44} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 14.5 }}>Ayesha Khan</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)' }} className="mono">HEAD OF PEOPLE · 9:14am</div>
            </div>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-1)' }}>
            <p style={{ marginTop: 0 }}>
              We hired you because you&apos;ve built things that didn&apos;t exist before. And you&apos;re calm in the messy middle. That&apos;s exactly the shape of this role.
            </p>
            <p>
              The next five days aren&apos;t a checklist. They&apos;re a slow handoff of the operating manual you&apos;ll help us rewrite. You&apos;ll meet the people, see the mission, learn how we operate, and by Friday you&apos;ll know where to spend your first real swing.
            </p>
            <p>
              About <span style={{ color: 'var(--accent)' }}>&quot;{profile.excitement}&quot;</span>. We&apos;ll come back to this. Hold onto it for now.
            </p>
            <p style={{ marginBottom: 0, color: 'var(--text-2)', fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontSize: 18 }}>
              Ayesha
            </p>
          </div>
        </div>
      </section>

      {/* What's waiting */}
      <section onMouseEnter={() => mark('waiting')}>
        <SectionHead
          eyebrow="On your desk this morning"
          title="What's waiting for you"
          sub="The basics, prepared in advance. The fact that you didn't have to ask is the entire point."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {[
            { icon: 'laptop', title: 'Your MacBook', sub: 'Provisioned, encrypted, signed in. Slack and Notion already loaded.' },
            { icon: 'book', title: 'Field notebook', sub: 'We\'re old-fashioned about this. Take messy notes in week one.' },
            { icon: 'coffee', title: 'Welcome coffee', sub: 'From Allpress. Your buddy ordered it. Flat white, oat.' },
            { icon: 'user', title: 'Buddy intro', sub: 'Maya is at her desk. She blocked 11am for your first walk.' },
          ].map((item) => (
            <div key={item.title} className="card card-hover" style={{ padding: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: 14,
              }}>
                <Icon name={item.icon} size={18} />
              </div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Office guide */}
      <section onMouseEnter={() => mark('office')}>
        <SectionHead
          eyebrow="The London HQ"
          title="The building you'll come to know"
          sub="22 Commercial Street. Spitalfields. You'll know the doorman by Thursday."
        />
        <OfficeGuide />
      </section>

      {/* Buddy */}
      <section onMouseEnter={() => mark('buddy')}>
        <SectionHead eyebrow="Meet your onboarding buddy" title="Maya. She's your first call." />
        <BuddyCard buddy={buddy} firstName={firstName} />
      </section>

      {/* People to talk to */}
      <section onMouseEnter={() => mark('team')}>
        <SectionHead
          eyebrow="People to talk to"
          title="The five conversations to have this week"
          sub="In a 140-person company, the operating manual lives inside people. These are the five who hold the parts you need."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {TEAMMATES.map((p) => <PersonCard key={p.name} person={p} />)}
        </div>
      </section>
    </div>
  );
}

function OfficeGuide() {
  const [tab, setTab] = useState('floor');
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'floor', label: 'The floor', icon: 'map' },
          { id: 'coffee', label: 'Coffee & lunch', icon: 'coffee' },
          { id: 'logistics', label: 'Logistics', icon: 'pin' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '14px 20px', fontSize: 13.5,
              background: 'transparent', border: 'none',
              color: tab === t.id ? 'var(--text)' : 'var(--text-3)',
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontWeight: tab === t.id ? 500 : 400,
            }}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24 }}>
        {tab === 'floor' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div className="placeholder-img" style={{ aspectRatio: '4/3' }}>
              <span>Floor plan · 2F · Spitalfields</span>
            </div>
            <div>
              <div className="serif" style={{ fontSize: 22, marginBottom: 12 }}>
                Three desks from the window. East-facing.
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 0 }}>
                People Ops sits on the second floor, near the breakout kitchen. Engineering is one floor up. Yes, that matters, you&apos;ll bump into them constantly. Quiet rooms are bookable for 1:1s. The roof terrace is open weather-permitting.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                <span className="chip"><Icon name="check" size={11} />Standing desk</span>
                <span className="chip"><Icon name="check" size={11} />Second monitor</span>
                <span className="chip"><Icon name="check" size={11} />Decent chair</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'coffee' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {COFFEE_SPOTS.map((c) => (
              <div key={c.name} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center',
                padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <Icon name="coffee" size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{c.note}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{c.dist}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'logistics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { k: 'Building hours', v: 'Mon-Fri, 7am-10pm. After-hours via Sofia.' },
              { k: 'Anchor days', v: 'Wed + Thu in-office. Rest hybrid by team.' },
              { k: 'Wifi', v: 'fleek-hq · password in the welcome doc' },
              { k: 'Print', v: 'Second floor, behind the kitchen' },
              { k: 'Quiet rooms', v: 'Bookable in Slack via /room' },
              { k: 'Bikes', v: 'Rack in basement. Showers on floor 1.' },
            ].map((row) => (
              <div key={row.k} style={{ padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{row.k}</div>
                <div style={{ fontSize: 14, color: 'var(--text-1)' }}>{row.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BuddyCard({ buddy, firstName }) {
  return (
    <div className="card" style={{ padding: 28, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24 }}>
      <Avatar name={buddy.name} size={96} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="chip" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', borderColor: 'var(--accent-deep)' }}>
            <Icon name="sparkle" size={11} /> Your buddy
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{buddy.tenure.toUpperCase()}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 28, margin: '0 0 4px' }}>{buddy.name}</h3>
        <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 16 }}>{buddy.role} · {buddy.location}</div>
        <p style={{ fontSize: 15, color: 'var(--text-1)', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 540 }}>
          Hey {firstName} 👋 I&apos;m Maya. I joined Fleek seven months ago, so the messy bits of starting here are <em>very</em> fresh in my head. I blocked Tuesday and Thursday afternoons this week. Bring me whatever, especially the questions you feel silly asking.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-quiet" onClick={() => alert('Message sent. Maya will see it in Slack.')}>
            <Icon name="message" size={13} />Slack Maya
          </button>
          <button className="btn btn-quiet" onClick={() => alert('Calendar invite drafted.')}>
            <Icon name="clock" size={13} />Book a walk-and-talk
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonCard({ person }) {
  return (
    <div className="card card-hover" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <Avatar name={person.name} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 500 }}>{person.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{person.role}</div>
        </div>
        <span className="chip" style={{ fontSize: 10.5, padding: '3px 8px' }}>{person.tag}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14, minHeight: 56 }}>
        &quot;{person.ask}&quot;
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{person.tenure.toUpperCase()}</span>
        <button className="chip" style={{ cursor: 'pointer' }}>
          <Icon name="message" size={11} />Message
        </button>
      </div>
    </div>
  );
}
