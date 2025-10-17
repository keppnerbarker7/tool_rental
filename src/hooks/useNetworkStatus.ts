'use client'

import { useState, useEffect } from 'react'

export interface NetworkStatus {
  isOnline: boolean
  isReconnecting: boolean
  connectionType?: string
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false)
  const [connectionType, setConnectionType] = useState<string>()

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    // Get connection type if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      setConnectionType(connection?.effectiveType || connection?.type)
    }

    const handleOnline = () => {
      setIsReconnecting(true)
      setIsOnline(true)

      // Reset reconnecting state after a short delay
      setTimeout(() => {
        setIsReconnecting(false)
      }, 2000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setIsReconnecting(false)
    }

    const handleConnectionChange = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        setConnectionType(connection?.effectiveType || connection?.type)
      }
    }

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Add connection change listener if supported
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', handleConnectionChange)
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)

      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  return {
    isOnline,
    isReconnecting,
    connectionType,
  }
}