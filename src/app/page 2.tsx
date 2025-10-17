import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Utah Valley Tool Rental
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-8">
          Rent professional tools by the day - simple, secure, self-service
        </p>
        <div className="text-center mb-8">
          <Button size="lg">Browse Tools</Button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Next.js 14 + TypeScript + Tailwind CSS + PWA
          </p>
        </div>
      </div>
    </main>
  )
}