import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Globe,
  Heart,
  Leaf,
  Pause,
  Play,
  Send,
  Sparkles,
  Volume2,
  Wind,
} from 'lucide-react';
import './App.css';

const UI_TEXT = {
  en: {
    heroTitle: 'Calm mind, rooted presence — in your language.',
    heroSub: '1Hz Delta Wave Binaural Drone, multilingual AI meditation guidance, and interactive breathwork.',
    omNav: 'OM & Delta Drone',
    omTitle: '1Hz Delta Wave & Sacred OM Synth Drone',
    omDesc: 'Designed ambient synth drone with a 1Hz Delta Binaural Beat for deep relaxation and mental stillness.',
    startOm: 'Start Deep Relaxation Drone',
    stopOm: 'Stop Drone',
    breath: 'Breathing Coach (4-4-6)',
    breathNav: 'Breathing Coach',
    aiTitle: 'AI Wellness Assistant',
    journal: 'Mood Journal',
    placeholder: 'Share how you feel right now...',
    send: 'Ask AI',
    startBreath: 'Start Breathing',
    stopBreath: 'Stop',
  },
  kn: {
    heroTitle: 'ಶಾಂತ ಮನಸ್ಸು, ಸ್ಥಿರ ಚಿತ್ತ — ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ.',
    heroSub: '1Hz ಡೆಲ್ಟಾ ವೇವ್ ಬೈನೌರಲ್ ನಾದ, ಬಹುಭಾಷಾ AI ಧ್ಯಾನ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಉಸಿರಾಟದ ಅಭ್ಯಾಸ.',
    omNav: 'ಓಂ & ಡೆಲ್ಟಾ ನಾದ',
    omTitle: '1Hz ಡೆಲ್ಟಾ ವೇವ್ & ಪವಿತ್ರ ಓಂ ಸಿಂಥ್ ಡ್ರೋನ್',
    omDesc: 'ಆಳವಾದ ವಿಶ್ರಾಂತಿ ಮತ್ತು ಮನಸ್ಸಿನ ಶಾಂತಿಗಾಗಿ 1Hz ಡೆಲ್ಟಾ ಬೈನೌರಲ್ ಬೀಟ್ ಹೊಂದಿರುವ ವಿಶೇಷ ಆಂಬಿಯೆಂಟ್ ನಾದವನ್ನು ಆಲಿಸಿ.',
    startOm: 'ವಿಶ್ರಾಂತಿ ನಾದ ಪ್ರಾರಂಭಿಸಿ',
    stopOm: 'ನಿಲ್ಲಿಸಿ',
    breath: 'ಉಸಿರಾಟದ ಕೋಚ್ (4-4-6)',
    breathNav: 'ಉಸಿರಾಟದ ಕೋಚ್',
    aiTitle: 'AI ವೆಲ್‌ನೆಸ್ ಸಹಾಯಕ',
    journal: 'ಮನಸ್ಥಿತಿ ಡೈರಿ (Mood Journal)',
    placeholder: 'ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ...',
    send: 'ಕಳುಹಿಸಿ',
    startBreath: 'ಉಸಿರಾಟ ಪ್ರಾರಂಭಿಸಿ',
    stopBreath: 'ನಿಲ್ಲಿಸಿ',
  },
  hi: {
    heroTitle: 'शांत मन, स्थिर उपस्थिति — आपकी अपनी भाषा में।',
    heroSub: '1Hz डेल्टा वेव बाइनॉरल ड्रोन, बहुभाषी AI ध्यान मार्गदर्शन और श्वास अभ्यास।',
    omNav: 'ॐ & डेल्टा ड्रोन',
    omTitle: '1Hz डेल्टा वेव & पवित्र ॐ सिंथ ड्रोन',
    omDesc: 'गहरे विश्राम और मानसिक शांति के लिए 1Hz डेल्टा बाइनॉरल बीट के साथ विशेष एम्बिएंट ध्वनि का अनुभव करें।',
    startOm: 'रिलैक्सेशन ड्रोन शुरू करें',
    stopOm: 'रोकें',
    breath: 'श्वास कोच (4-4-6)',
    breathNav: 'श्वास कोच',
    aiTitle: 'AI वेलनेस सहायक',
    journal: 'मूड जर्नल',
    placeholder: 'अभी आप कैसा महसूस कर रहे हैं...',
    send: 'भेजें',
    startBreath: 'अभ्यास शुरू करें',
    stopBreath: 'रोकें',
  },
};

const BREATH_STEPS = {
  en: [
    { label: 'Inhale gently', duration: 4000 },
    { label: 'Hold softly', duration: 4000 },
    { label: 'Exhale slowly', duration: 6000 },
  ],
  kn: [
    { label: 'ನಿಧಾನವಾಗಿ ಉಸಿರೆಳೆ', duration: 4000 },
    { label: 'ಮೃದುವಾಗಿ ಹಿಡಿದುಕೊಳ್ಳಿ', duration: 4000 },
    { label: 'ನಿಧಾನವಾಗಿ ಉಸಿರು ಬಿಡಿ', duration: 6000 },
  ],
  hi: [
    { label: 'धीरे से साँस लें', duration: 4000 },
    { label: 'हल्के से रोकें', duration: 4000 },
    { label: 'धीरे से साँस छोड़ें', duration: 6000 },
  ],
};

const BREATH_LABELS = {
  en: 'Ready',
  kn: 'ಸಿದ್ಧ',
  hi: 'तैयार',
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [isOmPlaying, setIsOmPlaying] = useState(false);
  const audioRef = useRef(null);
  const chatEndRef = useRef(null);
  const omRef = useRef(null);
  const aiRef = useRef(null);
  const breathRef = useRef(null);

  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState(-1);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ASSISTANT',
      text: 'Namaste! How is your mind feeling today? Ask me for a guided practice in English, ಕನ್ನಡ, or हिंदी.',
    },
  ]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [moodScore, setMoodScore] = useState(4);
  const [moodNote, setMoodNote] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const t = UI_TEXT[lang] || UI_TEXT.en;
  const breathSteps = BREATH_STEPS[lang] || BREATH_STEPS.en;
  const currentBreathStep = breathSteps[breathPhase];

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleDroneSound = () => {
    if (!audioRef.current) return;
    if (isOmPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsOmPlaying(false);
      return;
    }
    audioRef.current
      .play()
      .then(() => setIsOmPlaying(true))
      .catch((err) => console.error('Audio play error:', err));
  };

  useEffect(() => {
    if (!isBreathing) {
      setBreathPhase(-1);
      return undefined;
    }

    let timeoutId;
    let step = 0;
    const advance = () => {
      setBreathPhase(step);
      timeoutId = window.setTimeout(() => {
        step = (step + 1) % breathSteps.length;
        advance();
      }, breathSteps[step].duration);
    };
    advance();

    return () => window.clearTimeout(timeoutId);
  }, [isBreathing, breathSteps]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, loadingAi]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || loadingAi) return;

    const userMsg = chatInput.trim();
    setMessages((prev) => [...prev, { sender: 'USER', text: userMsg }]);
    setChatInput('');
    setLoadingAi(true);

    try {
      const res = await fetch('/api/v1/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang, mood: String(moodScore) }),
      });
      if (!res.ok) throw new Error('Assistant request failed');
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'ASSISTANT', text: data.reply || data.response || JSON.stringify(data) },
      ]);
    } catch {
      try {
        const directRes = await fetch('http://127.0.0.1:8000/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_message: userMsg, language: lang }),
        });
        if (!directRes.ok) throw new Error('Assistant fallback failed');
        const directData = await directRes.json();
        setMessages((prev) => [
          ...prev,
          { sender: 'ASSISTANT', text: directData.reply || 'Take 3 slow breaths.' },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ASSISTANT',
            text:
              lang === 'kn'
                ? 'ದೀರ್ಘವಾಗಿ ಉಸಿರಾಡಿ (4 ಸೆಕೆಂಡ್ ಒಳಗೆ, 6 ಸೆಕೆಂಡ್ ಹೊರಗೆ). ನಿಮ್ಮ ಮನಸ್ಸು ಶಾಂತವಾಗುತ್ತದೆ.'
                : lang === 'hi'
                  ? 'तीन गहरी, धीमी साँसें लें — 4 सेकंड साँस अंदर, 4 सेकंड रोकें और 6 सेकंड में बाहर छोड़ें।'
                  : 'Take three slow, deep breaths — inhale for 4 seconds, hold for 4, and exhale for 6 seconds.',
          },
        ]);
      }
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSaveMood = (e) => {
    e.preventDefault();
    if (!moodNote.trim()) return;
    setJournalEntries((prev) => [
      {
        id: Date.now(),
        score: moodScore,
        note: moodNote.trim(),
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      },
      ...prev,
    ]);
    setMoodNote('');
  };

  return (
    <div className="app-shell">
      <audio ref={audioRef} src="/delta-drone.mp3" loop preload="auto" />

      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="MindSutra home"
          >
            <span className="brand-mark"><Leaf size={19} strokeWidth={2.2} /></span>
            <span>mind<span className="brand-light">sutra</span></span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            <button type="button" onClick={() => scrollToSection(omRef)}>{t.omNav}</button>
            <button type="button" onClick={() => scrollToSection(aiRef)}>{t.aiTitle}</button>
            <button type="button" onClick={() => scrollToSection(breathRef)}>{t.breathNav}</button>
          </nav>

          <label className="language-picker">
            <Globe size={16} aria-hidden="true" />
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Choose language">
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="hi">हिंदी</option>
            </select>
          </label>
        </div>
      </header>

      <section
        className="hero"
        aria-labelledby="hero-title"
        style={{ backgroundImage: 'url("/buddha-hero.png")' }}
      >
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-kicker"><span className="kicker-line" /> A LITTLE SPACE TO BREATHE</p>
          <h1 id="hero-title">{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroSub}</p>
          <button className="hero-link" type="button" onClick={() => scrollToSection(omRef)}>
            Find your stillness <ArrowDown size={16} />
          </button>
        </div>
        <span className="hero-index" aria-hidden="true">01 <i /> MINDSUTRA</span>
      </section>

      <main className="content-wrap">
        <section ref={omRef} className={`sound-card${isOmPlaying ? ' is-playing' : ''}`} aria-labelledby="sound-title">
          <div className="sound-orbit" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="om-symbol">ॐ</span>
          </div>
          <div className="sound-content">
            <p className="section-kicker light-kicker"><span /> THE SOUND SANCTUARY</p>
            <h2 id="sound-title">{t.omTitle}</h2>
            <p className="sound-description">{t.omDesc}</p>
            <div className="sound-meta" aria-label="Audio features">
              <span>1Hz Delta waves</span><span>Binaural beat</span><span>Ambient drone</span>
            </div>
            <button className={`button button-gold${isOmPlaying ? ' button-stop' : ''}`} type="button" onClick={toggleDroneSound}>
              {isOmPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              {isOmPlaying ? t.stopOm : t.startOm}
              {isOmPlaying && <Volume2 size={16} />}
            </button>
          </div>
          <div className="sound-status" aria-live="polite">
            <span className={`status-dot${isOmPlaying ? ' status-active' : ''}`} />
            {isOmPlaying ? 'NOW PLAYING' : 'A MOMENT OF CALM'}
          </div>
        </section>

        <div className="section-heading">
          <div>
            <p className="section-kicker"><span /> YOUR DAILY RITUAL</p>
            <h2>Small practices, softer days.</h2>
          </div>
          <p className="section-note">A few gentle tools to help you check in with yourself.</p>
        </div>

        <div className="practice-grid">
          <section ref={aiRef} className="panel assistant-panel" aria-labelledby="assistant-title">
            <div className="panel-heading">
              <span className="icon-well icon-lilac"><Sparkles size={19} /></span>
              <div>
                <p className="panel-overline">HERE WITH YOU</p>
                <h3 id="assistant-title">{t.aiTitle}</h3>
              </div>
              <span className="online-indicator" title="Assistant ready" />
            </div>

            <div className="chat-window" role="log" aria-live="polite" aria-label="Conversation">
              {messages.map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`message-row ${message.sender === 'USER' ? 'message-row-user' : ''}`}>
                  {message.sender !== 'USER' && <span className="assistant-avatar"><Sparkles size={13} /></span>}
                  <div className={`chat-bubble ${message.sender === 'USER' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {loadingAi && <div className="typing-indicator"><span /><span /><span /> <span className="typing-copy">A moment of thought…</span></div>}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-form" onSubmit={handleSendChat}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                disabled={loadingAi}
              />
              <button className="send-button" type="submit" aria-label={t.send} disabled={!chatInput.trim() || loadingAi}>
                <Send size={17} />
              </button>
            </form>
            <p className="panel-footnote">A gentle companion for reflection, not a substitute for professional care.</p>
          </section>

          <div className="side-stack">
            <section ref={breathRef} className="panel breath-panel" aria-labelledby="breath-title">
              <div className="panel-heading compact-heading">
                <span className="icon-well icon-sage"><Wind size={19} /></span>
                <div>
                  <p className="panel-overline">RETURN TO YOUR BREATH</p>
                  <h3 id="breath-title">{t.breath}</h3>
                </div>
              </div>
              <div className={`breath-stage${isBreathing ? ' breath-active' : ''} ${currentBreathStep ? `breath-phase-${breathPhase}` : ''}`}>
                <div className="breath-ring breath-ring-outer" />
                <div className="breath-ring breath-ring-inner" />
                <div
                  className="breath-orb"
                  style={{ '--phase-duration': `${currentBreathStep?.duration || 700}ms` }}
                  aria-live="polite"
                >
                  <span className="breath-count">{currentBreathStep ? `${currentBreathStep.duration / 1000}s` : '4 · 4 · 6'}</span>
                  <span className="breath-instruction">{currentBreathStep?.label || BREATH_LABELS[lang]}</span>
                </div>
              </div>
              <div className="breath-bottom">
                <p>Inhale 4 <i /> Hold 4 <i /> Exhale 6</p>
                <button
                  className={`button ${isBreathing ? 'button-outline-stop' : 'button-forest'}`}
                  type="button"
                  onClick={() => setIsBreathing((active) => !active)}
                >
                  {isBreathing ? t.stopBreath : t.startBreath}
                </button>
              </div>
            </section>

            <section className="panel journal-panel" aria-labelledby="journal-title">
              <div className="panel-heading compact-heading">
                <span className="icon-well icon-rose"><Heart size={19} /></span>
                <div>
                  <p className="panel-overline">NOTICE HOW YOU FEEL</p>
                  <h3 id="journal-title">{t.journal}</h3>
                </div>
              </div>
              <form className="journal-form" onSubmit={handleSaveMood}>
                <div className="mood-picker">
                  <span className="form-label">Mood today</span>
                  <div className="mood-options" role="group" aria-label="Select mood from 1 to 5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setMoodScore(num)}
                        className={`mood-choice${moodScore === num ? ' mood-selected' : ''}`}
                        aria-pressed={moodScore === num}
                        aria-label={`Mood ${num} out of 5`}
                      >{num}</button>
                    ))}
                  </div>
                </div>
                <div className="journal-input-row">
                  <input
                    type="text"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Write a quick reflection…"
                    aria-label="Write a quick reflection"
                  />
                  <button className="save-button" type="submit" disabled={!moodNote.trim()}>
                    Save <ArrowUpRight size={15} />
                  </button>
                </div>
              </form>
              {journalEntries.length > 0 ? (
                <div className="journal-entries" aria-live="polite">
                  {journalEntries.slice(0, 2).map((entry) => (
                    <div key={entry.id} className="journal-entry">
                      <span className="entry-score">{entry.score}<small>/5</small></span>
                      <div className="entry-copy"><p>{entry.note}</p><time>{entry.time}</time></div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="journal-prompt">Your reflections will find a home here.</p>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Leaf size={15} /> mindsutra
        </a>
        <span>A quieter moment, whenever you need one.</span>
        <span className="footer-mark">MADE FOR THE MOMENT <i>·</i> INDIA</span>
      </footer>
    </div>
  );
}