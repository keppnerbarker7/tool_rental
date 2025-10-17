'use client'

import { BackgroundSync } from './background-sync'

export interface FetchOptions extends RequestInit {
  enableBackgroundSync?: boolean
  maxRetries?: number
  timeout?: number
}

export interface FetchResponse<T = any> {
  data?: T
  error?: string
  status: number
  fromCache?: boolean
  queued?: boolean
}

export class EnhancedFetch {
  private static readonly DEFAULT_TIMEOUT = 10000 // 10 seconds
  private backgroundSync = BackgroundSync.getInstance()

  async request<T = any>(
    url: string,
    options: FetchOptions = {}
  ): Promise<FetchResponse<T>> {
    const {
      enableBackgroundSync = false,
      maxRetries = 3,
      timeout = EnhancedFetch.DEFAULT_TIMEOUT,
      ...fetchOptions
    } = options

    // Check if we're offline
    if (!navigator.onLine) {
      return this.handleOfflineRequest<T>(url, options)
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (enableBackgroundSync && this.shouldQueue(response.status)) {
          await this.backgroundSync.queueRequest(url, fetchOptions, maxRetries)
          return {
            status: response.status,
            error: `Request queued for background sync: ${response.statusText}`,
            queued: true,
          }
        }

        return {
          status: response.status,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof Error) {
        // Network error or timeout
        if (enableBackgroundSync) {
          await this.backgroundSync.queueRequest(url, fetchOptions, maxRetries)
          return {
            status: 0,
            error: 'Request queued for background sync: Network error',
            queued: true,
          }
        }

        return {
          status: 0,
          error: error.message,
        }
      }

      return {
        status: 0,
        error: 'Unknown error occurred',
      }
    }
  }

  private async handleOfflineRequest<T>(
    url: string,
    options: FetchOptions
  ): Promise<FetchResponse<T>> {
    // Try to get from cache first
    try {
      const cachedResponse = await this.getCachedResponse<T>(url)
      if (cachedResponse) {
        return {
          ...cachedResponse,
          fromCache: true,
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cached response:', error)
    }

    // Queue for background sync if enabled
    if (options.enableBackgroundSync) {
      await this.backgroundSync.queueRequest(url, options, options.maxRetries)
      return {
        status: 0,
        error: 'Offline: Request queued for when connection is restored',
        queued: true,
      }
    }

    return {
      status: 0,
      error: 'Offline: No cached data available',
    }
  }

  private async getCachedResponse<T>(url: string): Promise<FetchResponse<T> | null> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return null
    }

    try {
      const cache = await caches.open('tools-api')
      const cachedResponse = await cache.match(url)

      if (cachedResponse) {
        const data = await cachedResponse.json()
        return {
          data,
          status: cachedResponse.status,
          fromCache: true,
        }
      }
    } catch (error) {
      console.warn('Cache access failed:', error)
    }

    return null
  }

  private shouldQueue(status: number): boolean {
    // Queue for background sync on network errors or server errors
    return status >= 500 || status === 0
  }

  // Convenience methods
  async get<T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  async post<T = any>(url: string, data?: any, options: FetchOptions = {}): Promise<FetchResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T = any>(url: string, data?: any, options: FetchOptions = {}): Promise<FetchResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }
}

// Singleton instance
export const enhancedFetch = new EnhancedFetch()

// Hook for using enhanced fetch in React components
export function useEnhancedFetch() {
  return enhancedFetch
}