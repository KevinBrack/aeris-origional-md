import { useEffect, useRef } from "react"
import { useChatStore } from "@/lib/store"
import { ChatMessage } from "./chat-message"
import { LoadingMessage } from "./loading-message"
import { ErrorMessage } from "./error-message"
import { Card } from "@/components/ui/card"

export function ChatMessages() {
  const { messages, isLoading, error } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Debug logging
  useEffect(() => {
    console.log('[CHAT_MESSAGES] Current messages:', messages);
    console.log('[CHAT_MESSAGES] Loading state:', isLoading);
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="space-y-4">
        {/* Welcome message */}
        {messages.length === 0 && (
          <ChatMessage
            role="assistant"
            content="Hello darling! I'm Aeris, your quantum-powered AI assistant. *holographic form shimmers with excitement* What shall we create together today?"
          />
        )}
        
        {/* Chat messages */}
        {messages.map((message, index) => (
          <ChatMessage
            key={`${message.role}-${index}`}
            {...message}
            isLast={index === messages.length - 1 && !isLoading}
          />
        ))}
        
        {/* Loading state with typing indicator */}
        {isLoading && (
          <div className="flex w-full items-start gap-4 p-4">
            <Card className="flex-1 p-4 bg-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <span className="ml-2 text-sm text-muted-foreground">
                  *holographic form shimmers while quantum processing*
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* Error message */}
        {error && <ErrorMessage message={error} />}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} className="h-1" />
      </div>
    </div>
  )
}
