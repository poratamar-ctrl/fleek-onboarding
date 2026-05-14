'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSISTANT_RESPONSES, FALLBACK_RESPONSE, SUGGESTED_PROMPTS } from '../data';
import { Icon } from './ui';

export default function Assistant({ open, onClose, profile, state }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hey ${profile.name?.split(' ')[0] || 'there'}. I'm an AI trained on Fleek's internal docs, onboarding history, and the questions every new joiner asks in their first week. I'm not perfect. For sensitive stuff, talk to Ayesha or Maya. For everything else, ask away.`,
    },
  ]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  const respond = (q) => {
    const match = ASSISTANT_RESPONSES.find((r) => r.match.test(q));
    return match ? match.text : FALLBACK_RESPONSE;
  };

  const send = (textArg) => {
    const text = (textArg ?? draft).trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setDraft('');
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: respond(text) }]);
      setThinking(false);
    }, 700 + Math.random() * 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 90,
              background: 'rgba(10, 9, 8, 0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(480px, 100vw)',
              background: 'var(--bg-1)',
              borderLeft: '1px solid var(--border)',
              zIndex: 100,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 22px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(140deg, var(--accent) 0%, var(--d5) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1a1308',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset',
              }}>
                <Icon name="sparkle" size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Ask someone who&apos;s been here before</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Trained on the operating manual · Always on</div>
              </div>
              <button onClick={onClose} style={{
                background: 'transparent', border: 'none', padding: 6,
                color: 'var(--text-2)', cursor: 'pointer', borderRadius: 6,
              }}>
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} style={{
              flex: 1, overflowY: 'auto', padding: '24px 22px',
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} />
              ))}
              {thinking && (
                <div style={{ display: 'flex', gap: 4, padding: '0 4px' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} className="dot-pulse" style={{ background: 'var(--text-3)', animationDelay: `${delay}s` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Suggested prompts (first turn only) */}
            {messages.length === 1 && (
              <div style={{ padding: '0 22px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="eyebrow" style={{ marginBottom: 4 }}>Try one of these</div>
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', background: 'var(--surface-1)',
                      border: '1px solid var(--border)', borderRadius: 8,
                      color: 'var(--text-1)', textAlign: 'left', fontSize: 13.5,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-1)'}
                  >
                    <Icon name="arrowRight" size={12} style={{ color: 'var(--text-3)' }} />
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <div style={{ padding: '16px 22px 22px', borderTop: '1px solid var(--border)' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 10,
                padding: '10px 12px',
                background: 'var(--surface-1)', border: '1px solid var(--border)',
                borderRadius: 12,
              }}>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  placeholder="Ask anything. I'll be honest if I don't know."
                  rows={1}
                  style={{
                    flex: 1, fontSize: 14, lineHeight: 1.5,
                    minHeight: 24, maxHeight: 120, padding: '4px 0',
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!draft.trim()}
                  style={{
                    background: draft.trim() ? 'var(--accent)' : 'var(--surface-2)',
                    color: draft.trim() ? '#1a1308' : 'var(--text-3)',
                    border: 'none', borderRadius: 8, padding: '8px 10px',
                    cursor: draft.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center',
                    transition: 'background 0.15s',
                  }}
                >
                  <Icon name="send" size={14} />
                </button>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, textAlign: 'center' }}>
                Powered by Fleek&apos;s operating manual · Mock responses in this prototype
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, text }) {
  if (role === 'user') {
    return (
      <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          padding: '12px 14px', borderRadius: 14,
          fontSize: 14, lineHeight: 1.5, color: 'var(--text)',
        }}>
          {text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', maxWidth: '100%' }}>
      <div style={{
        width: 24, height: 24, borderRadius: 8, flexShrink: 0,
        background: 'linear-gradient(140deg, var(--accent) 0%, var(--d5) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1308',
        marginTop: 2,
      }}>
        <Icon name="sparkle" size={11} />
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-1)', flex: 1, paddingTop: 2 }}>
        {text}
      </div>
    </div>
  );
}
