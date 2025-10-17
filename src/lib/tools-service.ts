import { Tool, ToolCategory, ToolStatus } from '@/types'
import { seedTools, categoryMetadata } from './seed-data'
import { isToolAvailable, generateAvailabilityCalendar, getNextAvailableDate, calculatePricing } from './availability'

export interface ToolFilters {
  category?: ToolCategory
  minPrice?: number
  maxPrice?: number
  availableDate?: string
  search?: string
  location?: string
  status?: ToolStatus
}

export interface ToolSearchResult {
  tools: Tool[]
  total: number
  categories: Record<ToolCategory, number>
  priceRange: { min: number; max: number }
}

/**
 * Search and filter tools
 */
export function searchTools(
  filters: ToolFilters = {},
  limit: number = 50,
  offset: number = 0
): ToolSearchResult {
  let filteredTools = [...seedTools]

  // Apply filters
  if (filters.category) {
    filteredTools = filteredTools.filter(tool => tool.category === filters.category)
  }

  if (filters.status) {
    filteredTools = filteredTools.filter(tool => tool.status === filters.status)
  }

  if (filters.minPrice !== undefined) {
    filteredTools = filteredTools.filter(tool => tool.dailyRate >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filteredTools = filteredTools.filter(tool => tool.dailyRate <= filters.maxPrice!)
  }

  if (filters.location) {
    filteredTools = filteredTools.filter(tool =>
      tool.location.toLowerCase().includes(filters.location!.toLowerCase())
    )
  }

  if (filters.availableDate) {
    const requestedDate = new Date(filters.availableDate)
    filteredTools = filteredTools.filter(tool =>
      isToolAvailable(tool.id, requestedDate, requestedDate)
    )
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()

    // Define synonyms and related terms
    const synonymMap: Record<string, string[]> = {
      'power washer': ['pressure washer', 'high pressure washer', 'power wash'],
      'pressure washer': ['power washer', 'high pressure cleaner', 'pressure wash'],
      'carpet cleaner': ['rug cleaner', 'carpet cleaning machine', 'carpet shampooer'],
      'rug cleaner': ['carpet cleaner', 'upholstery cleaner'],
      'paint sprayer': ['paint gun', 'spray gun', 'airless sprayer'],
      'spray gun': ['paint sprayer', 'paint gun'],
      'lawn mower': ['grass cutter', 'mower', 'grass mower'],
      'grass cutter': ['lawn mower', 'mower'],
      'hedge trimmer': ['hedge cutter', 'shrub trimmer'],
      'leaf blower': ['blower', 'garden blower'],
      'chainsaw': ['chain saw', 'tree saw'],
      'edger': ['lawn edger', 'edge trimmer'],
      'tiller': ['cultivator', 'rototiller', 'garden tiller'],
      'compressor': ['air compressor', 'pneumatic compressor'],
      'generator': ['portable generator', 'electric generator'],
      'welder': ['welding machine', 'arc welder'],
      'sander': ['belt sander', 'orbital sander', 'palm sander'],
      'saw': ['circular saw', 'table saw', 'miter saw'],
      'drill': ['power drill', 'electric drill', 'cordless drill']
    }

    // Get all related terms for the search query
    const getRelatedTerms = (query: string): string[] => {
      const terms = [query]

      // Check direct matches
      if (synonymMap[query]) {
        terms.push(...synonymMap[query])
      }

      // Check if query is a synonym of any key
      for (const [key, synonyms] of Object.entries(synonymMap)) {
        if (synonyms.includes(query)) {
          terms.push(key, ...synonyms)
        }
      }

      // Add partial word matches
      const words = query.split(' ')
      for (const word of words) {
        if (word.length > 3) { // Only for words longer than 3 characters
          for (const [key, synonyms] of Object.entries(synonymMap)) {
            if (key.includes(word) || synonyms.some(s => s.includes(word))) {
              terms.push(key, ...synonyms)
            }
          }
        }
      }

      return [...new Set(terms)] // Remove duplicates
    }

    const searchTerms = getRelatedTerms(searchLower)

    filteredTools = filteredTools.filter(tool => {
      const searchableText = [
        tool.name,
        tool.description,
        tool.brand || '',
        tool.category,
        ...(tool.tags || [])
      ].join(' ').toLowerCase()

      // Check if any search term matches
      return searchTerms.some(term =>
        searchableText.includes(term) ||
        // Also check individual words for partial matches
        term.split(' ').some(word =>
          word.length > 2 && searchableText.includes(word)
        )
      )
    })
  }

  // Calculate category counts
  const categories = Object.values(ToolCategory).reduce((acc, category) => {
    acc[category] = filteredTools.filter(tool => tool.category === category).length
    return acc
  }, {} as Record<ToolCategory, number>)

  // Calculate price range
  const prices = filteredTools.map(tool => tool.dailyRate)
  const priceRange = {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 0
  }

  // Apply pagination
  const paginatedTools = filteredTools.slice(offset, offset + limit)

  return {
    tools: paginatedTools,
    total: filteredTools.length,
    categories,
    priceRange
  }
}

/**
 * Get tool by ID
 */
export function getToolById(id: string): Tool | null {
  return seedTools.find(tool => tool.id === id) || null
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): Tool | null {
  return seedTools.find(tool => tool.slug === slug) || null
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolCategory, limit: number = 10): Tool[] {
  return seedTools
    .filter(tool => tool.category === category)
    .slice(0, limit)
}

/**
 * Get featured tools
 */
export function getFeaturedTools(limit: number = 6): Tool[] {
  // Return tools with highest ratings or most popular (for now, return available tools)
  return seedTools
    .filter(tool => tool.status === ToolStatus.AVAILABLE)
    .slice(0, limit)
}

/**
 * Get tool availability
 */
export function getToolAvailability(toolId: string, daysToGenerate: number = 30) {
  return generateAvailabilityCalendar(toolId, new Date(), daysToGenerate)
}

/**
 * Calculate tool pricing for date range
 */
export function getToolPricing(toolId: string, startDate: Date, endDate: Date) {
  const tool = getToolById(toolId)
  if (!tool) {
    throw new Error('Tool not found')
  }

  return calculatePricing(
    tool.dailyRate,
    tool.weeklyRate,
    tool.monthlyRate,
    tool.deposit,
    startDate,
    endDate
  )
}

/**
 * Get tool suggestions based on category
 */
export function getToolSuggestions(toolId: string, limit: number = 4): Tool[] {
  const currentTool = getToolById(toolId)
  if (!currentTool) {
    return []
  }

  return seedTools
    .filter(tool =>
      tool.id !== toolId &&
      tool.category === currentTool.category &&
      tool.status === ToolStatus.AVAILABLE
    )
    .slice(0, limit)
}

/**
 * Get category information
 */
export function getCategoryInfo(category: ToolCategory) {
  return categoryMetadata[category]
}

/**
 * Get all categories with tool counts
 */
export function getAllCategories() {
  return Object.entries(categoryMetadata).map(([key, value]) => ({
    category: key as ToolCategory,
    ...value
  }))
}

/**
 * Check tool availability for specific dates
 */
export function checkToolAvailability(
  toolId: string,
  startDate: Date,
  endDate: Date
): {
  available: boolean
  nextAvailable: Date | null
  conflicts: Array<{ date: string; reason: string }>
} {
  const available = isToolAvailable(toolId, startDate, endDate)
  const nextAvailable = available ? null : getNextAvailableDate(toolId)

  // Get specific conflicts (simplified for now)
  const conflicts: Array<{ date: string; reason: string }> = []

  return {
    available,
    nextAvailable,
    conflicts
  }
}

/**
 * Get tools by location
 */
export function getToolsByLocation(location: string, limit: number = 10): Tool[] {
  return seedTools
    .filter(tool => tool.location.toLowerCase().includes(location.toLowerCase()))
    .slice(0, limit)
}

/**
 * Get popular tools (most frequently rented)
 */
export function getPopularTools(limit: number = 8): Tool[] {
  // For now, return available tools shuffled
  const availableTools = seedTools.filter(tool => tool.status === ToolStatus.AVAILABLE)
  return availableTools
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

/**
 * Get tools requiring training
 */
export function getToolsRequiringTraining(): Tool[] {
  return seedTools.filter(tool => tool.trainingRequired)
}

/**
 * Get tools by price range
 */
export function getToolsByPriceRange(minPrice: number, maxPrice: number): Tool[] {
  return seedTools.filter(tool =>
    tool.dailyRate >= minPrice && tool.dailyRate <= maxPrice
  )
}

/**
 * Get all tools (for admin)
 */
export async function getAllTools(): Promise<Tool[]> {
  try {
    const response = await fetch('/api/tools')
    if (!response.ok) {
      throw new Error('Failed to fetch tools')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching tools:', error)
    // Fallback to seed data
    return seedTools
  }
}

/**
 * Get tool statistics
 */
export function getToolStatistics() {
  const totalTools = seedTools.length
  const availableTools = seedTools.filter(tool => tool.status === ToolStatus.AVAILABLE).length
  const rentedTools = seedTools.filter(tool => tool.status === ToolStatus.RENTED).length
  const maintenanceTools = seedTools.filter(tool => tool.status === ToolStatus.MAINTENANCE).length

  const averagePrice = seedTools.reduce((sum, tool) => sum + tool.dailyRate, 0) / totalTools
  const priceRange = {
    min: Math.min(...seedTools.map(tool => tool.dailyRate)),
    max: Math.max(...seedTools.map(tool => tool.dailyRate))
  }

  return {
    totalTools,
    availableTools,
    rentedTools,
    maintenanceTools,
    averagePrice,
    priceRange,
    categories: getAllCategories()
  }
}