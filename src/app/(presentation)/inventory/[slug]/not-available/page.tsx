import { EndButtons } from "@/components/shared/end-buttons"
import { XCircle } from "lucide-react"

export default function NotAvailablePage() {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center">
      <div className="flex flex-col items-center space-y-4 p-8">
        <XCircle className="h-16 w-16 text-muted-foreground" />
        <p className="text-center font-semibold text-lg">
          Sorry, that vehicle is no longer available.
        </p>
        <p className="text-center text-muted-foreground">
          We have a large number of other vehicles that might suit your needs,
          to view our current stock please check our website.
        </p>
        <EndButtons />
      </div>
    </div>
  )
}
