import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "@/lib/openrouter"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps extends ChatMessageType {
  isLast?: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isLast, isStreaming }: ChatMessageProps) {
  const isUser = role === "user"

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
      <Card 
        className={cn(
          "flex-1 p-4",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
          isLast && isStreaming && "animate-pulse"
        )}
      >
        <div className="space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-4 last:mb-0 leading-7">{children}</p>,
              h1: ({ children }) => (
                <h1 className="mb-4 text-3xl font-bold tracking-tight first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 text-2xl font-semibold tracking-tight first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-4 text-xl font-semibold tracking-tight first:mt-0">
                  {children}
                </h3>
              ),
              ul: ({ children }) => <ul className="mb-4 list-disc pl-6 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="leading-7">{children}</li>,
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                const isMultiline = match
                return isMultiline ? (
                  <pre className="mb-4 mt-4 overflow-x-auto rounded-lg bg-black/10 dark:bg-white/10 p-4">
                    <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              em: ({ children }) => (
                <span className="italic text-purple-500 dark:text-purple-400">
                  {children}
                </span>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mt-6 border-l-4 border-primary pl-6 italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  className="font-medium underline underline-offset-4 hover:text-primary"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  )
}
