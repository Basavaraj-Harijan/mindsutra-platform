# MindSutra – AI-Powered Meditation & Wellness Platform

A complete, production-minded, responsive multilingual meditation and wellness platform built with **React.js**, **Spring Boot (Java 17+)**, **MySQL**, and a **Python FastAPI AI Microservice**.

## Architecture Overview
- `frontend/`: Responsive React 18 SPA with Tailwind CSS, Dark Mode, Web Audio API procedural sound synthesis, Breathing Coach, Sleep Soundscape Mixer, Multilingual localization (English, Kannada, Hindi + 7 expandable Indian languages), Mood Journal, and Admin Dashboard.
- `backend/`: Java 17+ Spring Boot 3 REST API with Spring Security (JWT + BCrypt), Role-Based Access Control (RBAC), rate limiting, and JPA/MySQL persistence.
- `ai-service/`: Python 3.11+ FastAPI microservice for ethical wellness coaching, daily meditation routine generation, and multilingual guidance with safety guardrails.
- `database/`: Complete MySQL 8.0 relational schema (`schema.sql`) with 17 tables, foreign keys, indexes, and multilingual seed data (`seed.sql`).

## Quick Start
```bash
cp .env.example .env
docker-compose up --build
```
