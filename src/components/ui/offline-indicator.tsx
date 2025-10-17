'use client'

import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { WifiOff, Wifi, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OfflineIndicatorProps {
  className?: string
  showConnectionType?: boolean
}

export function OfflineIndicator({
  className,
  showConnectionType = false
}: OfflineIndicatorProps) {
  const { isOnline, isReconnecting, connectionType } = useNetworkStatus()

  if (isOnline && !isReconnecting) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm',
        'flex items-center justify-center px-4 py-2 text-sm',
        !isOnline && 'bg-destructive text-destructive-foreground',
        isReconnecting && 'bg-amber-500 text-amber-50',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {!isOnline && <WifiOff className="h-4 w-4" />}
        {isReconnecting && <Wifi className="h-4 w-4 animate-pulse" />}

        <span className="font-medium">
          {!isOnline && 'You are offline'}
          {isReconnecting && 'Reconnecting...'}
        </span>

        {!isOnline && (
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">
              Limited functionality available
            </span>
          </div>
        )}

        {showConnectionType && connectionType && isOnline && (
          <span className="text-xs opacity-75">
            ({connectionType})
          </span>
        )}
      </div>
    </div>
  )
}