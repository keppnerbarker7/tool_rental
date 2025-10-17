'use client'

import { ToolCard } from './tool-card'
import type { Tool } from '@/types'

interface ToolGridProps {
  tools: Tool[]
  loading?: boolean
  compact?: boolean
  emptyMessage?: string
}

export function ToolGrid({
  tools,
  loading = false,
  compact = false,
  emptyMessage = "No tools found matching your criteria."
}: ToolGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ToolCardSkeleton key={i} compact={compact} />
        ))}
      </div>
    )
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No Tools Found</h3>
        <p className="text-muted-foreground max-w-sm">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          compact={compact}
        />
      ))}
    </div>
  )
}

function ToolCardSkeleton({ compact }: { compact: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className={`${compact ? 'h-32' : 'h-48'} bg-muted animate-pulse`} />

      <div className={compact ? 'p-3' : 'p-4'}>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
          </div>

          <div className="flex justify-between">
            <div className="h-4 bg-muted rounded w-20 animate-pulse" />
            <div className="h-4 bg-muted rounded w-16 animate-pulse" />
          </div>

          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </div>

      <div className={`${compact ? 'p-3 pt-0' : 'p-4 pt-0'}`}>
        <div className="flex gap-2">
          <div className="h-8 bg-muted rounded flex-1 animate-pulse" />
          <div className="h-8 bg-muted rounded flex-1 animate-pulse" />
        </div>
      </div>
    </div>
  )
}