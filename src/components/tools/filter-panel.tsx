'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Filter, X, Calendar } from 'lucide-react'
import { ToolCategory } from '@/types'

export interface FilterOptions {
  category?: ToolCategory
  minPrice?: number
  maxPrice?: number
  availableDate?: string
  location?: string
}

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

const categoryLabels: Record<ToolCategory, string> = {
  [ToolCategory.PRESSURE_WASHERS]: 'Pressure Washers',
  [ToolCategory.CARPET_CLEANERS]: 'Carpet Cleaners',
  [ToolCategory.LAWN_GARDEN]: 'Lawn & Garden',
  [ToolCategory.POWER_TOOLS]: 'Power Tools',
}

export function FilterPanel({
  filters,
  onFiltersChange,
  isOpen = true,
  onToggle,
  className
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...localFilters }
    delete newFilters[key]
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    setLocalFilters({})
    onFiltersChange({})
  }

  const activeFilterCount = Object.keys(localFilters).filter(
    key => localFilters[key as keyof FilterOptions] !== undefined
  ).length

  if (!isOpen) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" onClick={onToggle} className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {localFilters.category && (
              <Badge variant="outline" className="gap-1">
                {categoryLabels[localFilters.category]}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter('category')}
                />
              </Badge>
            )}

            {(localFilters.minPrice || localFilters.maxPrice) && (
              <Badge variant="outline" className="gap-1">
                ${localFilters.minPrice || 0} - ${localFilters.maxPrice || '∞'}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    clearFilter('minPrice')
                    clearFilter('maxPrice')
                  }}
                />
              </Badge>
            )}

            {localFilters.availableDate && (
              <Badge variant="outline" className="gap-1">
                Available: {new Date(localFilters.availableDate).toLocaleDateString()}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter('availableDate')}
                />
              </Badge>
            )}

            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          {onToggle && (
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={localFilters.category}
            onValueChange={(value) => updateFilter('category', value as ToolCategory)}
            placeholder="All categories"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range (per day)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min $"
              value={localFilters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              step={5}
            />
            <Input
              type="number"
              placeholder="Max $"
              value={localFilters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              step={5}
            />
          </div>
        </div>

        {/* Available Date Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Available Date
          </label>
          <Input
            type="date"
            value={localFilters.availableDate || ''}
            onChange={(e) => updateFilter('availableDate', e.target.value || undefined)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  )
}