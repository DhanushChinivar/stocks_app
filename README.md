<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=black"/>
    <img src="https://img.shields.io/badge/-Better Auth-black?style=for-the-badge&logoColor=white&logo=betterauth&color=black"/>
    <img src="https://img.shields.io/badge/-Shadcn-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=black"/>
    <img src="https://img.shields.io/badge/-Inngest-black?style=for-the-badge&logoColor=white&logo=inngest&color=black"/><br/>
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=00A35C"/>
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC"/>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6"/>
  </div>

  <h1 align="center">Rallify</h1>
  <p align="center">A real-time stock market platform with AI-powered insights, smart alerts, and event-driven automation.</p>

  <p align="center">
    <a href="http://localhost:3000">View Demo</a> ·
    <a href="https://github.com/yourusername/rallify/issues">Report Bug</a> ·
    <a href="https://github.com/yourusername/rallify/issues">Request Feature</a>
  </p>

</div>

---

## About the Project

Rallify is a full-stack financial platform I built to combine real-time market data with AI-driven analysis and automated workflows. Users can monitor stocks, receive intelligent price alerts, and get personalized daily digests — all powered by an event-driven backend.

The project was an opportunity to work with several technologies I wanted to go deep on: Inngest for background job orchestration, Better Auth for modern authentication patterns, and the Gemini API for generating contextual market summaries.

### Key highlights:
- Event-driven architecture using Inngest for reliable background processing
- Real-time stock data via Finnhub WebSocket and REST APIs
- AI-generated market summaries and sentiment analysis via Gemini
- Role-based access with an admin dashboard for content and user management
- Transactional email notifications via Nodemailer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | Better Auth |
| Database | MongoDB |
| Styling | TailwindCSS + Shadcn UI |
| Background Jobs | Inngest |
| Market Data | Finnhub API |
| AI | Google Gemini |
| Email | Nodemailer |

---

## Features

- **Real-Time Stock Dashboard** — Interactive line and candlestick charts with historical data. Filter stocks by industry, performance, or market cap.
- **Smart Alerts** — Set custom thresholds for price changes or volume spikes and receive instant email notifications.
- **Watchlist Management** — Build and manage a personalized stock watchlist.
- **Company Insights** — Deep-dive into PE ratio, EPS, revenue trends, analyst ratings, filings, news, and sentiment scores.
- **AI Summaries** — Daily market digests and earnings report breakdowns generated with Gemini.
- **Admin Dashboard** — Manage stocks, publish financial news, and monitor user activity.
- **Automated Workflows** — Inngest-powered pipelines handle price monitoring, alert scheduling, and digest delivery.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18+)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/rallify.git
cd rallify

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Finnhub
NEXT_PUBLIC_NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MongoDB
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Gemini
GEMINI_API_KEY=

# Nodemailer
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

You'll need accounts at:

- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) — database
- [Finnhub](https://finnhub.io) — market data API
- [Google AI Studio](https://aistudio.google.com/) — Gemini API key
- [Inngest](https://www.inngest.com/) — background job dashboard

### Running Locally

```bash
# Start the Next.js dev server
npm run dev

# In a separate terminal, start the Inngest dev server
npx inngest-cli@latest dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## Project Structure

```
rallify/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Utility functions and API clients
├── inngest/              # Inngest event functions and workflows
├── models/               # MongoDB schemas
└── public/               # Static assets
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Your Name — Dhanush Chinivar (mailto:dhanushchinivar@gmail.com) · [LinkedIn](https://www.linkedin.com/in/dhanush-chinivar/) · 