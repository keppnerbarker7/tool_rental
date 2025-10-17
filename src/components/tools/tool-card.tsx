'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, DollarSign, Star, ArrowRight, Zap, Droplets, Wind, Leaf, Wrench } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Tool, ToolStatus, ToolCategory } from '@/types'

interface ToolCardProps {
  tool: Tool
  compact?: boolean
  showLocation?: boolean
}

const statusVariants: Record<ToolStatus, { gradient: string; label: string; icon: any }> = {
  AVAILABLE: { gradient: 'from-green-500 to-emerald-500', label: 'Available', icon: Zap },
  RENTED: { gradient: 'from-yellow-500 to-orange-500', label: 'Rented', icon: Calendar },
  MAINTENANCE: { gradient: 'from-red-500 to-pink-500', label: 'Maintenance', icon: Star },
  RETIRED: { gradient: 'from-gray-500 to-slate-500', label: 'Retired', icon: Star },
}

const categoryIcons: Record<ToolCategory, any> = {
  PRESSURE_WASHERS: Droplets,
  CARPET_CLEANERS: Wind,
  LAWN_GARDEN: Leaf,
  POWER_TOOLS: Wrench,
}

const categoryLabels: Record<ToolCategory, string> = {
  PRESSURE_WASHERS: 'Pressure Washers',
  CARPET_CLEANERS: 'Carpet Cleaners',
  LAWN_GARDEN: 'Lawn & Garden',
  POWER_TOOLS: 'Power Tools',
}

export function ToolCard({ tool, compact = false, showLocation = true }: ToolCardProps) {
  const statusConfig = statusVariants[tool.status]
  const CategoryIcon = categoryIcons[tool.category]
  const categoryLabel = categoryLabels[tool.category]
  const primaryImage = tool.images[0] || '/placeholder-tool.jpg'

  // Mock next available date (would come from availability API)
  const nextAvailable = new Date()
  nextAvailable.setDate(nextAvailable.getDate() + (tool.status === 'AVAILABLE' ? 0 : 3))

  return (
    <Card className="modern-card group cursor-pointer relative overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
      <Link href={`/tools/${tool.slug}`}>
        <div className="relative">
          {/* Modern Image Container */}
          <div className={`relative ${compact ? 'h-40' : 'h-56'} overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}>
            <Image
              src={primaryImage}
              alt={tool.name}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Modern Status Badge */}
          <div className="absolute top-3 right-3">
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${statusConfig.gradient} text-white px-3 py-2 rounded-full font-semibold shadow-lg text-sm`}>
              <statusConfig.icon className="h-4 w-4" />
              {statusConfig.label}
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2">
              <CategoryIcon className="h-4 w-4 text-cyan-600" />
              <span className="text-sm">{categoryLabel}</span>
            </div>
          </div>

        </div>

        {/* Modern Content */}
        <CardContent className={`${compact ? 'p-6' : 'p-8'} flex-1 flex flex-col`}>
          <div className="flex-1 space-y-6">
            {/* Tool Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CategoryIcon className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{categoryLabel}</span>
              </div>
              <h3 className={`font-black text-gray-900 leading-tight ${compact ? 'text-2xl' : 'text-3xl'} group-hover:text-cyan-600 transition-colors duration-300 mb-1`}>
                {tool.name}
              </h3>
              {tool.brand && (
                <p className="text-sm text-gray-600 font-medium">{tool.brand}</p>
              )}
            </div>

            {/* Meta Information */}
            <div className="space-y-2">
              {showLocation && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                  {tool.location}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  {tool.status === 'AVAILABLE' ? 'Available now' : `Next: ${nextAvailable.toLocaleDateString()}`}
                </div>
                {tool.status === 'AVAILABLE' && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-medium">
                    Ready today
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Simplified Pricing - Always at bottom */}
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 border border-cyan-100 mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-1">
                <DollarSign className="h-6 w-6 text-cyan-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(tool.dailyRate)}
                </span>
                <span className="text-lg text-gray-600 font-medium">/day</span>
              </div>
              {tool.deposit > 0 && (
                <span className="text-sm text-orange-600 font-semibold">
                  +{formatCurrency(tool.deposit)} deposit
                </span>
              )}
            </div>
            {tool.weeklyRate && (
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{formatCurrency(tool.weeklyRate)}/week</span>
                <span className="text-green-700 ml-2 font-medium">(Save 15%)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>

        {/* Modern Action Button */}
        <CardFooter className={`${compact ? 'p-6 pt-0' : 'p-8 pt-0'}`}>
          <Button
            asChild
            className={`w-full ${compact ? 'h-12' : 'h-16'} font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
              tool.status === 'AVAILABLE'
                ? 'modern-button modern-button-primary'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={tool.status !== 'AVAILABLE'}
          >
            <Link href={`/tools/${tool.slug}`}>
              <div className="flex items-center justify-center gap-2">
                {tool.status === 'AVAILABLE' ? (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Reserve Now</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                ) : tool.status === 'RENTED' ? (
                  <>
                    <Calendar className="h-4 w-4" />
                    <span>Join Waitlist</span>
                  </>
                ) : (
                  <span>View Details</span>
                )}
              </div>
            </Link>
          </Button>
        </CardFooter>
    </Card>
  )
}