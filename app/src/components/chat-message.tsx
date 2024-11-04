import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "@/lib/openrouter"

interface ChatMessageProps extends ChatMessageType {
  isLast?: boolean;
}

export function ChatMessage({ role, content, isLast }: ChatMessageProps) {
  const isUser = role === "user"

  // Debug logging
  console.log('[CHAT_MESSAGE] Rendering message:', { role, content, isLast });

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn(
        "h-8 w-8",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <span className="text-xs">
          {isUser ? "You" : "AI"}
        </span>
      </Avatar>
      <Card className={cn(
        "flex-1 p-4",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        isLast && role === "assistant" && "animate-pulse"
      )}>
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </Card>
    </div>
  )
}
