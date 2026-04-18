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
    <a href="https://rallify.app">View Demo</a> ·
    <a href="https://github.com/DhanushChinivar/stocks_app/issues">Report Bug</a> ·
    <a href="https://github.com/DhanushChinivar/stocks_app/issues">Request Feature</a>
  </p>

</div>

---

## The Story

Most retail investors drown in noise too many tabs, too many tools, too much scattered data. **Rallify** was built to fix that.

The idea started simple: one clean dashboard, live market data, and smart automation that works for you even when you're not watching. What grew from that became a full-stack, event-driven, AI-augmented financial platform built by one person.

At its core, Rallify connects to **Finnhub's API** to pull live stock prices, company profiles, financials, analyst ratings, earnings data, and market news in real time. Users can search any stock, deep-dive into a company's fundamentals, and track price movements as they happen.

But live data alone wasn't enough. Users needed to act on it so **Smart Alerts** were built in. Set an upper or lower price threshold on any stock, and Rallify watches it 24/7.

To make the platform truly automated, **Inngest** was wired in as the event-driven backbone. Every user signup fires a personalised welcome email. Every day at noon, Rallify fetches each user's watchlist, grabs relevant market news, runs it through **Google Gemini AI** to generate a personalised digest, and sends it out automatically, reliably, without a single cron job to manage manually.

What makes Rallify interesting isn't any single feature — it's that everything talks to everything. A user signs up → welcome email fires. They add stocks to their watchlist → next morning they get an AI summary of exactly those companies. They set an alert → the system watches it and reacts.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | Better Auth |
| Database | MongoDB Atlas |
| Styling | TailwindCSS + Shadcn UI |
| Background Jobs | Inngest |
| Market Data | Finnhub API |
| AI | Google Gemini |
| Email | Resend |

---

## Features

- **Real-Time Stock Dashboard** — Live prices, candlestick charts, and market overview widgets powered by Finnhub and TradingView.
- **Smart Alerts** — Set custom upper/lower price thresholds on any stock and get notified when triggered.
- **Watchlist Management** — Build and manage a personalised stock watchlist with live price tracking.
- **Company Insights** — Deep-dive into PE ratio, EPS, revenue trends, analyst ratings, news, and sentiment scores.
- **AI Daily Digest** — Every morning, Gemini AI generates a personalised market summary based on your watchlist and emails it to you.
- **Automated Workflows** — Inngest-powered event pipelines handle welcome emails, news summarisation, and digest delivery.
- **Beautiful Auth Pages** — Animated landing page with live stock ticker, image carousel, and a clean sign-in/sign-up flow.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18+)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/DhanushChinivar/stocks_app.git
cd stocks_app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Finnhub
NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MongoDB
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Gemini
GEMINI_API_KEY=

# Resend
RESEND_API_KEY=
```

You'll need accounts at:

- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) — database
- [Finnhub](https://finnhub.io) — market data API
- [Google AI Studio](https://aistudio.google.com/) — Gemini API key
- [Inngest](https://www.inngest.com/) — background job dashboard
- [Resend](https://resend.com) — transactional emails

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
stocks_app/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Sign-in, sign-up pages and landing layout
│   └── (root)/           # Dashboard, watchlist, stock detail pages
├── components/           # Reusable UI components
├── database/             # MongoDB models and connection
├── lib/
│   ├── actions/          # Server actions (auth, stocks, alerts, watchlist)
│   ├── email/            # Resend email sending and HTML templates
│   ├── inngest/          # Inngest event functions and AI workflows
│   └── better-auth/      # Auth configuration
├── hooks/                # Custom React hooks
├── types/                # Global TypeScript types
└── public/               # Static assets
```

---

## Contact

Dhanush Chinivar — [dhanushchinivar@gmail.com](mailto:dhanushchinivar@gmail.com) · [LinkedIn](https://www.linkedin.com/in/dhanush-chinivar/)
