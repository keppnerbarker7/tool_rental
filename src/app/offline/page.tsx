'use client'

import { Button } from '@/components/ui/button'
import { WifiOff, RefreshCw, Home } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <WifiOff className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            You&apos;re Offline
          </h1>
          <p className="text-muted-foreground">
            No internet connection detected. You can still browse cached tools and view your existing reservations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <h3 className="font-medium text-foreground mb-2">Available Offline:</h3>
            <ul className="space-y-1 text-left">
              <li>• Browse cached tool listings</li>
              <li>• View tool details and pricing</li>
              <li>• Check your reservation history</li>
              <li>• Access contact information</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>
            New reservations will be synced when your connection is restored.
          </p>
        </div>
      </div>
    </div>
  )
}