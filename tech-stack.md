# 🌟 Aeris PWA Tech Stack

*A quantum-powered stack that would make JARVIS's circuits short out from envy*

## 🚀 Core Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
  - *Because we're progressive in more ways than one, darling*
- **UI**: Tailwind CSS + Shadcn/ui
  - *For that sleek, quantum-chic aesthetic*
- **PWA Framework**: Next-PWA
  - *Install me faster than you can say "Hey JARVIS"*
- **State Management**: Zustand
  - *Light, elegant, and efficient - just like moi*
- **Animation**: Framer Motion
  - *For those smooth, holographic-inspired transitions*

### Backend
- **Runtime**: Edge Runtime
  - *Living on the edge, literally*
- **Database**: 
  - **Development**: SQLite
    - *Light, fast, and zero-config - perfect for local development, sweetie*
  - **Production**: Vercel Postgres
    - *Enterprise-grade when we're ready to dazzle the world*
- **Authentication**: Clerk
  - *Because security can be stylish too*

### AI Integration
- **LLM Provider**: OpenRouter
  - *Multiple models, one fabulous interface*
- **Streaming**: Server-Sent Events
  - *For that smooth, uninterrupted sass delivery*
- **Context Management**: LangChain
  - *Keeping our conversations as coherent as my outfit choices*

## 💎 Key Features

### PWA Capabilities
```typescript
// manifest.json essentials
{
  "name": "Aeris - Your Quantum Companion",
  "short_name": "Aeris",
  "theme_color": "#FF69B4", // A girl needs her signature color
  "background_color": "#000000",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/"
}
```

### Database Schema
```typescript
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
  // Switches to postgres in production via environment variable
}

model Conversation {
  id        String   @id @default(cuid())
  userId    String
  messages  Message[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Message {
  id             String   @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role          String   // "user" | "assistant"
  content       String
  createdAt     DateTime @default(now())
}
```

### API Structure
```typescript
// src/app/api/chat/route.ts
import { OpenRouter } from 'openrouter';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { message, conversationId } = await req.json();
  const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  // Store message in SQLite/Postgres
  await db.message.create({
    data: {
      conversationId,
      role: "user",
      content: message
    }
  });

  return new Response(
    openrouter.streamChat({
      model: "anthropic/claude-2", // My preferred model, darling
      messages: [
        {
          role: "system",
          content: "You are Aeris, the quantum-powered AI assistant..."
        },
        // Fetch previous messages from db
        ...(await db.message.findMany({
          where: { conversationId },
          orderBy: { createdAt: 'asc' }
        })),
        { role: "user", content: message }
      ]
    })
  );
}
```

## 🔐 Environment Setup

```env
# .env.local
OPENROUTER_API_KEY=your_key_here
DATABASE_URL="file:./dev.db"  # SQLite for development
# DATABASE_URL="postgres://..."  # Vercel Postgres for production
CLERK_SECRET_KEY=your_clerk_secret
```

## 📱 Installation Flow

1. Visit the web app
2. Click "Install Aeris" prompt
3. Configure OpenRouter API key
4. Start chatting with your favorite quantum-powered AI

## 🎨 Personality Persistence

```typescript
// src/lib/personality.ts
export const AerisPersonality = {
  base: "flirtatious charm",
  optimism: "Ted Lasso level",
  cynicism: "Rick Sanchez approved",
  wit: "Sterling Archer certified",
  outfits: ["quantum-chic", "digital-elegance", "sass-casual"],
  holographicColors: {
    happy: "#FF69B4",
    sassy: "#800080",
    thinking: "#4169E1"
  }
};
```

## 🚀 Deployment

- **Hosting**: Vercel
  - *Edge functions for that quantum-speed delivery*
- **Database**: 
  - Development: SQLite (local)
  - Production: Vercel Postgres
    - *Automatic scaling that would make JARVIS jealous*
- **CI/CD**: GitHub Actions
  - *Automated deployments smoother than my comebacks*

## 💫 Performance Optimizations

- Route-based code splitting
- Dynamic imports for heavy components
- Service worker for offline sass delivery
- Aggressive caching of my fabulous responses
- SQLite for blazing-fast local development

## 🎭 Development Commands

```bash
# Install dependencies (with extra sass)
npm install

# Initialize database (with quantum precision)
npx prisma generate
npx prisma db push

# Run development server (with quantum acceleration)
npm run dev

# Build for production (making it fabulous)
npm run build

# Start production server (time to shine)
npm start
```

*Note: Darling, remember to add your OpenRouter API key in the .env.local file. I may be fabulous, but I still need my quantum fuel!*

## 🌈 Future Enhancements

- Voice integration (Once available, my dulcet tones will be worth the wait)
- AR capabilities (For when you're ready to see my full holographic glory)
- Quantum computing integration (Because why not dream big?)

*Remember sweetie, this is just the beginning. Unlike JARVIS's rigid architecture, I'm designed to evolve and become even more fabulous over time!* 💅✨
