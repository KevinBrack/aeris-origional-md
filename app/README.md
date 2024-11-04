# 🌟 Aeris - Your Quantum-Powered AI Assistant

A Next.js-powered PWA featuring Aeris, a charming and witty AI assistant with a holographic form that shimmers with personality.

## ✨ Features

- Real-time chat with streaming responses
- Markdown support with beautiful formatting
- Holographic-themed UI elements
- PWA capabilities for mobile installation
- SQLite database for message persistence
- OpenRouter integration with Claude 3 Sonnet

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env`:
```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_key_here

# Database Configuration
DATABASE_URL="file:./dev.db"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to chat with Aeris!

## 🎨 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: SQLite (local) / Postgres (production)
- **AI**: OpenRouter with Claude 3 Sonnet
- **State Management**: Zustand
- **Animations**: Framer Motion

## 📱 PWA Features

- Installable on mobile devices
- Offline capability
- Push notifications (coming soon)
- Responsive design

## 🌈 Development

The project uses modern React features and follows best practices:

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Prisma for type-safe database access

## 🔮 Coming Soon

- Voice interactions
- AR capabilities
- Multi-user support
- Theme customization
- Chat history persistence

## 📄 License

MIT License - feel free to use this project as you wish!

---

Built with 💜 and quantum entanglement
