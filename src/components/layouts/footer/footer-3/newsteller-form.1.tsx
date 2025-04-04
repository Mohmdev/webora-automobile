import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function NewsletterForm() {
  return (
    <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
      <div className="space-y-4">
        <Label htmlFor="mail" className="block font-medium">
          Newsletter
        </Label>
        <div className="flex gap-2">
          <Input
            type="email"
            id="mail"
            name="mail"
            placeholder="Your email"
            className="h-8 text-sm"
          />
          <Button size="sm">Submit</Button>
        </div>
        <span className="block text-muted-foreground text-sm">
          Don't miss any update!
        </span>
      </div>
    </form>
  )
}
