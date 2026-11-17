USE mindsutra_db;

INSERT INTO roles (id, name, description) VALUES
(1, 'ROLE_USER', 'Standard wellness member'),
(2, 'ROLE_ADMIN', 'Content and platform administrator');

INSERT INTO languages (code, name_en, native_name, is_active) VALUES
('en', 'English', 'English', TRUE),
('kn', 'Kannada', 'ಕನ್ನಡ', TRUE),
('hi', 'Hindi', 'हिंदी', TRUE),
('ta', 'Tamil', 'தமிழ்', FALSE),
('te', 'Telugu', 'తెలుగు', FALSE),
('ml', 'Malayalam', 'മലയാളം', FALSE),
('mr', 'Marathi', 'मराठी', FALSE),
('bn', 'Bengali', 'বাংলা', FALSE),
('gu', 'Gujarati', 'ગુજરાતી', FALSE),
('pa', 'Punjabi', 'ਪੰਜਾਬੀ', FALSE);

INSERT INTO meditation_categories (id, slug, name_en, name_kn, name_hi, icon_name, sort_order) VALUES
(1, 'mindfulness', 'Mindfulness', 'ಮೈಂಡ್‌ಫುಲ್‌ನೆಸ್', 'माइंडफुलनेस', 'Leaf', 1),
(2, 'relaxation', 'Relaxation', 'ವಿಶ್ರಾಂತಿ', 'विश्राम', 'Sun', 2),
(3, 'focus', 'Focus', 'ಏಕಾಗ್ರತೆ', 'एकाग्रता', 'Compass', 3),
(4, 'stress-relief', 'Stress Relief', 'ಒತ್ತಡ ನಿವಾರಣೆ', 'तनाव मुक्ति', 'Wind', 4),
(5, 'beginner', 'Beginner Meditation', 'ಆರಂಭಿಕ ಧ್ಯಾನ', 'शुरुआती ध्यान', 'Sparkles', 5),
(6, 'sleep', 'Sleep', 'ನಿದ್ರೆ', 'नींद', 'Moon', 6);

INSERT INTO meditation_sessions (id, category_id, language_code, title, description, instructor_name, duration_seconds, difficulty_level, is_featured) VALUES
(1, 5, 'en', 'Morning Grounding & Breath', 'A gentle 8-minute arrival into stillness with mindful awareness.', 'Aarav Sharma', 480, 'BEGINNER', TRUE),
(2, 4, 'kn', 'ಶಾಂತ ಮನಸ್ಸು - ಒತ್ತಡ ನಿವಾರಣೆ (Calm Mind)', 'ದೈನಂದಿನ ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮಾರ್ಗದರ್ಶಿ ಧ್ಯಾನ.', 'Ananya Rao', 600, 'BEGINNER', TRUE),
(3, 1, 'hi', 'शांत श्वास और सजगता (Mindful Breath)', 'वर्तमान क्षण में लौटने के लिए सरल और शांत ध्यान अभ्यास।', 'Meera Joshi', 720, 'INTERMEDIATE', TRUE),
(4, 6, 'en', 'Western Ghats Monsoon Drift', 'Soft forest rain and body scan relaxation for restful sleep.', 'Rohan Nair', 1200, 'BEGINNER', FALSE),
(5, 3, 'en', 'Deep Work Clarity Reset', 'Clear mental clutter and sharpen sustained attention.', 'Aarav Sharma', 600, 'INTERMEDIATE', FALSE);
