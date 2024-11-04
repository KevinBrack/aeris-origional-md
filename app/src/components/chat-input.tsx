import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import type { ChatMessage } from "@/lib/openrouter"
import { Loader2 } from "lucide-react"

export function ChatInput() {
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()
  const { addMessage, setIsLoading, setError } = useChatStore()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isPending) return

    // Use browser's console
    if (typeof window !== 'undefined') {
      console.log('[CHAT_INPUT] Sending message:', message.trim());
    }
    
    // Add user message immediately
    addMessage({ role: "user", content: message.trim() })
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window !== 'undefined') {
        console.log('[CHAT_INPUT] Making API request');
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (typeof window !== 'undefined') {
        console.log('[CHAT_INPUT] API response status:', response.status);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (typeof window !== 'undefined') {
          console.error('[CHAT_INPUT] API error:', errorData);
        }
        throw new Error(errorData.error || response.statusText);
      }

      if (!response.body) {
        if (typeof window !== 'undefined') {
          console.error('[CHAT_INPUT] No response body');
        }
        throw new Error("No response body");
      }

      // Initialize streaming
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedResponse = ""

      if (typeof window !== 'undefined') {
        console.log('[CHAT_INPUT] Starting stream processing');
      }

      // Add initial assistant message
      addMessage({ role: "assistant", content: "" })

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) {
            if (typeof window !== 'undefined') {
              console.log('[CHAT_INPUT] Stream complete');
            }
            break;
          }

          // Decode the chunk and update the last message
          const chunk = decoder.decode(value, { stream: true })
          if (typeof window !== 'undefined') {
            console.log('[CHAT_INPUT] Received chunk:', chunk);
          }
          accumulatedResponse += chunk
          
          // Update the last message with the accumulated response
          const messages = useChatStore.getState().messages
          const updatedMessages: ChatMessage[] = [...messages.slice(0, -1), {
            role: "assistant",
            content: accumulatedResponse
          }]
          useChatStore.setState({ messages: updatedMessages })
        }
      } catch (streamError) {
        if (typeof window !== 'undefined') {
          console.error('[CHAT_INPUT] Stream processing error:', streamError);
        }
        throw streamError;
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        console.error("[CHAT_INPUT] Error:", error);
      }
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[80px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || isPending}
        className="self-end"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Quantum processing...
          </>
        ) : (
          "Send"
        )}
      </Button>
    </form>
  )
}
