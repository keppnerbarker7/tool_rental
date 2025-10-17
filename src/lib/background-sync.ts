'use client'

export interface QueuedRequest {
  id: string
  url: string
  method: string
  headers: Record<string, string>
  body?: string
  timestamp: number
  retryCount: number
  maxRetries: number
}

export class BackgroundSync {
  private static instance: BackgroundSync
  private queue: QueuedRequest[] = []
  private readonly STORAGE_KEY = 'bg-sync-queue'
  private readonly MAX_RETRIES = 3
  private readonly RETRY_DELAY = 1000 // 1 second

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadQueue()
      this.setupEventListeners()
    }
  }

  static getInstance(): BackgroundSync {
    if (!BackgroundSync.instance) {
      BackgroundSync.instance = new BackgroundSync()
    }
    return BackgroundSync.instance
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.processQueue()
    })

    // Process queue on page load if online
    if (navigator.onLine) {
      setTimeout(() => this.processQueue(), 100)
    }
  }

  private loadQueue() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        this.queue = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load background sync queue:', error)
      this.queue = []
    }
  }

  private saveQueue() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.queue))
    } catch (error) {
      console.error('Failed to save background sync queue:', error)
    }
  }

  async queueRequest(
    url: string,
    options: RequestInit = {},
    maxRetries: number = this.MAX_RETRIES
  ): Promise<void> {
    const queuedRequest: QueuedRequest = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url,
      method: options.method || 'GET',
      headers: (options.headers as Record<string, string>) || {},
      body: options.body as string,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries,
    }

    this.queue.push(queuedRequest)
    this.saveQueue()

    // If online, try to process immediately
    if (navigator.onLine) {
      this.processQueue()
    }
  }

  async processQueue(): Promise<void> {
    if (!navigator.onLine || this.queue.length === 0) {
      return
    }

    const failedRequests: QueuedRequest[] = []

    for (const request of this.queue) {
      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body,
        })

        if (response.ok) {
          console.log(`Background sync: Successfully processed ${request.url}`)
          this.broadcastSuccess(request)
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        console.error(`Background sync failed for ${request.url}:`, error)

        request.retryCount++

        if (request.retryCount < request.maxRetries) {
          // Add delay before retry
          setTimeout(() => {
            failedRequests.push(request)
          }, this.RETRY_DELAY * request.retryCount)
        } else {
          console.error(`Background sync: Max retries exceeded for ${request.url}`)
          this.broadcastFailure(request, error as Error)
        }
      }
    }

    // Update queue with failed requests that still have retries left
    this.queue = failedRequests
    this.saveQueue()
  }

  private broadcastSuccess(request: QueuedRequest) {
    window.dispatchEvent(
      new CustomEvent('bg-sync-success', {
        detail: { request, type: 'reservation' },
      })
    )
  }

  private broadcastFailure(request: QueuedRequest, error: Error) {
    window.dispatchEvent(
      new CustomEvent('bg-sync-failure', {
        detail: { request, error, type: 'reservation' },
      })
    )
  }

  getQueueLength(): number {
    return this.queue.length
  }

  clearQueue(): void {
    this.queue = []
    this.saveQueue()
  }

  getQueuedRequests(): QueuedRequest[] {
    return [...this.queue]
  }
}

// Hook for using background sync in React components
export function useBackgroundSync() {
  const sync = BackgroundSync.getInstance()

  const queueRequest = async (
    url: string,
    options: RequestInit = {},
    maxRetries?: number
  ) => {
    return sync.queueRequest(url, options, maxRetries)
  }

  return {
    queueRequest,
    processQueue: () => sync.processQueue(),
    getQueueLength: () => sync.getQueueLength(),
    clearQueue: () => sync.clearQueue(),
    getQueuedRequests: () => sync.getQueuedRequests(),
  }
}