'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  AlertTriangle,
  DollarSign,
  Calendar,
  Wrench
} from 'lucide-react'
import { getToolBySlug, getToolSuggestions } from '@/lib/tools-service'
import { ToolCard } from '@/components/tools/tool-card'
import { AvailabilityCalendar } from '@/components/tools/availability-calendar'
import type { Tool } from '@/types'

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const [tool, setTool] = useState<Tool | null>(null)
  const [suggestions, setSuggestions] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [currentPricing, setCurrentPricing] = useState<any>(null)
  useEffect(() => {
    params.then((resolvedParams) => {
      const foundTool = getToolBySlug(resolvedParams.slug)
      if (!foundTool) {
        setLoading(false)
        return
      }

      setTool(foundTool)
      setSuggestions(getToolSuggestions(foundTool.id))
      setLoading(false)
    })
  }, [params])

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tool) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
      case 'rented':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
      case 'maintenance':
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleDateSelection = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }

  const handlePricingUpdate = (pricing: any) => {
    setCurrentPricing(pricing)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Breadcrumb */}
      <div className="container px-4 pt-6">
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
          <Link href="/tools" className="hover:text-slate-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{tool.name}</span>
        </div>
      </div>

      <div className="container px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-slate-200">
              {tool.images && tool.images.length > 0 ? (
                <Image
                  src={tool.images[currentImageIndex] || '/images/placeholder-tool.jpg'}
                  alt={tool.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <Wrench className="h-32 w-32 text-slate-400" />
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {tool.images && tool.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {tool.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${tool.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tool Information */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                <Badge className={`${getStatusColor(tool.status)} px-4 py-2 text-sm font-medium`}>
                  {tool.status}
                </Badge>
                {tool.trainingRequired && (
                  <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50 px-4 py-2">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Training Required
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-slate-900 leading-tight">{tool.name}</h1>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 text-lg">
                <span className="font-medium">{tool.brand}</span>
                {tool.model && (
                  <>
                    <span className="text-slate-400">•</span>
                    <span>{tool.model}</span>
                  </>
                )}
              </div>
            </div>

            {/* Pricing */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-blue-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-slate-700 font-medium">Daily Rate</span>
                  <span className="font-bold text-2xl text-blue-900">{formatCurrency(tool.dailyRate)}</span>
                </div>
                {tool.weeklyRate && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Weekly Rate <span className="text-green-600 text-sm font-medium">(Save 15%)</span></span>
                    <span className="font-semibold text-lg text-slate-800">{formatCurrency(tool.weeklyRate)}</span>
                  </div>
                )}
                <div className="border-t border-blue-100 pt-4 space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-amber-800 font-medium">Security Deposit</span>
                      <span className="font-semibold text-lg text-amber-700">{formatCurrency(tool.deposit)}</span>
                    </div>
                    <div className="text-xs text-amber-600">
                      Refundable deposit • Held temporarily during rental
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Replacement Cost</span>
                    <span className="text-slate-600">{formatCurrency(tool.replacementCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md border-0 ring-1 ring-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-semibold text-slate-800">Location</span>
                  </div>
                  <p className="text-slate-600 ml-11">{tool.location}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md border-0 ring-1 ring-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-semibold text-slate-800">Condition</span>
                  </div>
                  <p className="text-slate-600 ml-11">{tool.condition}</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Action Section */}
            <div className="pt-6 space-y-4">
              {selectedStartDate && selectedEndDate && currentPricing ? (
                <div className="space-y-4">
                  {/* Selection Summary */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-green-800">
                          {selectedStartDate.toLocaleDateString()} - {selectedEndDate.toLocaleDateString()}
                        </div>
                        <div className="text-sm text-green-600">
                          {currentPricing.days} day{currentPricing.days !== 1 ? 's' : ''} • Rental: {formatCurrency(currentPricing.total - currentPricing.deposit)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-800">Ready to Reserve!</div>
                      </div>
                    </div>
                  </div>

                  {/* Large Reserve Button */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full h-20 text-2xl font-bold shadow-2xl bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 transform hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        const checkoutParams = new URLSearchParams({
                          toolId: tool.id,
                          toolName: tool.name,
                          startDate: selectedStartDate.toISOString(),
                          endDate: selectedEndDate.toISOString(),
                          days: currentPricing.days.toString(),
                          subtotal: currentPricing.subtotal.toString(),
                          taxes: currentPricing.taxes.toString(),
                          rentalTotal: currentPricing.rentalTotal.toString(),
                          deposit: currentPricing.deposit.toString(),
                          location: tool.location
                        })
                        window.location.href = `/checkout?${checkoutParams.toString()}`
                      }}
                    >
                      <DollarSign className="h-8 w-8 mr-4" />
                      Reserve Now - {formatCurrency(currentPricing.total - currentPricing.deposit)}
                    </Button>
                    <div className="text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      + {formatCurrency(currentPricing.deposit)} refundable deposit (held temporarily)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-1">Ready to Get Started?</div>
                    <div className="text-sm text-blue-600">Select your rental dates below to see pricing and reserve instantly</div>
                  </div>

                  <Button
                    size="lg"
                    className={`w-full h-16 text-xl font-semibold shadow-xl transition-all duration-200 ${
                      tool.status === 'AVAILABLE'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105'
                        : 'bg-slate-400'
                    }`}
                    disabled={tool.status !== 'AVAILABLE'}
                    onClick={() => {
                      document.querySelector('#availability-calendar')?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                  >
                    <Calendar className="h-6 w-6 mr-3" />
                    {tool.status === 'AVAILABLE' ? 'Select Dates to Reserve' : 'Currently Unavailable'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Availability Calendar & Pricing */}
        <div id="availability-calendar" className="mb-16">
          <AvailabilityCalendar
            toolId={tool.id}
            dailyRate={tool.dailyRate}
            weeklyRate={tool.weeklyRate}
            deposit={tool.deposit}
            onDateSelect={handleDateSelection}
            onPriceUpdate={handlePricingUpdate}
          />
        </div>

        {/* Description */}
        <Card className="mb-12 bg-white shadow-lg border-0 ring-1 ring-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-slate-900">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed text-lg">{tool.description}</p>
          </CardContent>
        </Card>

        {/* Specifications */}
        {tool.specifications && Object.keys(tool.specifications).length > 0 && (
          <Card className="mb-12 bg-white shadow-lg border-0 ring-1 ring-slate-200">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-slate-900">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(tool.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-2 p-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-800 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Policies & Guidelines */}
        {tool.policies && tool.policies.length > 0 && (
          <Card className="mb-12 bg-white shadow-lg border-0 ring-1 ring-slate-200">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                Rental Policies & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {tool.policies.map((policy, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 leading-relaxed">{policy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Training Requirements */}
        {tool.trainingRequired && (
          <Card className="mb-12 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-800">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                Safety Training Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 mb-6 leading-relaxed text-lg">
                This tool requires safety training before use. Training covers proper operation,
                safety procedures, and maintenance guidelines.
              </p>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 shadow-lg"
                size="lg"
              >
                Schedule Training Session
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Similar Tools */}
        {suggestions.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Similar Tools You Might Like</h2>
              <p className="text-slate-600 text-lg">Explore more tools in the same category</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestions.map((suggestion) => (
                <ToolCard key={suggestion.id} tool={suggestion} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}