"use client"

import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col">
      <ChatMessages />
      <ChatInput />
    </main>
  )
}
