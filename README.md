# Your First Week at Fleek

A five-day guided onboarding web app for the **People Ops & Workspace Manager** role at Fleek.

Built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## What it is

A fully interactive, emotionally-driven onboarding experience. Each day centres on one of Fleek's five company values and unlocks the next only after completion:

- **Day 1** Embrace Diversity / You Belong Here
- **Day 2** Talk to the Customer / Why Fleek Exists
- **Day 3** Absolute Ownership / How We Operate
- **Day 4** Curiosity Leads the Way / Learn Fast
- **Day 5** Dream Big & Disrupt Yourself / The Future You'll Shape

Features include:
- Pre-personalised for Tamar (People Ops & Workspace Manager)
- Sequential day unlocking with progress tracking
- Daily reflections saved to localStorage
- Interactive scenarios, supply chain explorer, prompt library, workflow builder
- AI assistant panel (keyword-routed mock responses, ready for real API)
- Celebratory completion screen that surfaces all reflections
- Framer Motion page transitions and entrance animations
- Fully responsive, Vercel-deployable

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import the repo
4. Vercel will auto-detect Next.js. No environment variables needed.
5. Click **Deploy**

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Connecting a real AI assistant

The assistant in `components/Assistant.jsx` uses keyword-routed mock responses. To swap in Anthropic's API:

1. Add `ANTHROPIC_API_KEY` to your Vercel environment variables (or `.env.local`)
2. Create an API route at `app/api/chat/route.js`:

```js
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req) {
  const { messages } = await req.json();
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: "You are an onboarding assistant for Fleek, a fast-growing AI-native startup rebuilding the secondhand fashion supply chain. Answer questions warmly and specifically. Be honest about what you don't know. Keep responses under 120 words.",
    messages,
  });
  return Response.json({ text: response.content[0].text });
}
```

3. In `components/Assistant.jsx`, replace the `respond()` call with a `fetch('/api/chat', ...)` call.

## Tech stack

- **Next.js 16** with App Router
- **Tailwind CSS 4** (design tokens in `app/globals.css`)
- **Framer Motion 12** for page transitions and entrance animations
- **Google Fonts** via `next/font`: Geist, Instrument Serif, Geist Mono
- **localStorage** for progress persistence
- No database, no auth, no external dependencies at runtime

## Project structure

```
app/
  layout.js       Root layout with font loading
  page.js         Entry point
  globals.css     Design tokens + shared CSS

components/
  App.jsx         Main orchestrator, routing, state
  Welcome.jsx     Onboarding intake (2-step)
  Hub.jsx         Journey overview with day cards
  DayShell.jsx    Day wrapper with tasks rail + reflection
  DayContent.jsx  Dispatcher to Day1-5
  Assistant.jsx   Slide-in AI assistant panel
  Completion.jsx  Celebratory finish screen
  ui.jsx          Shared primitives (Icon, Avatar, Chrome, etc.)
  days/
    Day1.jsx - Day5.jsx

data/
  index.js        All mock data (teammates, day defs, AI responses)

public/
  fleek-logo.png
```
