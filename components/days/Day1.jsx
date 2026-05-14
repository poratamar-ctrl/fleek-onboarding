'use client';

import { useState } from 'react';
import { TEAMMATES, MANAGER, COFFEE_SPOTS, BUSINESS_FACTS, YOUTUBE_VIDEOS, SWAG } from '../../data';
import { Icon, Avatar, SectionHead, Starburst } from '../ui';
import { useTaskMark } from '../DayContent';

const PHOTO = (n) => `https://i.pravatar.cc/160?img=${n}`;

export default function Day1({ profile, state, onUpdate }) {
  const mark = useTaskMark(state, onUpdate);
  const firstName = profile.name?.split(' ')[0] || 'there';
  const buddy = TEAMMATES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

      {/* Manager note */}
      <section onMouseEnter={() => mark('welcome')}>
        <SectionHead eyebrow="A note from your manager" title={`Welcome in, ${firstName}.`} />
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            <Avatar name={MANAGER.name} photo={MANAGER.photo} size={44} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 14.5 }}>{MANAGER.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)' }} className="mono">
                {MANAGER.role.toUpperCase()} · 9:14AM
              </div>
            </div>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-1)' }}>
            <p style={{ marginTop: 0 }}>
              So glad you said yes. I&apos;ve been looking forward to this Monday for a while now.
            </p>
            <p>
              The honest reason we hired you: you&apos;ve made things real that no one had asked for yet, and you stay steady when things are still half-built. That&apos;s the whole shape of what you&apos;ll do here.
            </p>
            <p>
              You&apos;ll be the person who makes Fleek feel like Fleek every day. The London office, how Deel runs, how new joiners land, the small moments that quietly turn a group of people into a team. Lean on AI like it&apos;s a teammate, because at Fleek, it is.
            </p>
            <p>
              You wrote <span className="hl">&ldquo;{profile.excitement}&rdquo;</span>. I&apos;m holding onto that with you. We&apos;ll come back to it on Friday.
            </p>
            <p style={{ marginBottom: 0, color: 'var(--text-2)', fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>
              See you Monday,<br />Alex
            </p>
          </div>
        </div>
      </section>

      {/* Why we're doing it / business model */}
      <section onMouseEnter={() => mark('why')}>
        <SectionHead
          eyebrow="Why we're doing it"
          title="The business, in 60 seconds"
          sub="Before the people, before the office. The why."
        />
        <WhyWeDoIt />
      </section>

      {/* Gear + swag */}
      <section onMouseEnter={() => mark('waiting')}>
        <SectionHead
          eyebrow="On your desk Monday morning"
          title="What's waiting for you"
          sub="The basics, prepared in advance. The fact that you didn't have to ask is the entire point."
        />
        <GearGrid />
        <div style={{ marginTop: 30 }}>
          <div className="eyebrow" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Starburst size={14} />
            Pick your size · the swag drawer
          </div>
          <SwagGrid state={state} onUpdate={onUpdate} />
        </div>
      </section>

      {/* Office: floor plan + front desk + walkable spots */}
      <section onMouseEnter={() => mark('office')}>
        <SectionHead
          eyebrow="The London HQ"
          title="22 Commercial Street, London E1 6LP"
          sub="Second floor. You'll be running this building soon. Today, just get oriented."
        />
        <OfficeGuide />
      </section>

      {/* Watch + follow */}
      <section onMouseEnter={() => mark('watch')}>
        <SectionHead
          eyebrow="Get the vibe"
          title="Watch a few things before Monday"
          sub="Faster than a deck. The clips below are short. The LinkedIn is for context."
        />
        <WatchAndFollow />
      </section>

      {/* People: buddy + team */}
      <section onMouseEnter={() => mark('people')}>
        <SectionHead
          eyebrow="The people you'll lean on"
          title="Maya first. Then everyone else, in order."
          sub="In a 100-person company the operating manual lives inside people. These five hold the parts you'll need most."
        />
        <BuddyCard buddy={buddy} firstName={firstName} />
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {TEAMMATES.slice(1).map((p) => <PersonCard key={p.name} person={p} />)}
        </div>
      </section>
    </div>
  );
}

function WhyWeDoIt() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '28px 32px',
        background: 'linear-gradient(180deg, rgba(245, 196, 26, 0.10), transparent 60%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p className="serif" style={{ fontSize: 26, lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em', maxWidth: 720 }}>
          Fleek is the AI-native operational backbone of secondhand commerce. A B2B marketplace where the world&apos;s vintage stores, online resellers and retailers source graded inventory directly from wholesalers and rag houses.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {BUSINESS_FACTS.map((f, i) => (
          <div key={f.k} style={{
            padding: '20px 28px',
            borderTop: i >= 2 ? '1px solid var(--border)' : 'none',
            borderLeft: i % 2 === 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div className="eyebrow" style={{ color: 'var(--accent-deep)', marginBottom: 8 }}>{f.k}</div>
            <div style={{ fontSize: 14.5, color: 'var(--text-1)', lineHeight: 1.55 }}>{f.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GearGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {[
        { icon: 'laptop', title: 'MacBook Pro M4', sub: 'Provisioned, encrypted, signed into Slack, Deel and Notion.' },
        { icon: 'book', title: 'Field notebook', sub: "We're old-fashioned about this. Take messy notes in week one." },
        { icon: 'users', title: 'Buddy intro', sub: 'Maya is at her desk. She blocked 11am for your first walk.' },
        { icon: 'workflow', title: 'Deel access', sub: "Day-one access to our HRIS. You're already an admin." },
      ].map((item) => (
        <div key={item.title} className="card card-hover" style={{ padding: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-deep)', marginBottom: 14,
          }}>
            <Icon name={item.icon} size={18} />
          </div>
          <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.sub}</div>
        </div>
      ))}
    </div>
  );
}

function SwagGrid({ state, onUpdate }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const picks = state.swag || {};

  const setSize = (kind, size) => {
    onUpdate({ ...state, swag: { ...picks, [kind]: size } });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
      {SWAG.map((s) => (
        <div key={s.kind} className="card card-hover" style={{ padding: 18, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            height: 120,
            background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
            borderRadius: 10, marginBottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SwagIllustration kind={s.kind} />
          </div>
          <div style={{ fontWeight: 500, fontSize: 14.5 }}>{s.label}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginBottom: 12, lineHeight: 1.4 }}>{s.note}</div>
          {(s.kind === 'tee' || s.kind === 'hoodie') ? (
            <div style={{ display: 'flex', gap: 4, marginTop: 'auto' }}>
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(s.kind, sz)}
                  style={{
                    flex: 1, padding: '6px 0', fontSize: 11.5, fontWeight: 500,
                    background: picks[s.kind] === sz ? 'var(--accent)' : 'var(--surface-1)',
                    color: picks[s.kind] === sz ? 'var(--on-accent)' : 'var(--text-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 6, cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setSize(s.kind, 'claimed')}
              style={{
                marginTop: 'auto', padding: '8px 12px', fontSize: 12.5, fontWeight: 500,
                background: picks[s.kind] ? 'var(--accent)' : 'var(--surface-1)',
                color: picks[s.kind] ? 'var(--on-accent)' : 'var(--text-1)',
                border: '1px solid var(--border)',
                borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              {picks[s.kind] ? <><Icon name="check" size={11} /> Grabbed</> : 'Add to my pack'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function SwagIllustration({ kind }) {
  const fill = 'var(--accent)';
  const stroke = 'var(--accent-deep)';
  const detail = 'var(--text)';

  if (kind === 'tee') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path d="M30 25 L20 35 L25 45 L35 40 L35 80 L65 80 L65 40 L75 45 L80 35 L70 25 L60 22 Q50 28 40 22 Z" fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  if (kind === 'hoodie') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path d="M30 30 L18 38 L24 52 L34 47 L34 82 L66 82 L66 47 L76 52 L82 38 L70 30 L62 24 Q50 38 38 24 Z" fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M40 24 Q50 36 60 24 Q56 30 50 32 Q44 30 40 24 Z" fill="var(--bg)" stroke={stroke} strokeWidth="1" />
    </svg>
  );
  if (kind === 'tote') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path d="M30 28 Q30 18 50 18 Q70 18 70 28" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="22" y="28" width="56" height="58" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  if (kind === 'notebook') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <rect x="28" y="20" width="44" height="60" rx="3" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <line x1="28" y1="30" x2="72" y2="30" stroke={stroke} strokeWidth="1" />
      <circle cx="35" cy="25" r="1.5" fill={detail} />
    </svg>
  );
  if (kind === 'bottle') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <rect x="42" y="14" width="16" height="8" rx="2" fill={stroke} />
      <rect x="38" y="22" width="24" height="64" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  if (kind === 'stickers') return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <circle cx="36" cy="40" r="14" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="64" cy="46" r="12" fill="var(--surface-1)" stroke={stroke} strokeWidth="1.5" />
      <circle cx="50" cy="68" r="13" fill={fill} stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  return null;
}

function OfficeGuide() {
  const [tab, setTab] = useState('floor');
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'floor', label: 'Find your desk', icon: 'map' },
          { id: 'front', label: 'Front desk', icon: 'user' },
          { id: 'coffee', label: 'Coffee & lunch', icon: 'coffee' },
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
        {tab === 'floor' && <FloorPlan />}
        {tab === 'front' && <FrontDesk />}
        {tab === 'coffee' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
            {COFFEE_SPOTS.map((c) => (
              <div key={c.name} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center',
                padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-deep)',
                }}>
                  <Icon name="coffee" size={14} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: 13.5 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.4 }}>{c.note}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{c.dist}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FloorPlan() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'start' }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12, padding: 16,
      }}>
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <rect x="20" y="20" width="760" height="460" fill="var(--bg)" stroke="var(--text)" strokeWidth="2.5" />

          <g stroke="var(--accent-deep)" strokeWidth="1.5" strokeDasharray="6 4">
            <line x1="60" y1="20" x2="240" y2="20" />
            <line x1="280" y1="20" x2="460" y2="20" />
            <line x1="500" y1="20" x2="680" y2="20" />
          </g>

          <rect x="40" y="40" width="170" height="100" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" rx="3" />
          <text x="125" y="78" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-2)">QUIET ROOM 01</text>
          <text x="125" y="98" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-3)">4 PERSON</text>

          <rect x="40" y="155" width="170" height="100" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" rx="3" />
          <text x="125" y="195" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-2)">QUIET ROOM 02</text>
          <text x="125" y="215" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-3)">2 PERSON</text>

          <rect x="240" y="40" width="450" height="220" fill="var(--surface-1)" stroke="var(--border)" strokeWidth="1.5" rx="3" />
          <text x="465" y="80" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-2)">ENGINEERING + PRODUCT</text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={270 + (i % 3) * 130} y={130 + Math.floor(i / 3) * 60} width="100" height="40" fill="var(--surface-2)" stroke="var(--border)" rx="2" />
          ))}

          <rect x="40" y="270" width="240" height="190" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" rx="3" />
          <text x="160" y="320" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-2)">KITCHEN + LOUNGE</text>
          <text x="160" y="338" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-3)">where lunch happens</text>
          <circle cx="100" cy="400" r="22" fill="var(--surface-1)" stroke="var(--border)" />
          <circle cx="160" cy="420" r="22" fill="var(--surface-1)" stroke="var(--border)" />
          <circle cx="220" cy="400" r="22" fill="var(--surface-1)" stroke="var(--border)" />

          <rect x="310" y="290" width="380" height="170" fill="var(--surface-1)" stroke="var(--border)" strokeWidth="1.5" rx="3" />
          <text x="500" y="320" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-2)">OPERATIONS</text>
          <text x="500" y="338" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-3)">PEOPLE OPS · TALENT · OPS</text>

          {[0, 1, 2, 3, 4].map((i) => {
            const x = 340 + i * 70;
            const isYours = i === 2;
            return (
              <g key={i}>
                <rect x={x} y={370} width="55" height="60"
                  fill={isYours ? 'var(--accent)' : 'var(--surface-2)'}
                  stroke={isYours ? 'var(--accent-deep)' : 'var(--border)'}
                  strokeWidth={isYours ? 2 : 1} rx="3" />
                {isYours && (
                  <>
                    <text x={x + 27.5} y={405} textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="var(--on-accent)">TAMAR</text>
                    <text x={x + 27.5} y={420} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--on-accent)">YOU</text>
                  </>
                )}
              </g>
            );
          })}

          <rect x="700" y="220" width="80" height="60" fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
          <text x="740" y="244" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-2)">FRONT</text>
          <text x="740" y="258" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-2)">DESK</text>
          <text x="740" y="272" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-3)">↑ in</text>
        </svg>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--accent-deep)', letterSpacing: '0.1em', marginBottom: 10 }}>
          LEGEND
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <LegendRow color="var(--accent)" label="Your desk" sub="Third from the corner. East-facing window." />
          <LegendRow color="var(--surface-2)" label="Quiet rooms" sub="Bookable in Slack via /room" outline />
          <LegendRow color="var(--surface-2)" label="Kitchen + lounge" sub="Still and sparkling tap, two coffee machines" outline />
          <LegendRow color="var(--surface-1)" label="Engineering" sub="One floor up too. Wear headphones." outline />
          <LegendRow color="var(--bg)" label="Front desk + entrance" sub="The way in. East side of the building." outline />
        </div>
        <div style={{
          marginTop: 22, padding: '14px 16px',
          background: 'var(--surface)', borderLeft: '2px solid var(--accent-deep)',
          borderRadius: 4, fontSize: 13, color: 'var(--text-1)', lineHeight: 1.55,
        }}>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', display: 'block', marginBottom: 4, letterSpacing: '0.08em' }}>
            FYI
          </span>
          You&apos;re in office 4-5 days a week, this is a hands-on role. Wednesday and Thursday are the busiest. The building is yours to shape.
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label, sub, outline }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <span style={{
        width: 16, height: 16, marginTop: 2,
        background: color, flexShrink: 0,
        border: outline ? '1px solid var(--border)' : '1.5px solid var(--accent-deep)',
        borderRadius: 3,
      }} />
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
      </div>
    </div>
  );
}

function FrontDesk() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 22, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Avatar name="Reuben Hart" photo={PHOTO(33)} size={64} />
        <Avatar name="Niamh O'Connor" photo={PHOTO(48)} size={64} />
      </div>
      <div>
        <h3 className="serif" style={{ fontSize: 22, margin: '0 0 6px' }}>
          You&apos;ll meet the nicest front desk team.
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
          Reuben and Niamh run the building entrance. They know every team in here by name, sign for parcels, sort the freight lift, and they will absolutely help you if you forget your fob on day three. Stop and say hi on the way in.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="chip">8am – 7pm</span>
          <span className="chip">Sign in tablet at the desk</span>
          <span className="chip">Fob from Maya</span>
        </div>
      </div>
    </div>
  );
}

function WatchAndFollow() {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6, background: '#FF0000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>
            <Icon name="play" size={14} />
          </span>
          <div>
            <div style={{ fontWeight: 500, fontSize: 14 }}>@officialfleek</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>FLEEK ON YOUTUBE</div>
          </div>
        </div>
        <a
          href="https://www.youtube.com/@officialfleek"
          target="_blank" rel="noopener noreferrer"
          className="btn btn-quiet"
          style={{ textDecoration: 'none' }}
        >
          Open channel
          <Icon name="arrowRight" size={13} />
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 18 }}>
        {YOUTUBE_VIDEOS.map((v) => (
          <a
            key={v.title}
            href="https://www.youtube.com/@officialfleek"
            target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              aspectRatio: '16/9', borderRadius: 8,
              background: 'linear-gradient(135deg, var(--surface-2), var(--bg))',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10, position: 'relative',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="play" size={14} />
              </div>
              <span className="mono" style={{
                position: 'absolute', bottom: 6, right: 6,
                fontSize: 10, padding: '2px 6px',
                background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: 3,
              }}>{v.duration}</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.35 }}>{v.title}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 2, letterSpacing: '0.06em' }}>
              {v.tag.toUpperCase()}
            </div>
          </a>
        ))}
      </div>

      <div style={{ paddingTop: 18, borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <SocialRow
          icon={<span style={{ width: 28, height: 28, borderRadius: 6, background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>in</span>}
          title="Follow on LinkedIn"
          sub="Scroll the last 6 months. Get a feel for how we communicate externally."
          href="https://www.linkedin.com/company/joinfleek/"
        />
        <SocialRow
          icon={<span style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #f58529, #dd2a7b 50%, #515bd4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="grid" size={13} /></span>}
          title="Follow on Instagram"
          sub="Where the product, the team and the customers actually live in public."
          href="https://www.instagram.com/joinfleek/"
        />
      </div>
    </div>
  );
}

function SocialRow({ icon, title, sub, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', background: 'var(--surface)',
      border: '1px solid var(--border)', borderRadius: 10,
      textDecoration: 'none', color: 'inherit',
    }}>
      {icon}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
      </div>
      <Icon name="arrowRight" size={13} style={{ color: 'var(--text-3)' }} />
    </a>
  );
}

function BuddyCard({ buddy, firstName }) {
  return (
    <div className="card" style={{ padding: 28, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24 }}>
      <Avatar name={buddy.name} photo={buddy.photo} size={96} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="chip" style={{ background: 'var(--accent)', color: 'var(--on-accent)', borderColor: 'var(--accent-deep)' }}>
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
        <Avatar name={person.name} photo={person.photo} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 500 }}>{person.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{person.role}</div>
        </div>
        <span className="chip" style={{ fontSize: 10.5, padding: '3px 8px' }}>{person.tag}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14, minHeight: 56 }}>
        &ldquo;{person.ask}&rdquo;
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
