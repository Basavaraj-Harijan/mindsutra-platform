CREATE DATABASE IF NOT EXISTS mindsutra_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mindsutra_db;

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE languages (
    code VARCHAR(10) PRIMARY KEY,
    name_en VARCHAR(64) NOT NULL,
    native_name VARCHAR(64) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    preferred_language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    reset_token_hash VARCHAR(255) NULL,
    reset_token_expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_users_lang FOREIGN KEY (preferred_language) REFERENCES languages(code)
);

CREATE TABLE user_preferences (
    user_id BIGINT PRIMARY KEY,
    experience_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    primary_goal VARCHAR(100) DEFAULT 'Stress Relief',
    preferred_duration_min INT DEFAULT 10,
    dark_mode BOOLEAN DEFAULT FALSE,
    notifications_enabled BOOLEAN DEFAULT FALSE,
    reminder_time TIME NULL,
    high_contrast_mode BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pref_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE meditation_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL,
    name_kn VARCHAR(100),
    name_hi VARCHAR(100),
    icon_name VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meditation_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor_name VARCHAR(120),
    duration_seconds INT NOT NULL,
    difficulty_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    cover_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_session_cat FOREIGN KEY (category_id) REFERENCES meditation_categories(id),
    CONSTRAINT fk_session_lang FOREIGN KEY (language_code) REFERENCES languages(code)
);

CREATE TABLE audio_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    cdn_url VARCHAR(500) NOT NULL,
    source_type ENUM('HUMAN_NARRATION', 'AI_TTS', 'AMBIENT_SOUNDSCAPE') DEFAULT 'HUMAN_NARRATION',
    mime_type VARCHAR(64) DEFAULT 'audio/mpeg',
    file_size_bytes BIGINT,
    duration_seconds INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audio_session FOREIGN KEY (session_id) REFERENCES meditation_sessions(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    user_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, session_id),
    CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_session FOREIGN KEY (session_id) REFERENCES meditation_sessions(id) ON DELETE CASCADE
);

CREATE TABLE meditation_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    completed_seconds INT NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_hist_session FOREIGN KEY (session_id) REFERENCES meditation_sessions(id) ON DELETE CASCADE
);

CREATE TABLE breathing_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    name_en VARCHAR(120) NOT NULL,
    name_kn VARCHAR(120),
    name_hi VARCHAR(120),
    inhale_sec INT NOT NULL,
    hold_in_sec INT NOT NULL DEFAULT 0,
    exhale_sec INT NOT NULL,
    hold_out_sec INT NOT NULL DEFAULT 0,
    default_cycles INT NOT NULL DEFAULT 5,
    description_en TEXT
);

CREATE TABLE mood_journal (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    mood_score TINYINT NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
    mood_label VARCHAR(50) NOT NULL,
    private_note TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mood_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ai_recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    rationale TEXT NOT NULL,
    plan_date DATE NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_airec_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_airec_session FOREIGN KEY (session_id) REFERENCES meditation_sessions(id) ON DELETE CASCADE
);

CREATE TABLE chat_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    language_code VARCHAR(10) DEFAULT 'en',
    title VARCHAR(150) DEFAULT 'Wellness Guidance Session',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chat_session_id BIGINT NOT NULL,
    sender ENUM('USER', 'ASSISTANT') NOT NULL,
    message_text TEXT NOT NULL,
    is_ai_generated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_msg_chat FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    body VARCHAR(500) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    scheduled_for TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    plan_tier ENUM('FREE', 'PREMIUM_MONTHLY', 'PREMIUM_ANNUAL') DEFAULT 'FREE',
    status ENUM('ACTIVE', 'CANCELLED', 'EXPIRED') DEFAULT 'ACTIVE',
    starts_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP NULL,
    CONSTRAINT fk_sub_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE content_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reporter_user_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    status ENUM('OPEN', 'REVIEWED', 'RESOLVED') DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rep_user FOREIGN KEY (reporter_user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_rep_session FOREIGN KEY (session_id) REFERENCES meditation_sessions(id) ON DELETE CASCADE
);
