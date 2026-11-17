import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Wind, Sparkles, BookOpen, Play, Pause, Send, Globe, Heart, Volume2 } from 'lucide-react';

const FALLBACK_SESSIONS = [
  {
    id: 1,
    languageCode: 'en',
    title: 'Morning Grounding & Breath',
    description: 'A gentle 8-minute arrival into stillness with mindful awareness.',
    voiceScript: 'Welcome to Morning Grounding. Close your eyes gently. Take a deep breath in, and let go of all tension.',
    instructorName: 'Aarav Sharma',
    durationSeconds: 480,
    difficultyLevel: 'BEGINNER'
  },
  {
    id: 2,
    languageCode: 'kn',
    title: 'ಶಾಂತ ಮನಸ್ಸು - ಒತ್ತಡ ನಿವಾರಣೆ (Calm Mind)',
    description: 'ದೈನಂದಿನ ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮಾರ್ಗದರ್ಶಿ ಧ್ಯಾನ.',
    voiceScript: 'ನಮಸ್ಕಾರ. ನಿಮ್ಮ ಕಣ್ಣುಗಳನ್ನು ನಿಧಾನವಾಗಿ ಮುಚ್ಚಿ. ದೀರ್ಘವಾಗಿ ಉಸಿರನ್ನು ಒಳಗೆ ತೆಗೆದುಕೊಳ್ಳಿ, ಮತ್ತು ನಿಧಾನವಾಗಿ ಹೊರಗೆ ಬಿಡಿ. ನಿಮ್ಮ ಮನಸ್ಸು ಈಗ ಸಂಪೂರ್ಣ ಶಾಂತವಾಗಿದೆ.',
    instructorName: 'Ananya Rao',
    durationSeconds: 600,
    difficultyLevel: 'BEGINNER'
  },
  {
    id: 3,
    languageCode: 'hi',
    title: 'शांत श्वास और सजगता (Mindful Breath)',
    description: 'वर्तमान क्षण में लौटने के लिए सरल और शांत ध्यान अभ्यास।',
    voiceScript: 'नमस्ते। अपनी आंखें धीरे से बंद करें। गहरी सांस अंदर लें, और धीरे-धीरे बाहर छोड़ें। आपका मन शांत हो रहा है।',
    instructorName: 'Meera Joshi',
    durationSeconds: 720,
    difficultyLevel: 'INTERMEDIATE'
  }
];

const UI_TEXT = {
  en: {
    heroTitle: 'Calm mind, rooted presence — in your language.',
    heroSub: 'Multilingual AI meditation guidance, interactive breathwork, and soothing soundscapes.',
    library: 'Meditation Library',
    breath: 'Breathing Coach (4-4-6)',
    aiTitle: 'AI Wellness Assistant',
    journal: 'Mood Journal',
    placeholder: 'Share how you feel right now...',
    send: 'Ask AI',
    startBreath: 'Start Breathing',
    stopBreath: 'Stop'
  },
  kn: {
    heroTitle: 'ಶಾಂತ ಮನಸ್ಸು, ಸ್ಥಿರ ಚಿತ್ತ — ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ.',
    heroSub: 'ಬಹುಭಾಷಾ AI ಧ್ಯಾನ ಮಾರ್ಗದರ್ಶನ, ಉಸಿರಾಟದ ಅಭ್ಯಾಸ ಮತ್ತು ಶಾಂತಿಯುತ ಅನುಭವ.',
    library: 'ಧ್ಯಾನ ಭಂಡಾರ (Meditation Library)',
    breath: 'ಉಸಿರಾಟದ ಕೋಚ್ (4-4-6)',
    aiTitle: 'AI ವೆಲ್‌ನೆಸ್ ಸಹಾಯಕ',
    journal: 'ಮನಸ್ಥಿತಿ ಡೈರಿ (Mood Journal)',
    placeholder: 'ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ...',
    send: 'ಕಳುಹಿಸಿ',
    startBreath: 'ಉಸಿರಾಟ ಪ್ರಾರಂಭಿಸಿ',
    stopBreath: 'ನಿಲ್ಲಿಸಿ'
  },
  hi: {
    heroTitle: 'शांत मन, स्थिर उपस्थिति — आपकी अपनी भाषा में।',
    heroSub: 'बहुभाषी AI ध्यान मार्गदर्शन, श्वास अभ्यास और सुखद अनुभव।',
    library: 'ध्यान पुस्तकालय (Meditation Library)',
    breath: 'श्वास कोच (4-4-6)',
    aiTitle: 'AI वेलनेस सहायक',
    journal: 'मूड जर्नल',
    placeholder: 'अभी आप कैसा महसूस कर रहे हैं...',
    send: 'भेजें',
    startBreath: 'अभ्यास शुरू करें',
    stopBreath: 'रोकें'
  }
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [sessions, setSessions] = useState(FALLBACK_SESSIONS);
  const [activeSession, setActiveSession] = useState(null);
  const audioCtxRef = useRef(null);

  // Breathing Coach State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Ready');

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ASSISTANT', text: 'Namaste! How is your mind feeling today? Ask me for a guided practice in English, ಕನ್ನಡ, or हिंदी.' }
  ]);
  const [loadingAi, setLoadingAi] = useState(false);

  // Mood Journal State
  const [moodScore, setMoodScore] = useState(4);
  const [moodNote, setMoodNote] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const t = UI_TEXT[lang] || UI_TEXT.en;

  useEffect(() => {
    fetch('/api/v1/public/sessions')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSessions(data);
      })
      .catch(() => {});
  }, []);

  // 432Hz Ambient Soundscape + Multilingual Voice Narration
  const stopAudioAndVoice = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleSessionAudio = (session) => {
    if (activeSession?.id === session.id) {
      stopAudioAndVoice();
      setActiveSession(null);
      return;
    }

    stopAudioAndVoice();
    setActiveSession(session);

    // 1. Start soothing 432Hz harmonic drone via Web Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(216, ctx.currentTime); // 432Hz octave harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(324, ctx.currentTime); // Peaceful fifth interval

      gain.gain.setValueAtTime(0.04, ctx.currentTime); // Soft ambient volume
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      audioCtxRef.current = ctx;
    } catch (e) {
      console.error('AudioContext error:', e);
    }

    // 2. Speak guided meditation script in session's language
    if ('speechSynthesis' in window) {
      const code = session.languageCode || session.language_code || 'en';
      const script =
        session.voiceScript ||
        (code === 'kn'
          ? 'ನಮಸ್ಕಾರ. ದೀರ್ಘವಾಗಿ ಉಸಿರಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಮನಸ್ಸನ್ನು ಶಾಂತಗೊಳಿಸಿ.'
          : code === 'hi'
          ? 'नमस्ते। गहरी सांस लें और अपने मन को शांत करें।'
          : `Welcome to ${session.title}. Close your eyes, breathe deeply, and relax.`);

      const utterance = new SpeechSynthesisUtterance(script);
      utterance.lang = code === 'kn' ? 'kn-IN' : code === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.88; // Calm, slow pace
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => stopAudioAndVoice();
  }, []);

  // 4-4-6 Breathing Timer Logic
  useEffect(() => {
    if (!isBreathing) {
      setBreathPhase('Ready');
      return;
    }
    let step = 0;
    const phases = [
      'Inhale deeply (4s)...',
      'Hold gently (4s)...',
      'Exhale slowly (6s)...'
    ];
    setBreathPhase(phases[0]);

    const interval = setInterval(() => {
      step = (step + 1) % phases.length;
      setBreathPhase(phases[step]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isBreathing]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages((prev) => [...prev, { sender: 'USER', text: userMsg }]);
    setChatInput('');
    setLoadingAi(true);

    try {
      const res = await fetch('/api/v1/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang, mood: String(moodScore) })
      });
      if (!res.ok) throw new Error('Proxy failed');
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ASSISTANT', text: data.reply || data.response || JSON.stringify(data) }]);
    } catch {
      try {
        const directRes = await fetch('http://127.0.0.1:8000/api/ai/guidance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg, language: lang })
        });
        const directData = await directRes.json();
        setMessages((prev) => [...prev, { sender: 'ASSISTANT', text: directData.reply || directData.guidance || 'Take 3 slow breaths.' }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ASSISTANT',
            text:
              lang === 'kn'
                ? 'ದೀರ್ಘವಾಗಿ ಉಸಿರಾಡಿ (4 ಸೆಕೆಂಡ್ ಒಳಗೆ, 6 ಸೆಕೆಂಡ್ ಹೊರಗೆ). ನಿಮ್ಮ ಮನಸ್ಸು ಶಾಂತವಾಗುತ್ತದೆ.'
                : 'Take three slow, deep breaths — inhale for 4 seconds, hold for 4, and exhale for 6 seconds.'
          }
        ]);
      }
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSaveMood = (e) => {
    e.preventDefault();
    if (!moodNote.trim()) return;
    setJournalEntries([
      { id: Date.now(), score: moodScore, note: moodNote, time: new Date().toLocaleTimeString() },
      ...journalEntries
    ]);
    setMoodNote('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F6F4EF', color: '#1F362D', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '700', color: '#2D5A43' }}>
          <Leaf size={26} />
          <span>MindSutra</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} color="#2D5A43" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #C8D3CD', backgroundColor: '#FFFFFF', color: '#1F362D', fontWeight: '500', cursor: 'pointer' }}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </div>
      </header>

      <section style={{ textAlign: 'center', padding: '28px 20px 44px', maxWidth: '780px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '38px', fontFamily: 'Georgia, serif', marginBottom: '12px', color: '#1C3128' }}>{t.heroTitle}</h1>
        <p style={{ fontSize: '16px', color: '#53685E', lineHeight: '1.6' }}>{t.heroSub}</p>
      </section>

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px 60px', display: 'grid', gap: '28px' }}>
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', marginBottom: '18px', color: '#2D5A43' }}>
            <BookOpen size={22} /> {t.library}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {sessions.map((s) => (
              <div key={s.id} style={{ border: '1px solid #E3E8E5', borderRadius: '14px', padding: '18px', backgroundColor: '#FAF9F6' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: '#E3EFE8', color: '#2D5A43' }}>
                  {(s.languageCode || s.language_code || 'EN').toUpperCase()} • {Math.round((s.durationSeconds || s.duration_seconds || 480) / 60)} min
                </span>
                <h3 style={{ fontSize: '17px', margin: '12px 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#5C6F66', marginBottom: '14px' }}>{s.description}</p>
                <button
                  onClick={() => toggleSessionAudio(s)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: activeSession?.id === s.id ? '#B84A39' : '#2D5A43', color: '#FFFFFF', cursor: 'pointer', fontWeight: '500' }}
                >
                  {activeSession?.id === s.id ? <><Pause size={16} /> <Volume2 size={16} /> Stop Audio</> : <><Play size={16} /> Start Session</>}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          <section style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', marginBottom: '14px', color: '#2D5A43' }}>
              <Sparkles size={22} /> {t.aiTitle}
            </h2>
            <div style={{ flex: 1, minHeight: '220px', maxHeight: '280px', overflowY: 'auto', padding: '12px', backgroundColor: '#FAF9F6', borderRadius: '12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'USER' ? 'flex-end' : 'flex-start',
                    backgroundColor: m.sender === 'USER' ? '#2D5A43' : '#E6EFEA',
                    color: m.sender === 'USER' ? '#FFFFFF' : '#1F362D',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    maxWidth: '82%',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {m.text}
                </div>
              ))}
              {loadingAi && <div style={{ fontSize: '13px', color: '#687C73' }}>AI is reflecting...</div>}
            </div>
            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.placeholder}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #C8D3CD', fontSize: '14px' }}
              />
              <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#2D5A43', color: '#FFFFFF', cursor: 'pointer' }}>
                <Send size={16} /> {t.send}
              </button>
            </form>
          </section>

          <div style={{ display: 'grid', gap: '24px' }}>
            <section style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', textAlign: 'center' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '20px', marginBottom: '14px', color: '#2D5A43' }}>
                <Wind size={22} /> {t.breath}
              </h2>
              <div style={{ width: '130px', height: '130px', margin: '14px auto', borderRadius: '50%', backgroundColor: isBreathing ? '#D4E8DD' : '#F0F4F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#2D5A43', padding: '12px', transition: 'all 0.6s ease' }}>
                {breathPhase}
              </div>
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: isBreathing ? '#B84A39' : '#2D5A43', color: '#FFFFFF', cursor: 'pointer', fontWeight: '500' }}
              >
                {isBreathing ? t.stopBreath : t.startBreath}
              </button>
            </section>

            <section style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', marginBottom: '12px', color: '#2D5A43' }}>
                <Heart size={22} /> {t.journal}
              </h2>
              <form onSubmit={handleSaveMood} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
                  <span>Mood (1-5):</span>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setMoodScore(num)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid #2D5A43',
                        backgroundColor: moodScore === num ? '#2D5A43' : '#FFFFFF',
                        color: moodScore === num ? '#FFFFFF' : '#2D5A43',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Write a quick reflection..."
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '10px', border: '1px solid #C8D3CD', fontSize: '14px' }}
                  />
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#2D5A43', color: '#FFFFFF', cursor: 'pointer' }}>
                    Save
                  </button>
                </div>
              </form>
              {journalEntries.length > 0 && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#4A5D54' }}>
                  {journalEntries.slice(0, 2).map((entry) => (
                    <div key={entry.id} style={{ padding: '6px 0', borderTop: '1px solid #EEF2F0' }}>
                      <strong>Mood {entry.score}/5</strong> ({entry.time}): {entry.note}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}