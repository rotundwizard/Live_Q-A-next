# GEMINI.md

## Project Overview
**Live Q&A Web App** is a self-hostable, real-time platform for managing live Q&A sessions. It supports participant question submission and voting, moderator approval and archiving, and a dedicated live display for projection.

### Core Technologies
- **Backend:** Node.js, Express
- **Real-time:** Socket.io
- **Database:** SQLite3 (stored in `database/questions.db`)
- **Frontend:** Vanilla HTML, CSS, and JavaScript
- **Deployment:** Docker, Docker Compose

### Architecture
- **Server (`server.js`):** Handles HTTP requests, session management (moderator auth), and Socket.io events for real-time updates.
- **Frontend Views (`public/`):**
    - `user.html`: Participant interface for submitting and voting on questions.
    - `moderator.html`: Dashboard for approving, editing, archiving, and managing the "live" question.
    - `presenter.html`: View for the speaker to see current and upcoming questions.
    - `live.html`: High-visibility view for audience projection.
- **Configuration:** `config/event_config.json` stores event details (name, datetime, URL) and theme selections.

---

## Building and Running

### Local Development
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Docker Deployment
1. **Start the containers:**
   ```bash
   docker compose up -d
   ```
2. **Rebuild and start (after code changes):**
   ```bash
   docker compose up -d --build
   ```
3. **Stop the containers:**
   ```bash
   docker compose down
   ```
2. **Environment Variables:**
   - `MODERATOR_PASSWORD`: Set the password for the moderator dashboard (default: `mod123`).
   - `PORT`: Port the server listens on (default: `3000`).

---

## Development Conventions

### Coding Style
- **Server-side:** CommonJS modules (`require`).
- **Client-side:** Vanilla JavaScript with Socket.io-client. Uses `fetch` for initial question loads and WebSockets for real-time updates.
- **Theming:** CSS files are organized in `public/themes/` by view (e.g., `user/`, `moderator/`). Themes can be dynamically switched via the moderator panel.

### Database Schema
- `questions`: Active questions (submitted, approved, live, next_up).
- `archived_questions`: Questions that have been answered or moved out of the active pool.
- `votes`: Tracks upvotes per socket ID to prevent duplicate voting.

### Key Socket.io Events
- **Participants:** `submit_question`, `upvote`.
- **Moderators:** `moderator_action` (approve, live, archive, edit, etc.), `save_event_config`.
- **Global:** `timer_state`, `live_question`, `approved_questions`.

---

## Project Structure
- `config/`: JSON configuration for events and themes.
- `database/`: SQLite database file.
- `public/`: All frontend assets (HTML, CSS, JS, images, themes).
- `Dockerfile` & `docker-compose.yml`: Containerization logic.
- `server.js`: Main entry point and backend logic.

---

## Git and Pull Requests
- **PR Target:** This repository is a fork of \`martincj/Live_Q-A\`. All pull requests created by Gemini CLI MUST explicitly target the \`main\` branch of the fork repository at **rotundwizard/Live_Q-A-next**, NOT the upstream parent.
