import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"

export function LoadingMessage() {
  return (
    <div className="flex w-full items-start gap-4 p-4">
      <Avatar className="h-8 w-8 bg-muted">
        <span className="text-xs">AI</span>
      </Avatar>
      <Card className="flex-1 p-4 bg-muted">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </Card>
    </div>
  )
}
