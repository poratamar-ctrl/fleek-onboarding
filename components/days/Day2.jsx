'use client';

import { useState } from 'react';
import { LEADERSHIP } from '../../data';
import { Icon, Avatar, SectionHead, Starburst } from '../ui';
import { useTaskMark } from '../DayContent';

const PHOTO = (n) => `https://i.pravatar.cc/160?img=${n}`;

const SUPPLY_STEPS = [
  { id: 1, title: 'Donation', body: 'A jacket is donated to a charity shop in Manchester. It will be touched by 6+ people across 4 countries before its next wear.', stat: '100B garments / year produced globally' },
  { id: 2, title: 'Sorting', body: "Most charity shops can't sell 70% of donations. The surplus is baled and sold by weight to graders.", stat: '70% never reaches a shop floor' },
  { id: 3, title: 'Export', body: 'Bales travel, often to Pakistan, Kenya, the Philippines. Pricing is opaque. Quality is unknown until the bale is opened.', stat: '$5B annual secondhand export market' },
  { id: 4, title: 'Grading', body: 'Graders manually sort by type and condition. This is where FleekSort comes in. Photo in, grade, price, category out.', stat: '~9s per garment, manual' },
  { id: 5, title: 'Resale', body: 'Sorted garments reach local shops, online marketplaces, or, too often, landfill. Fleek routes them where they have most value.', stat: '60% still end up in landfill' },
];

const CUSTOMERS = [
  {
    name: 'Imran Sheikh',
    role: 'Grader at Karachi facility',
    photo: PHOTO(51),
    quote: "Before Fleek, I'd open a bale and just hope. Now I scan a bag, the app tells me what's likely inside and where it'll sell best. I sort twice as much and I don't go home with my back aching.",
  },
  {
    name: 'Lena Vasquez',
    role: 'Vintage reseller, East London',
    photo: PHOTO(25),
    quote: "I used to buy bales blind. Fleek shows me condition, category, and likely sell-through before I commit. My margins are real now. I hire one more person this winter because of that.",
  },
];

export default function Day2({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section onMouseEnter={() => mark('supply')}>
        <SectionHead
          eyebrow="The broken system"
          title="The journey of one secondhand t-shirt"
          sub="Before you can fix something, you have to see exactly how it breaks. Click through the chain."
        />
        <SupplyChainExplorer />
      </section>

      <section onMouseEnter={() => mark('impact')}>
        <SectionHead eyebrow="The numbers" title="What we measure ourselves against" />
        <ImpactNumbers />
      </section>

      <section onMouseEnter={() => mark('customer')}>
        <SectionHead
          eyebrow="The customer"
          title="Two people Fleek exists for"
          sub="We call them sellers and buyers. They're real, with names, in cities. Talk to them often."
        />
        <CustomerStories />
      </section>

      <section onMouseEnter={() => mark('founders')}>
        <SectionHead eyebrow="The founders" title="Why Abhi and Sanket started this" />
        <FoundersBlock />
      </section>

      <section style={{
        background: 'var(--surface-1)', border: '1px solid var(--border)',
        borderRadius: 18, padding: '40px 32px',
      }}>
        <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent-deep)' }}>Why this work matters</div>
        <p className="serif" style={{ fontSize: 28, lineHeight: 1.3, margin: 0, maxWidth: 720, letterSpacing: '-0.015em' }}>
          Every garment we route correctly is a small refusal to participate in the way fashion currently works.
          Multiply that by the millions and you have a different industry.
        </p>
        <div style={{ marginTop: 22, fontSize: 14, color: 'var(--text-3)' }} className="mono">
          INTERNAL MEMO · JAN 2025
        </div>
      </section>
    </div>
  );
}

function SupplyChainExplorer() {
  const [active, setActive] = useState(1);
  const step = SUPPLY_STEPS.find((s) => s.id === active);
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        {SUPPLY_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 8,
              background: active === s.id ? 'var(--surface-2)' : 'transparent',
              border: active === s.id ? '1px solid var(--border-strong)' : '1px solid transparent',
              color: active === s.id ? 'var(--text)' : 'var(--text-3)',
              cursor: 'pointer', fontSize: 13,
              transition: 'all 0.15s',
              flex: '1 1 0', minWidth: 0,
            }}
          >
            <span className="mono" style={{ fontSize: 10.5, color: active === s.id ? 'var(--accent-deep)' : 'var(--text-3)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</span>
          </button>
        ))}
      </div>

      <div key={active} className="enter" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent-deep)', marginBottom: 12, letterSpacing: '0.1em' }}>
            STEP {String(step.id).padStart(2, '0')} / {step.title.toUpperCase()}
          </div>
          <p className="serif" style={{ fontSize: 26, lineHeight: 1.3, margin: '0 0 18px', color: 'var(--text)' }}>
            {step.body}
          </p>
          <div style={{
            padding: '14px 16px', background: 'var(--surface)', borderLeft: '2px solid var(--accent-deep)',
            fontSize: 14, color: 'var(--text-1)',
          }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>
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
}

function ImpactNumbers() {
  const numbers = [
    { v: '9M+', l: 'items routed away from landfill', sub: 'Since Nov 2021' },
    { v: '3x', l: 'growth year on year', sub: 'Tripling annually' },
    { v: '~$50M', l: 'raised across rounds', sub: 'a16z, YC, Burda, HV' },
    { v: '$350B', l: 'secondhand market by 2027', sub: 'The TAM ahead' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {numbers.map((n) => (
        <div key={n.l} className="card" style={{ padding: 24 }}>
          <div className="serif" style={{ fontSize: 52, lineHeight: 1, marginBottom: 12, color: 'var(--accent-deep)', letterSpacing: '-0.02em' }}>
            {n.v}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 8 }}>{n.l}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{n.sub}</div>
        </div>
      ))}
    </div>
  );
}

function CustomerStories() {
  const [active, setActive] = useState(0);
  const c = CUSTOMERS[active];
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {CUSTOMERS.map((cc, i) => (
          <button
            key={cc.name}
            onClick={() => setActive(i)}
            className="chip"
            style={{
              cursor: 'pointer',
              background: active === i ? 'var(--surface-2)' : 'var(--surface-1)',
              borderColor: active === i ? 'var(--border-strong)' : 'var(--border)',
              color: active === i ? 'var(--text)' : 'var(--text-2)',
            }}
          >
            <Avatar name={cc.name} photo={cc.photo} size={18} />
            {cc.name}
          </button>
        ))}
      </div>
      <div key={active} className="enter" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', minHeight: 220, position: 'relative' }}>
          <img
            src={c.photo.replace('160', '400')}
            alt={c.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 220 }}
          />
        </div>
        <div>
          <Icon name="quote" size={22} style={{ color: 'var(--accent-deep)', marginBottom: 12 }} />
          <p className="serif" style={{ fontSize: 24, lineHeight: 1.35, margin: '0 0 18px', color: 'var(--text)' }}>
            {c.quote}
          </p>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{c.role}</div>
        </div>
      </div>
    </div>
  );
}

function FoundersBlock() {
  return (
    <div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{
          height: 280,
          background: 'linear-gradient(135deg, var(--accent), var(--d2))',
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Starburst size={280} color="var(--on-accent)" />
          </div>
          <button style={{
            position: 'relative',
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--on-accent)', color: 'var(--accent)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <Icon name="play" size={22} />
          </button>
        </div>
        <div style={{ padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 14 }}>The founder hello, recorded for new joiners</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Abhi &amp; Sanket · 6:42</div>
          </div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>UPDATED Q1 2026</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
        {LEADERSHIP.map((p) => (
          <div key={p.name} className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <Avatar name={p.name} photo={p.photo} size={56} />
              <div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{p.role}</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: '0 0 14px' }}>
              {p.bio}
            </p>
            <div style={{ padding: '12px 14px', background: 'var(--surface)', borderLeft: '2px solid var(--accent-deep)', fontSize: 14, color: 'var(--text-1)', lineHeight: 1.5, fontStyle: 'italic', fontFamily: "'Instrument Serif', serif" }}>
              &ldquo;{p.quote}&rdquo;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
