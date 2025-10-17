'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ToolGrid } from '@/components/tools/tool-grid'
import { SearchBar } from '@/components/tools/search-bar'
import { FilterPanel, type FilterOptions } from '@/components/tools/filter-panel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SlidersHorizontal } from 'lucide-react'
import { searchTools, getAllCategories } from '@/lib/tools-service'
import type { Tool, ToolCategory } from '@/types'

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({})
  const [showFilters, setShowFilters] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  // Initialize search query and filters from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    const urlCategory = searchParams.get('category')

    if (urlSearch) {
      setSearchQuery(urlSearch)
    }

    if (urlCategory) {
      setFilters(prev => ({ ...prev, category: urlCategory as ToolCategory }))
    }
  }, [searchParams])

  // Load tools data
  useEffect(() => {
    setLoading(true)

    // Simulate API delay
    const timer = setTimeout(() => {
      const result = searchTools({
        search: searchQuery,
        ...filters
      })

      setTools(result.tools)
      setTotalResults(result.total)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, filters])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const clearAllFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  const categories = getAllCategories()
  const activeFilterCount = Object.keys(filters).filter(
    key => filters[key as keyof FilterOptions] !== undefined
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/wen-electric-dethatcher-scarifier-020-67f012ba42d66.avif"
            alt="Professional lawn care tools and equipment"
            fill
            className="object-cover opacity-30"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-grid-pattern"></div>
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Browse Professional Tools</h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Discover high-quality tools for every project. From pressure washers to power tools, find what you need.
            </p>

            {/* Prominent Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by tool name, project, or category..."
                className="h-14 text-lg shadow-lg [&>div>input]:bg-white/95 [&>div>input]:text-gray-900 [&>div>input]:placeholder:text-gray-500 [&>div>input]:border-white/30"
                autoFocus={false}
              />
            </div>

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {categories.slice(0, 4).map((category) => (
                <Button
                  key={category.category}
                  variant={filters.category === category.category ? "default" : "outline"}
                  onClick={() => handleFiltersChange({
                    ...filters,
                    category: filters.category === category.category ? undefined : category.category
                  })}
                  className={`rounded-full px-6 py-2 font-medium transition-all duration-200 ${
                    filters.category === category.category
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:from-cyan-600 hover:to-blue-700"
                      : "bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                  }`}
                >
                  {category.name}
                  <Badge
                    variant="secondary"
                    className={`ml-2 text-xs ${
                      filters.category === category.category
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white/15 text-white/90 border-white/25"
                    }`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-fit gap-2 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <div className="flex-1 flex justify-between items-center">
            <div className="text-sm text-slate-600">
              {loading ? (
                'Loading...'
              ) : (
                `${totalResults} tool${totalResults !== 1 ? 's' : ''} found`
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(activeFilterCount > 0 || searchQuery) && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Active Filters:</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
                Clear All
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {searchQuery && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {filters.category && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Category: {categories.find(c => c.category === filters.category)?.name}
                </Badge>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Price: ${filters.minPrice || 0} - ${filters.maxPrice || '∞'}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories Card */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-900">Shop by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => handleFiltersChange({
                      ...filters,
                      category: filters.category === category.category ? undefined : category.category
                    })}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      filters.category === category.category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge
                        variant={filters.category === category.category ? "secondary" : "outline"}
                        className={filters.category === category.category ? "bg-white/20 text-white border-white/30" : ""}
                      >
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={true}
                onToggle={() => setShowFilters(false)}
                className="shadow-lg border-0"
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tools Grid */}
            <ToolGrid
              tools={tools}
              loading={loading}
              emptyMessage={
                searchQuery || activeFilterCount > 0
                  ? "No tools match your search criteria. Try adjusting your filters or search terms."
                  : "No tools available at the moment. Please check back later."
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}