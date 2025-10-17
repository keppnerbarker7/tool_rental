import { Suspense } from 'react'
import { ToolsPageClient } from '@/components/tools/tools-page-client'

interface ToolsPageProps {
  searchParams: {
    search?: string
    category?: string
    minPrice?: string
    maxPrice?: string
  }
}

// Prevent static generation for this search params-dependent page
export const dynamic = 'force-dynamic'

export default function ToolsPage({ searchParams }: ToolsPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ToolsPageClient searchParams={searchParams} />
    </Suspense>
  )
}