import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  Clock,
  Flame,
  Globe,
  Leaf,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  Wind,
} from 'lucide-react';
import './App.css';

const THIRTY_MINUTES_SECONDS = 30 * 60;

const UI_TEXT = {
  en: {
    heroTitle: 'Calm mind, rooted presence — in your language.',
    heroSub: '1Hz Delta Wave Binaural Drone, Trataka candle-gazing focus, and interactive breathwork.',
    exploreLink: 'Read the meditation guide',
    omNav: 'OM & Delta Drone',
    omTitle: '1Hz Delta Wave & Sacred OM Synth Drone',
    omDesc: 'Designed ambient synth drone with a 1Hz Delta Binaural Beat for a continuous 30-minute deep relaxation session.',
    startOm: 'Start 30-Min Relaxation Drone',
    stopOm: 'Stop Drone',
    candleNav: 'Candle Focus',
    candleOverline: 'TRATAKA · SINGLE-POINTED GAZE',
    candleTitle: 'Sacred Candle Flame Meditation',
    candleDesc: 'Soften your eyes and rest your gaze steadily on the living flame. When thoughts arise, let them dissolve into the warm light.',
    candleLitStatus: 'FLAME LIT · GAZE SOFTLY',
    candleUnlitStatus: 'CANDLE EXTINGUISHED',
    extinguishBtn: 'Extinguish Flame',
    relightBtn: 'Light Candle',
    resetTimerBtn: 'Reset Timer',
    breath: 'Breathing Coach (4-4-6)',
    breathNav: 'Breathing Coach',
    startBreath: 'Start Breathing',
    stopBreath: 'Stop',
    backHome: 'Back to Home',
  },
  kn: {
    heroTitle: 'ಶಾಂತ ಮನಸ್ಸು, ಸ್ಥಿರ ಚಿತ್ತ — ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ.',
    heroSub: '1Hz ಡೆಲ್ಟಾ ವೇವ್ ಬೈನೌರಲ್ ನಾದ, ತ್ರಾಟಕ ದೀಪ ಧ್ಯಾನ ಮತ್ತು ಉಸಿರಾಟದ ಅಭ್ಯಾಸ.',
    exploreLink: 'ಧ್ಯಾನ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಓದಿ',
    omNav: 'ಓಂ & ಡೆಲ್ಟಾ ನಾದ',
    omTitle: '1Hz ಡೆಲ್ಟಾ ವೇವ್ & ಪವಿತ್ರ ಓಂ ಸಿಂಥ್ ಡ್ರೋನ್',
    omDesc: 'ಆಳವಾದ ವಿಶ್ರಾಂತಿ ಮತ್ತು ಮನಸ್ಸಿನ ಶಾಂತಿಗಾಗಿ 30 ನಿಮಿಷಗಳ ನಿರಂತರ 1Hz ಡೆಲ್ಟಾ ಬೈನೌರಲ್ ನಾದವನ್ನು ಆಲಿಸಿ.',
    startOm: '30 ನಿಮಿಷಗಳ ವಿಶ್ರಾಂತಿ ನಾದ ಪ್ರಾರಂಭಿಸಿ',
    stopOm: 'ನಿಲ್ಲಿಸಿ',
    candleNav: 'ದೀಪ ಧ್ಯಾನ',
    candleOverline: 'ತ್ರಾಟಕ · ಏಕಾಗ್ರ ದೃಷ್ಟಿ ಧ್ಯಾನ',
    candleTitle: 'ಉರಿಯುತ್ತಿರುವ ದೀಪದ ಜ್ವಾಲೆ ಧ್ಯಾನ',
    candleDesc: 'ಕಣ್ಣುಗಳನ್ನು ಮೃದುವಾಗಿರಿಸಿ ಉರಿಯುತ್ತಿರುವ ಜ್ವಾಲೆಯ ತುದಿಯ ಮೇಲೆ ನಿಮ್ಮ ಗಮನವನ್ನು ನೆಲೆಗೊಳಿಸಿ. ಆಲೋಚನೆಗಳು ಬಂದಾಗ ಅವುಗಳನ್ನು ಬೆಳಕಿನಲ್ಲಿ ಕರಗಲು ಬಿಡಿ.',
    candleLitStatus: 'ಜ್ವಾಲೆ ಬೆಳಗುತ್ತಿದೆ · ಶಾಂತವಾಗಿ ಗಮನಿಸಿ',
    candleUnlitStatus: 'ದೀಪ ಆರಿದೆ',
    extinguishBtn: 'ದೀಪ ಆರಿಸಿ',
    relightBtn: 'ದೀಪ ಬೆಳಗಿಸಿ',
    resetTimerBtn: 'ಟೈಮರ್ ಮರುಹೊಂದಿಸಿ',
    breath: 'ಉಸಿರಾಟದ ಕೋಚ್ (4-4-6)',
    breathNav: 'ಉಸಿರಾಟದ ಕೋಚ್',
    startBreath: 'ಉಸಿರಾಟ ಪ್ರಾರಂಭಿಸಿ',
    stopBreath: 'ನಿಲ್ಲಿಸಿ',
    backHome: 'ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ',
  },
  hi: {
    heroTitle: 'शांत मन, स्थिर उपस्थिति — आपकी अपनी भाषा में।',
    heroSub: '1Hz डेल्टा वेव बाइनॉरल ड्रोन, त्राटक दीप ध्यान और श्वास अभ्यास।',
    exploreLink: 'ध्यान मार्गदर्शिका पढ़ें',
    omNav: 'ॐ & डेल्टा ड्रोन',
    omTitle: '1Hz डेल्टा वेव & पवित्र ॐ सिंथ ड्रोन',
    omDesc: 'गहरे विश्राम और मानसिक शांति के लिए 30 मिनट के निरंतर 1Hz डेल्टा बाइनॉरल ध्वनि का अनुभव करें।',
    startOm: '30-मिनट रिलैक्सेशन ड्रोन शुरू करें',
    stopOm: 'रोकें',
    candleNav: 'दीप ध्यान',
    candleOverline: 'त्राटक · एकाग्र दृष्टि ध्यान',
    candleTitle: 'जलती हुई मोमबत्ती की लौ पर ध्यान',
    candleDesc: 'अपनी आँखों को कोमल रखें और जलती हुई लौ पर स्थिर दृष्टि टिकाएँ। जब भी विचार आएँ, उन्हें इस शांत प्रकाश में विलीन होने दें।',
    candleLitStatus: 'लौ प्रज्वलित है · कोमलता से देखें',
    candleUnlitStatus: 'दीप बुझा हुआ है',
    extinguishBtn: 'लौ बुझाएँ',
    relightBtn: 'दीप जलाएँ',
    resetTimerBtn: 'टाइमर रीसेट करें',
    breath: 'श्वास कोच (4-4-6)',
    breathNav: 'श्वास कोच',
    startBreath: 'अभ्यास शुरू करें',
    stopBreath: 'रोकें',
    backHome: 'होम पर वापस जाएं',
  },
};

const MEDITATION_CONTENT = {
  en: {
    kicker: 'THE PATH OF INNER STILLNESS',
    leadTitle: 'Silence is not the absence of sound — it is the presence of an unshakeable mind.',
    sections: [
      {
        num: '01',
        title: 'Returning to Your Natural State',
        paragraphs: [
          'Every day, the human mind is pulled in a thousand directions by screens, deadlines, memories of yesterday, and worries about tomorrow. Meditation is the deliberate act of stepping out of that storm and coming home to the quiet center within you.',
          'You do not need to force your thoughts to stop. When you simply observe them like passing clouds without chasing or fighting them, the mind settles on its own — just as muddy water becomes crystal clear when left undisturbed.',
        ],
      },
      {
        num: '02',
        title: 'The Science & Resonance of Sacred Sound',
        paragraphs: [
          'Sound has always been a bridge between a restless mind and deep stillness. Gentle, low-frequency vibrations such as a 1Hz Delta wave drone and the resonant hum of OM slow down scattered brainwaves and signal the nervous system that it is safe to rest.',
          'Instead of wrestling with noisy thoughts, you simply rest your awareness on the steady hum of vibration — letting sound carry your attention effortlessly inward.',
        ],
      },
      {
        num: '03',
        title: 'A Simple Daily Practice (Step by Step)',
        paragraphs: [
          'Find a quiet corner where you can sit upright with a relaxed spine and softened shoulders. Set a gentle timer — even 10 to 30 minutes is enough — so you do not need to watch the clock.',
          'Close your eyes and take three slow, deep breaths: inhale gently, pause softly, and let the exhale be longer than the inhale. Rest your attention on the natural rhythm of your breath, a steady candle flame, or the ambient OM drone. Whenever your mind drifts, smile inwardly and guide it back without judgment.',
        ],
      },
      {
        num: '04',
        title: 'Freedom from Reactivity',
        paragraphs: [
          'Most suffering does not come from what happens to us, but from how instantly and blindly we react to it. Meditation creates a vital space between stimulus and response.',
          'In that space, anger softens into understanding, fear gives way to clarity, and attachment transforms into quiet strength. You begin to meet life with calm awareness rather than emotional turbulence.',
        ],
      },
      {
        num: '05',
        title: 'Consistency Over Perfection',
        paragraphs: [
          'There is no such thing as a “failed” meditation session. A day when your mind feels busy and you gently bring it back fifty times builds far more inner resilience than an effortless session.',
          'Treat meditation as daily hygiene for your consciousness. Show up each morning or night, sit with patience, and trust that every quiet minute plants seeds of clarity that bloom throughout your day.',
        ],
      },
    ],
    closingQuote: '“When the mind grows quiet, the truth of who you are speaks without a single word.”',
  },
  kn: {
    kicker: 'ಆಂತರಿಕ ಮೌನದ ಹಾದಿ',
    leadTitle: 'ಮೌನವೆಂದರೆ ಶಬ್ದವಿಲ್ಲದಿರುವುದಲ್ಲ — ಅದು ಅಲುಗಾಡದ ಸ್ಥಿರ ಮನಸ್ಸಿನ ಉಪಸ್ಥಿತಿ.',
    sections: [
      {
        num: '01',
        title: 'ನಿಮ್ಮ ಸಹಜ ಸ್ಥಿತಿಗೆ ಮರಳುವುದು',
        paragraphs: [
          'ಪ್ರತಿದಿನ ನಮ್ಮ ಮನಸ್ಸು ನೂರಾರು ಆಲೋಚನೆಗಳು, ನಿನ್ನೆಯ ನೆನಪುಗಳು ಮತ್ತು ನಾಳೆಯ ಚಿಂತೆಗಳ ನಡುವೆ ಅಲೆದಾಡುತ್ತಿರುತ್ತದೆ. ಆ ಗೊಂದಲದ ಸುಳಿಯಿಂದ ಹೊರಬಂದು ನಮ್ಮೊಳಗಿನ ಶಾಂತ ಕೇಂದ್ರಕ್ಕೆ ಮರಳುವ ಪ್ರಜ್ಞಾಪೂರ್ವಕ ಅಭ್ಯಾಸವೇ ಧ್ಯಾನ.',
          'ಆಲೋಚನೆಗಳನ್ನು ಬಲವಂತವಾಗಿ ತಡೆಯುವ ಅಗತ್ಯವಿಲ್ಲ. ಕಲಕಿದ ನೀರನ್ನು ಹಾಗೆಯೇ ಬಿಟ್ಟಾಗ ಮಣ್ಣು ತಳ ಸೇರಿ ನೀರು ತಿಳಿಯಾಗುವಂತೆ, ಆಲೋಚನೆಗಳೊಂದಿಗೆ ಹೋರಾಡದೆ ಸಾಕ್ಷಿಯಾಗಿ ಗಮನಿಸಿದಾಗ ಮನಸ್ಸು ತಾನಾಗಿಯೇ ಪ್ರಶಾಂತವಾಗುತ್ತದೆ.',
        ],
      },
      {
        num: '02',
        title: 'ಪವಿತ್ರ ನಾದ ಮತ್ತು ತರಂಗಗಳ ಶಕ್ತಿ',
        paragraphs: [
          'ಚಂಚಲ ಮನಸ್ಸನ್ನು ಆಳವಾದ ಮೌನಕ್ಕೆ ಕರೆದೊಯ್ಯಲು ನಾದವು ಅತ್ಯುತ್ತಮ ಸೇತುವೆಯಾಗಿದೆ. 1Hz ಡೆಲ್ಟಾ ತರಂಗಗಳು ಮತ್ತು ಓಂಕಾರದ ನಿರಂತರ ಕಂಪನವು ಅಶಾಂತ ಮನಸ್ಸಿನ ವೇಗವನ್ನು ತಗ್ಗಿಸಿ, ನರಮಂಡಲಕ್ಕೆ ಆಳವಾದ ವಿಶ್ರಾಂತಿಯ ಸಂದೇಶ ನೀಡುತ್ತದೆ.',
          'ಆಲೋಚನೆಗಳೊಂದಿಗೆ ಗುದ್ದಾಡುವ ಬದಲು, ನಿಮ್ಮ ಗಮನವನ್ನು ಈ ಶಾಂತ ನಾದದ ಮೇಲೆ ನೆಲೆಗೊಳಿಸಿ — ನಾದವೇ ನಿಮ್ಮ ಮನಸ್ಸನ್ನು ಒಳಮುಖವಾಗಿ ಕರೆದೊಯ್ಯುತ್ತದೆ.',
        ],
      },
      {
        num: '03',
        title: 'ದೈನಂದಿನ ಸರಳ ಧ್ಯಾನ ವಿಧಾನ',
        paragraphs: [
          'ನಿಶ್ಯಬ್ದವಾದ ಸ್ಥಳದಲ್ಲಿ ಬೆನ್ನು ನೇರವಾಗಿರಿಸಿ, ಭುಜಗಳನ್ನು ಸಡಿಲಬಿಟ್ಟು ಆರಾಮವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ. ಪದೇ ಪದೇ ಗಡಿಯಾರ ನೋಡುವುದನ್ನು ತಪ್ಪಿಸಲು 10 ರಿಂದ 30 ನಿಮಿಷಗಳ ಟೈಮರ್ ಇಟ್ಟುಕೊಳ್ಳಿ.',
          'ಕಣ್ಣುಗಳನ್ನು ಮುಚ್ಚಿ ಮೂರು ಬಾರಿ ದೀರ್ಘವಾಗಿ ಉಸಿರಾಡಿ. ನಂತರ ನಿಮ್ಮ ಸಹಜ ಉಸಿರಾಟದ ಲಯ, ಉರಿಯುತ್ತಿರುವ ದೀಪದ ಜ್ವಾಲೆ ಅಥವಾ ಓಂ ನಾದದ ಮೇಲೆ ಗಮನವಿಡಿ. ಮನಸ್ಸು ಬೇರೆಡೆ ಹೋದಾಗಲೆಲ್ಲಾ ಬೇಸರಪಡದೆ, ಮೃದುವಾಗಿ ಮತ್ತೆ ಕರೆತನ್ನಿ.',
        ],
      },
      {
        num: '04',
        title: 'ಪ್ರತಿಕ್ರಿಯೆಗಳಿಂದ ಮುಕ್ತಿ',
        paragraphs: [
          'ನಮ್ಮ ಬಹುಪಾಲು ನೋವುಗಳು ಹೊರಗಿನ ಘಟನೆಗಳಿಂದಲ್ಲ, ಬದಲಾಗಿ ಅವುಗಳಿಗೆ ನಾವು ತಕ್ಷಣವೇ ನೀಡುವ ಆತುರದ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಂದ ಉಂಟಾಗುತ್ತವೆ. ಧ್ಯಾನವು ಘಟನೆ ಮತ್ತು ನಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯ ನಡುವೆ ಒಂದು ಶಾಂತ ವಿರಾಮವನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ.',
          'ಆ ವಿರಾಮದಲ್ಲಿ ಕೋಪವು ತಾಳ್ಮೆಯಾಗಿ, ಭಯವು ಸ್ಪಷ್ಟತೆಯಾಗಿ ಬದಲಾಗುತ್ತದೆ. ಜೀವನದ ಏರಿಳಿತಗಳನ್ನು ಭಾವನಾತ್ಮಕ ಒತ್ತಡವಿಲ್ಲದೆ ಎದುರಿಸುವ ಶಕ್ತಿ ನಿಮ್ಮದಾಗುತ್ತದೆ.',
        ],
      },
      {
        num: '05',
        title: 'ಪರಿಪೂರ್ಣತೆಗಿಂತ ನಿರಂತರತೆ ಮುಖ್ಯ',
        paragraphs: [
          'ಧ್ಯಾನದಲ್ಲಿ “ವಿಫಲವಾದ ಅಭ್ಯಾಸ” ಎಂಬುದಿಲ್ಲ. ಮನಸ್ಸು ತುಂಬಾ ಚಂಚಲವಾಗಿದ್ದ ದಿನ ನೀವು ಐವತ್ತು ಬಾರಿ ಅದನ್ನು ವಾಪಸ್ ಕರೆತಂದರೆ, ಅದು ನಿಮ್ಮ ಮನಸ್ಸಿನ ಶಕ್ತಿಯನ್ನು ಇನ್ನಷ್ಟು ಗಟ್ಟಿಗೊಳಿಸುತ್ತದೆ.',
          'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ಅಥವಾ ರಾತ್ರಿ ಕೆಲವು ನಿಮಿಷಗಳನ್ನು ನಿಮ್ಮ ಅಂತರಾಳಕ್ಕಾಗಿ ಮೀಸಲಿಡಿ. ಈ ನಿರಂತರ ಅಭ್ಯಾಸವು ದಿನವಿಡೀ ನಿಮ್ಮ ಮಾತು, ಕೆಲಸ ಮತ್ತು ನಿರ್ಧಾರಗಳಲ್ಲಿ ಶಾಂತಿ ಹಾಗೂ ಸ್ಪಷ್ಟತೆಯನ್ನು ತುಂಬುತ್ತದೆ.',
        ],
      },
    ],
    closingQuote: '“ಮನಸ್ಸು ಸಂಪೂರ್ಣವಾಗಿ ಶಾಂತವಾದಾಗ, ನಿಮ್ಮ ನಿಜವಾದ ಅಸ್ತಿತ್ವವು ಒಂದೇ ಒಂದು ಶಬ್ದವಿಲ್ಲದೆ ಮಾತನಾಡುತ್ತದೆ.”',
  },
  hi: {
    kicker: 'आंतरिक मौन का मार्ग',
    leadTitle: 'मौन का अर्थ ध्वनि का अभाव नहीं — बल्कि एक अडिग और शांत मन की उपस्थिति है।',
    sections: [
      {
        num: '01',
        title: 'अपने स्वाभाविक केंद्र में लौटना',
        paragraphs: [
          'हर दिन हमारा मन कल की यादों, आने वाले कल की चिंताओं और बाहरी शोर में उलझा रहता है। इस मानसिक तूफ़ान से बाहर निकलकर अपने भीतर के शांत केंद्र में लौटने का सचेत अभ्यास ही ध्यान है।',
          'आपको विचारों को ज़बरदस्ती रोकने की आवश्यकता नहीं है। जैसे गंदे पानी को शांत छोड़ देने पर मिट्टी नीचे बैठ जाती है और पानी निर्मल हो जाता है, वैसे ही विचारों से लड़े बिना उन्हें केवल देखने से मन स्वतः शांत हो जाता है।',
        ],
      },
      {
        num: '02',
        title: 'पवित्र नाद और तरंगों का विज्ञान',
        paragraphs: [
          'चंचल मन को गहरे मौन से जोड़ने के लिए ध्वनि एक सशक्त सेतु है। 1Hz डेल्टा वेव और ॐ की निरंतर गूँज बिखरी हुई मानसिक तरंगों को धीमा करती है और तंत्रिका तंत्र को गहरे विश्राम का संकेत देती है।',
          'विचारों से संघर्ष करने के बजाय अपना ध्यान इस स्थिर नाद पर टिका दें — ध्वनि स्वयं आपको भीतर की शांति तक ले जाएगी।',
        ],
      },
      {
        num: '03',
        title: 'सरल दैनिक अभ्यास (कदम दर कदम)',
        paragraphs: [
          'किसी शांत स्थान पर रीढ़ की हड्डी को सीधा और कंधों को ढीला रखकर बैठें। बार-बार समय देखने से बचने के लिए 10 से 30 मिनट का टाइमर लगा लें।',
          'आँखें बंद करें और तीन धीमी, गहरी साँसें लें। अब अपना ध्यान साँसों की स्वाभाविक गति, जलती हुई लौ या ॐ नाद पर रखें। जब भी मन भटके, बिना किसी खीझ के प्रेमपूर्वक उसे वापस ले आएँ।',
        ],
      },
      {
        num: '04',
        title: 'प्रतिक्रियाओं से स्वतंत्रता',
        paragraphs: [
          'हमारा अधिकांश तनाव बाहरी घटनाओं से नहीं, बल्कि उन पर हमारी तुरंत और अनियंत्रित प्रतिक्रियाओं से जन्म लेता है। ध्यान परिस्थिति और आपकी प्रतिक्रिया के बीच एक शांत ठहराव बनाता है।',
          'उस ठहराव में क्रोध समझ में बदल जाता है और भय स्पष्टता में। आप जीवन की चुनौतियों का सामना घबराहट के बजाय स्थिर विवेक से करने लगते हैं।',
        ],
      },
      {
        num: '05',
        title: 'पूर्णता से अधिक निरंतरता महत्वपूर्ण है',
        paragraphs: [
          'ध्यान का कोई भी सत्र कभी व्यर्थ नहीं जाता। जिस दिन मन अधिक अशांत हो और आप उसे पचास बार वापस केंद्र पर लाएँ, वह दिन आपके आत्म-नियंत्रण को और भी मज़बूत बनाता है।',
          'प्रतिदिन कुछ शांत क्षण स्वयं को दें — यही नियमित अभ्यास आपके पूरे दिन में स्पष्टता, धैर्य और संतुलन भर देगा।',
        ],
      },
    ],
    closingQuote: '“जब मन पूरी तरह शांत हो जाता है, तब आपका वास्तविक स्वरूप बिना किसी शब्द के प्रकट होता है।”',
  },
};

const BUDDHA_STATEMENTS = {
  en: {
    kicker: 'WORDS OF AWAKENING · GAUTAMA BUDDHA',
    title: 'Truths that shake the sleeping mind awake.',
    subtitle: 'Read slowly. Let each truth sink beyond words into your own life.',
    quotes: [
      {
        num: 'I',
        statement: '“You yourself, as much as anybody in the entire universe, deserve your love and affection — and no one else can walk your path for you.”',
        realization: 'Stop waiting for someone to rescue your mind. Your liberation begins the exact second you take complete responsibility for your own inner state.',
      },
      {
        num: 'II',
        statement: '“The trouble is, you think you have time.”',
        realization: 'Every breath you take is a countdown. Postponing inner peace for “someday” is the greatest illusion of human life — awaken right now.',
      },
      {
        num: 'III',
        statement: '“You will not be punished for your anger; you will be punished by your anger.”',
        realization: 'Holding onto hatred is like grasping a burning coal with the intent of throwing it at someone else — you are the one who gets burned.',
      },
      {
        num: 'IV',
        statement: '“Pain is inevitable. Suffering is optional.”',
        realization: 'Life will bring loss, change, and storms. Pain happens to the body, but suffering is created only when your mind refuses to accept reality as it is.',
      },
      {
        num: 'V',
        statement: '“In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.”',
        realization: 'Nothing you cling to is permanent. True strength is not in holding on tightly, but in having the courage to release with peace.',
      },
      {
        num: 'VI',
        statement: '“Conquer yourself, and you have conquered the entire world.”',
        realization: 'A person who masters their own restless mind is far greater than a warrior who conquers a thousand armies on the battlefield.',
      },
    ],
  },
  kn: {
    kicker: 'ಜಾಗೃತಿಯ ವಚನಗಳು · ಗೌತಮ ಬುದ್ಧ',
    title: 'ನಿದ್ರಿಸುತ್ತಿರುವ ಮನಸ್ಸನ್ನು ಬಡಿದೆಬ್ಬಿಸುವ ಸತ್ಯಗಳು.',
    subtitle: 'ನಿಧಾನವಾಗಿ ಓದಿ. ಪ್ರತಿಯೊಂದು ವಾಕ್ಯವೂ ನಿಮ್ಮ ಜೀವನದ ಆಳಕ್ಕೆ ಇಳಿಯಲಿ.',
    quotes: [
      {
        num: 'I',
        statement: '“ನಿಮ್ಮ ಬಳಿ ಇನ್ನೂ ಬಹಳ ಸಮಯವಿದೆ ಎಂದು ನೀವು ಭಾವಿಸಿರುವುದೇ ನಿಮ್ಮ ದೊಡ್ಡ ಭ್ರಮೆ.”',
        realization: 'ನಾವು ತೆಗೆದುಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಉಸಿರೂ ಜೀವನದ ಕ್ಷಣಗಳನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತಿದೆ. ಮನಸ್ಸಿನ ಶಾಂತಿಯನ್ನು “ನಾಳೆ”ಗೆ ಮುಂದೂಡಬೇಡಿ — ಈ ಕ್ಷಣವೇ ಎಚ್ಚರಗೊಳ್ಳಿ.',
      },
      {
        num: 'II',
        statement: '“ನಿಮ್ಮ ಕೋಪಕ್ಕಾಗಿ ನಿಮಗೆ ಶಿಕ್ಷೆಯಾಗುವುದಿಲ್ಲ; ನಿಮ್ಮ ಕೋಪವೇ ನಿಮಗೆ ಶಿಕ್ಷೆಯಾಗುತ್ತದೆ.”',
        realization: 'ದ್ವೇಷವನ್ನು ಮನಸ್ಸಿನಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳುವುದು ಬೇರೆಯವರ ಮೇಲೆ ಎಸೆಯಲು ಕೆಂಡವನ್ನು ಕೈಯಲ್ಲಿ ಹಿಡಿದಂತೆ — ಮೊದಲು ಸುಟ್ಟುಹೋಗುವುದು ನಿಮ್ಮ ಕೈಯೇ.',
      },
      {
        num: 'III',
        statement: '“ನೋವು ಅನಿವಾರ್ಯ, ಆದರೆ ದುಃಖವು ನಮ್ಮ ಆಯ್ಕೆ.”',
        realization: 'ಜೀವನದಲ್ಲಿ ಬದಲಾವಣೆ ಮತ್ತು ನಷ್ಟಗಳು ಸಹಜ. ನೋವು ದೇಹಕ್ಕೆ ಆಗುತ್ತದೆ, ಆದರೆ ವಾಸ್ತವವನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಲು ಮನಸ್ಸು ನಿರಾಕರಿಸಿದಾಗ ಮಾತ್ರ ಅದು ದುಃಖವಾಗಿ ಬದಲಾಗುತ್ತದೆ.',
      },
      {
        num: 'IV',
        statement: '“ಯುದ್ಧಭೂಮಿಯಲ್ಲಿ ಸಾವಿರ ಜನರನ್ನು ಗೆಲ್ಲುವವನಿಗಿಂತ, ತನ್ನ ಮನಸ್ಸನ್ನೇ ಗೆದ್ದವನು ನಿಜವಾದ ಮಹಾವೀರ.”',
        realization: 'ಹೊರಗಿನ ಪ್ರಪಂಚವನ್ನು ಗೆಲ್ಲಲು ಹೊರಡುವ ಮೊದಲು ನಿಮ್ಮೊಳಗಿನ ಆಸೆ, ಭಯ ಮತ್ತು ಅಶಾಂತಿಯನ್ನು ಗೆಲ್ಲಿ — ಆಗ ಇಡೀ ಜಗತ್ತೇ ನಿಮ್ಮದಾಗುತ್ತದೆ.',
      },
      {
        num: 'V',
        statement: '“ಕೊನೆಯಲ್ಲಿ ಉಳಿಯುವುದು ಮೂರೇ ಸಂಗತಿಗಳು: ನೀವು ಎಷ್ಟು ಪ್ರೀತಿಸಿದಿರಿ, ಎಷ್ಟು ಸೌಮ್ಯವಾಗಿ ಬದುಕಿದಿರಿ, ಮತ್ತು ನಿಮಗೆ ಸೇರದಿದ್ದನ್ನು ಎಷ್ಟು ಶಾಂತವಾಗಿ ಬಿಟ್ಟುಕೊಟ್ಟಿರಿ.”',
        realization: 'ಈ ಜಗತ್ತಿನಲ್ಲಿ ಯಾವುದೂ ಶಾಶ್ವತವಲ್ಲ. ಗಟ್ಟಿಯಾಗಿ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದಕ್ಕಿಂತ, ಪ್ರೀತಿಯಿಂದ ಬಿಟ್ಟುಕೊಡುವುದರಲ್ಲಿಯೇ ನಿಜವಾದ ಶಕ್ತಿ ಇದೆ.',
      },
      {
        num: 'VI',
        statement: '“ನಿಮ್ಮ ದಾರಿಯನ್ನು ನೀವೇ ನಡೆಯಬೇಕು; ಬುದ್ಧರು ಕೇವಲ ದಾರಿ ತೋರಿಸಬಲ್ಲರು.”',
        realization: 'ನಿಮ್ಮ ಜೀವನವನ್ನು ಬದಲಾಯಿಸಲು ಯಾರೋ ಬರುತ್ತಾರೆ ಎಂದು ಕಾಯಬೇಡಿ. ನಿಮ್ಮ ದೀಪ ನೀವೇ ಆಗಿ.',
      },
    ],
  },
  hi: {
    kicker: 'जागरण के वचन · गौतम बुद्ध',
    title: 'सोए हुए मन को झकझोर कर जगाने वाले सत्य।',
    subtitle: 'धीरे-धीरे पढ़ें। हर शब्द को अपने जीवन के भीतर उतरने दें।',
    quotes: [
      {
        num: 'I',
        statement: '“सबसे बड़ी समस्या यह है कि आपको लगता है आपके पास बहुत समय है।”',
        realization: 'आपकी हर एक साँस जीवन की गिनती कम कर रही है। आंतरिक शांति को “कल” पर टालना सबसे बड़ा भ्रम है — इसी क्षण जागें।',
      },
      {
        num: 'II',
        statement: '“तुम्हें अपने क्रोध के लिए दंड नहीं मिलेगा, बल्कि तुम्हारा क्रोध ही तुम्हें दंड देगा।”',
        realization: 'मन में द्वेष पालना किसी और पर फेंकने के लिए जलता हुआ अंगारा हाथ में पकड़ने जैसा है — सबसे पहले आपका ही हाथ जलता है।',
      },
      {
        num: 'III',
        statement: '“दर्द अनिवार्य है, लेकिन दुख वैकल्पिक है।”',
        realization: 'जीवन में परिवर्तन और हानि निश्चित है। दर्द शरीर को होता है, पर दुख तब पैदा होता है जब मन सत्य को स्वीकार करने से इनकार करता है।',
      },
      {
        num: 'IV',
        statement: '“युद्ध में हज़ारों योद्धाओं को जीतने वाले से कहीं महान वह है जो स्वयं अपने मन को जीत लेता है।”',
        realization: 'बाहरी दुनिया को जीतने से पहले अपने भीतर की तृष्णा और भय को जीतें — पूरा ब्रह्मांड शांत हो जाएगा।',
      },
      {
        num: 'V',
        statement: '“अंत में केवल तीन बातें मायने रखती हैं: आपने कितना प्रेम किया, कितनी सरलता से जिए, और जो आपका नहीं था उसे कितनी सहजता से जाने दिया।”',
        realization: 'इस संसार में कुछ भी स्थायी नहीं है। कसकर पकड़े रहने में नहीं, बल्कि शांति से छोड़ देने में ही सच्ची मुक्ति है।',
      },
      {
        num: 'VI',
        statement: '“अपना दीपक स्वयं बनो; कोई और तुम्हारे हिस्से का मार्ग नहीं चल सकता।”',
        realization: 'किसी के आने की प्रतीक्षा मत करो जो तुम्हारे जीवन को बदलेगा — तुम्हारी मुक्ति तुम्हारे ही भीतर है।',
      },
    ],
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

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeView, setActiveView] = useState('all'); // 'all' | 'om' | 'candle' | 'breath'
  const [isOmPlaying, setIsOmPlaying] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(THIRTY_MINUTES_SECONDS);
  const audioRef = useRef(null);
  const meditationRef = useRef(null);

  // Candle Trataka State
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [candleDurationMins, setCandleDurationMins] = useState(10);
  const [candleSecondsLeft, setCandleSecondsLeft] = useState(10 * 60);

  // Breathing Coach State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState(-1);

  const t = UI_TEXT[lang] || UI_TEXT.en;
  const article = MEDITATION_CONTENT[lang] || MEDITATION_CONTENT.en;
  const buddha = BUDDHA_STATEMENTS[lang] || BUDDHA_STATEMENTS.en;
  const breathSteps = BREATH_STEPS[lang] || BREATH_STEPS.en;
  const currentBreathStep = breathSteps[breathPhase];

  const openFullScreenSection = (sectionKey) => {
    setActiveView((prev) => (prev === sectionKey ? 'all' : sectionKey));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeView !== 'all') {
        setActiveView('all');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView]);

  const stopDroneSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsOmPlaying(false);
    setRemainingSeconds(THIRTY_MINUTES_SECONDS);
  };

  const toggleDroneSound = () => {
    if (!audioRef.current) return;
    if (isOmPlaying) {
      stopDroneSound();
      return;
    }
    setRemainingSeconds(THIRTY_MINUTES_SECONDS);
    audioRef.current
      .play()
      .then(() => setIsOmPlaying(true))
      .catch((err) => console.error('Audio play error:', err));
  };

  useEffect(() => {
    if (!isOmPlaying) return undefined;

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          stopDroneSound();
          return THIRTY_MINUTES_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isOmPlaying]);

  // Candle Trataka Countdown Timer
  useEffect(() => {
    if (activeView !== 'candle' || !isCandleLit) return undefined;

    const timerId = window.setInterval(() => {
      setCandleSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsCandleLit(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [activeView, isCandleLit]);

  const selectCandleMinutes = (mins) => {
    setCandleDurationMins(mins);
    setCandleSecondsLeft(mins * 60);
    setIsCandleLit(true);
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

  return (
    <div className={`app-shell${activeView !== 'all' ? ' is-fullscreen-mode' : ''}`}>
      <audio ref={audioRef} src="/delta-drone.mp3" loop preload="auto" />

      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            type="button"
            onClick={() => {
              setActiveView('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="MindSutra home"
          >
            <span className="brand-mark"><Leaf size={19} strokeWidth={2.2} /></span>
            <span>mind<span className="brand-light">sutra</span></span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            <button
              type="button"
              className={activeView === 'om' ? 'nav-active' : ''}
              onClick={() => openFullScreenSection('om')}
            >
              {t.omNav}
            </button>
            <button
              type="button"
              className={activeView === 'candle' ? 'nav-active' : ''}
              onClick={() => openFullScreenSection('candle')}
            >
              {t.candleNav}
            </button>
            <button
              type="button"
              className={activeView === 'breath' ? 'nav-active' : ''}
              onClick={() => openFullScreenSection('breath')}
            >
              {t.breathNav}
            </button>
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

      {/* HOME PAGE: Buddha Hero + Original Meditation Essay + Buddha Awakening Statements */}
      {activeView === 'all' && (
        <>
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
              <button
                className="hero-link"
                type="button"
                onClick={() => meditationRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.exploreLink} <ArrowDown size={16} />
              </button>
            </div>
            <span className="hero-index" aria-hidden="true">01 <i /> MINDSUTRA</span>
          </section>

          <main ref={meditationRef} className="meditation-article-wrap">
            <header className="article-header">
              <p className="section-kicker"><span /> {article.kicker}</p>
              <h2>{article.leadTitle}</h2>
            </header>

            <div className="article-sections">
              {article.sections.map((sec) => (
                <section key={sec.num} className="article-block">
                  <div className="article-block-head">
                    <span className="article-num">{sec.num}</span>
                    <h3>{sec.title}</h3>
                  </div>
                  <div className="article-body">
                    {sec.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <blockquote className="meditation-quote">
              <p>{article.closingQuote}</p>
            </blockquote>
          </main>

          {/* GAUTAMA BUDDHA LIFE-REALIZATION STATEMENTS */}
          <section className="buddha-wisdom-band" aria-labelledby="buddha-wisdom-title">
            <div className="buddha-wisdom-inner">
              <header className="wisdom-header">
                <p className="section-kicker light-kicker"><span /> {buddha.kicker}</p>
                <h2 id="buddha-wisdom-title">{buddha.title}</h2>
                <p className="wisdom-sub">{buddha.subtitle}</p>
              </header>

              <div className="wisdom-grid">
                {buddha.quotes.map((item) => (
                  <article key={item.num} className="wisdom-card">
                    <span className="wisdom-num">{item.num}</span>
                    <blockquote className="wisdom-statement">{item.statement}</blockquote>
                    <p className="wisdom-realization">{item.realization}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <footer className="site-footer">
            <a className="footer-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <Leaf size={15} /> mindsutra
            </a>
            <span>A quieter moment, whenever you need one.</span>
            <span className="footer-mark">MADE FOR THE MOMENT <i>·</i> INDIA</span>
          </footer>
        </>
      )}

      {/* FULLSCREEN NAVBAR VIEWS */}
      {activeView !== 'all' && (
        <main className="content-wrap fullscreen-wrap">
          <div className="fullscreen-topbar">
            <button
              type="button"
              className="back-home-btn"
              onClick={() => setActiveView('all')}
            >
              <ArrowLeft size={16} /> {t.backHome}
            </button>
          </div>

          {activeView === 'om' && (
            <section
              className={`sound-card section-fullscreen${isOmPlaying ? ' is-playing' : ''}`}
              aria-labelledby="sound-title"
            >
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
                  <span>1Hz Delta waves</span>
                  <span>Binaural beat</span>
                  <span>30-Min Continuous Loop</span>
                  <span style={{ borderColor: 'rgba(239,217,158,.5)', color: '#f2d793', fontWeight: 700 }}>
                    <Clock size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '5px' }} />
                    {formatTime(remainingSeconds)}
                  </span>
                </div>
                <button className={`button button-gold${isOmPlaying ? ' button-stop' : ''}`} type="button" onClick={toggleDroneSound}>
                  {isOmPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
                  {isOmPlaying ? `${t.stopOm} (${formatTime(remainingSeconds)})` : t.startOm}
                  {isOmPlaying && <Volume2 size={16} />}
                </button>
              </div>
              <div className="sound-status" aria-live="polite">
                <span className={`status-dot${isOmPlaying ? ' status-active' : ''}`} />
                {isOmPlaying ? `PLAYING · ${formatTime(remainingSeconds)} LEFT` : '30 MIN SESSION READY'}
              </div>
            </section>
          )}

          {/* FULLSCREEN BURNING CANDLE TRATAKA MEDITATION */}
          {activeView === 'candle' && (
            <section
              className={`candle-sanctuary section-fullscreen${isCandleLit ? ' is-lit' : ' is-out'}`}
              aria-labelledby="candle-title"
            >
              <div className="candle-ambient-aura" aria-hidden="true" />

              <div className="candle-header-copy">
                <p className="section-kicker light-kicker"><span /> {t.candleOverline}</p>
                <h2 id="candle-title">{t.candleTitle}</h2>
                <p>{t.candleDesc}</p>
              </div>

              {/* Realistic Burning Candle Visual */}
              <div className="candle-stage" aria-hidden="true">
                <div className="flame-halo" />
                <div className="flame-assembly">
                  <div className="flame-outer" />
                  <div className="flame-inner" />
                  <div className="flame-core" />
                  <div className="smoke-wisp" />
                </div>
                <div className="candle-wick" />
                <div className="candle-body">
                  <div className="candle-wax-top" />
                  <div className="candle-drip drip-left" />
                  <div className="candle-drip drip-right" />
                </div>
                <div className="candle-holder" />
              </div>

              {/* Timer & Candle Controls */}
              <div className="candle-controls">
                <div className="candle-presets" role="group" aria-label="Candle meditation duration">
                  {[5, 10, 15].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      className={candleDurationMins === mins ? 'preset-active' : ''}
                      onClick={() => selectCandleMinutes(mins)}
                    >
                      {mins} min
                    </button>
                  ))}
                  <span className="candle-timer-pill">
                    <Clock size={12} /> {formatTime(candleSecondsLeft)}
                  </span>
                </div>

                <div className="candle-actions">
                  <button
                    type="button"
                    className={`button ${isCandleLit ? 'button-stop' : 'button-gold'}`}
                    onClick={() => {
                      if (!isCandleLit && candleSecondsLeft === 0) {
                        setCandleSecondsLeft(candleDurationMins * 60);
                      }
                      setIsCandleLit((lit) => !lit);
                    }}
                  >
                    <Flame size={16} />
                    {isCandleLit ? t.extinguishBtn : t.relightBtn}
                  </button>

                  <button
                    type="button"
                    className="candle-reset-btn"
                    onClick={() => selectCandleMinutes(candleDurationMins)}
                  >
                    <RotateCcw size={14} /> {t.resetTimerBtn}
                  </button>
                </div>
              </div>

              <div className="sound-status" aria-live="polite">
                <span className={`status-dot${isCandleLit ? ' status-active' : ''}`} />
                {isCandleLit ? t.candleLitStatus : t.candleUnlitStatus}
              </div>
            </section>
          )}

          {activeView === 'breath' && (
            <div className="fullscreen-breath-wrapper">
              <section className="panel breath-panel section-fullscreen" aria-labelledby="breath-title">
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
            </div>
          )}
        </main>
      )}
    </div>
  );
}