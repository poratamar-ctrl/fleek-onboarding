// Welcome / start screen. Pre-personalised for Tamar, People Ops & Workspace Manager.
const HARDCODED_PROFILE = {
  name: "Tamar",
  role: "People Ops & Workspace Manager",
};

const Welcome = ({ onStart }) => {
  const [excitement, setExcitement] = useState("");
  const [step, setStep] = useState(0); // 0 = greeting, 1 = excitement
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [step]);

  const canAdvance = () => {
    if (step === 0) return true;
    if (step === 1) return excitement.trim().length > 4;
  };

  const next = () => {
    if (!canAdvance()) return;
    if (step < 1) setStep(step + 1);
    else onStart({ ...HARDCODED_PROFILE, excitement: excitement.trim() });
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); next(); }
  };

  return (
    <div className="app">
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative" }}>
        {/* Floating starburst, big, brand presence */}
        <div style={{
          position: "absolute", top: "8%", right: "-6%",
          opacity: 0.35, pointerEvents: "none",
        }}>
          <Starburst size={420} spin />
        </div>
        <div style={{
          position: "absolute", bottom: "-8%", left: "-4%",
          opacity: 0.18, pointerEvents: "none",
        }}>
          <Starburst size={260} color="var(--sage)" spin />
        </div>

        {/* Top-left logo */}
        <div style={{
          position: "absolute", top: 28, left: 32,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <img src="assets/fleek-logo.png" alt="Fleek" style={{ height: 26 }} />
        </div>

        <div style={{
          position: "absolute", top: 36, right: 32,
          fontSize: 12, color: "var(--text-3)",
        }} className="mono">
          ONBOARDING / W1
        </div>

        <div style={{ maxWidth: 640, width: "100%", position: "relative", zIndex: 2 }}>
          <div className="enter">
            <div className="eyebrow" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <Starburst size={14} />
              <span>Your first week at Fleek</span>
            </div>

            <h1 className="display enter enter-1" style={{ margin: "0 0 28px" }}>
              {step === 0 && <>Hello, <span className="hl">Tamar</span>.<br/><em style={{ color: "var(--text-2)" }}>We've been waiting for you.</em></>}
              {step === 1 && <>One thing first.<br/><em style={{ color: "var(--accent-deep)" }}>What excites you most about being here?</em></>}
            </h1>

            <p className="enter enter-2" style={{ color: "var(--text-2)", fontSize: 16, lineHeight: 1.6, margin: "0 0 36px", maxWidth: 540 }}>
              {step === 0 && <>This week is built for the <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>People Ops & Workspace Manager</strong> role. Five days. One company value per day. Each one unlocks the next. Nothing here is busywork. It's the first version of the operating manual you'll help us rewrite.</>}
              {step === 1 && "We'll come back to your answer on Friday. There are no wrong answers here, just yours."}
            </p>

            <div className="enter enter-3">
              {step === 0 && (
                <div style={{
                  padding: "20px 22px",
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <Avatar name="Ayesha Khan" size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 4 }}>
                      <span style={{ color: "var(--text)", fontWeight: 500 }}>Ayesha Khan</span>, Head of People
                    </div>
                    <div style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.5 }}>
                      "Welcome in. I'll see you Monday. Take this week at your own pace."
                    </div>
                  </div>
                </div>
              )}
              {step === 1 && (
                <textarea
                  ref={inputRef}
                  className="field"
                  style={{ fontSize: 17, minHeight: 130, padding: "18px 20px", lineHeight: 1.55 }}
                  placeholder="A sentence is enough."
                  value={excitement}
                  onChange={(e) => setExcitement(e.target.value)}
                  onKeyDown={onKey}
                />
              )}
            </div>

            <div className="enter enter-4" style={{
              marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1].map((i) => (
                  <span key={i} style={{
                    width: 28, height: 3, borderRadius: 99,
                    background: i <= step ? "var(--accent)" : "var(--border)",
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {step > 0 && (
                  <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                    <Icon name="arrowLeft" size={14} />
                    Back
                  </button>
                )}
                <button className="btn btn-primary" disabled={!canAdvance()} onClick={next}>
                  {step === 0 && "Walk me in"}
                  {step === 1 && "Start your first week"}
                  <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

window.Welcome = Welcome;
