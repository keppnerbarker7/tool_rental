'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ChevronLeft, ChevronRight, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface AvailabilityCalendarProps {
  toolId: string
  dailyRate: number
  weeklyRate?: number
  deposit: number
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void
  onPriceUpdate?: (pricing: PricingCalculation) => void
}

interface PricingCalculation {
  subtotal: number
  taxes: number
  fees: number
  deposit: number
  rentalTotal: number
  total: number
  days: number
  weekendMultiplier: number
  breakdown: {
    dailyRate: number
    weeklyDiscount?: number
    weekendCharge?: number
  }
}

interface CalendarDay {
  date: Date
  available: boolean
  isToday: boolean
  isSelected: boolean
  isInRange: boolean
  isWeekend: boolean
  reason?: string
}

export function AvailabilityCalendar({
  toolId,
  dailyRate,
  weeklyRate,
  deposit,
  onDateSelect,
  onPriceUpdate
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])
  const [pricing, setPricing] = useState<PricingCalculation | null>(null)

  // Mock unavailable dates (in real app, this would come from API)
  useEffect(() => {
    const mockUnavailable = [
      new Date(2024, 11, 15), // Dec 15, 2024
      new Date(2024, 11, 16), // Dec 16, 2024
      new Date(2024, 11, 22), // Dec 22, 2024
      new Date(2025, 0, 3),   // Jan 3, 2025
      new Date(2025, 0, 10),  // Jan 10, 2025
    ]
    setUnavailableDates(mockUnavailable)
  }, [toolId])

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate =>
      date.toDateString() === unavailableDate.toDateString()
    )
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const calculatePricing = (start: Date, end: Date): PricingCalculation => {
    const timeDiff = end.getTime() - start.getTime()
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1 // Include start day

    // Ensure dailyRate is valid
    const validDailyRate = typeof dailyRate === 'number' && !isNaN(dailyRate) ? dailyRate : 0
    const validWeeklyRate = typeof weeklyRate === 'number' && !isNaN(weeklyRate) ? weeklyRate : null
    const validDeposit = typeof deposit === 'number' && !isNaN(deposit) ? deposit : 0

    let subtotal = 0
    let weekendMultiplier = 1
    const breakdown: any = { dailyRate: validDailyRate }

    // Calculate weekend multiplier (1.2x for weekends)
    let weekendDays = 0
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (isWeekend(d)) weekendDays++
    }

    if (weekendDays > 0) {
      weekendMultiplier = 1 + (weekendDays / days) * 0.2
      breakdown.weekendCharge = (validDailyRate * days * 0.2 * weekendDays) / days
    }

    // Apply weekly discounts
    if (validWeeklyRate && days >= 7) {
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      subtotal = (weeks * validWeeklyRate) + (remainingDays * validDailyRate)
      breakdown.weeklyDiscount = (validDailyRate * days) - subtotal
    } else {
      subtotal = validDailyRate * days * weekendMultiplier
    }

    const taxes = subtotal * 0.0825 // 8.25% Utah tax
    const rentalTotal = subtotal + taxes
    const total = rentalTotal + validDeposit

    return {
      subtotal,
      taxes,
      fees: 0, // Removed processing fee
      deposit: validDeposit,
      rentalTotal,
      total,
      days,
      weekendMultiplier,
      breakdown
    }
  }

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const calendarStartDate = new Date(firstDay)
    calendarStartDate.setDate(calendarStartDate.getDate() - firstDay.getDay()) // Start from Sunday

    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const date = new Date(calendarStartDate)
      date.setDate(calendarStartDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isPast = date < today
      const isUnavailable = isDateUnavailable(date)
      const available = isCurrentMonth && !isPast && !isUnavailable

      days.push({
        date,
        available,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: Boolean((startDate && date.toDateString() === startDate.toDateString()) ||
                   (endDate && date.toDateString() === endDate.toDateString())),
        isInRange: Boolean(startDate && endDate && date >= startDate && date <= endDate),
        isWeekend: isWeekend(date),
        reason: isUnavailable ? 'Maintenance' : undefined
      })
    }

    return days
  }

  const handleDateClick = (date: Date, available: boolean) => {
    if (!available) return

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date)
      setEndDate(null)
      setPricing(null)
      onDateSelect?.(date, null)
    } else if (date >= startDate) {
      // Complete selection
      setEndDate(date)
      const newPricing = calculatePricing(startDate, date)
      setPricing(newPricing)
      onDateSelect?.(startDate, date)
      onPriceUpdate?.(newPricing)
    } else {
      // Date is before start, start new selection
      setStartDate(date)
      setEndDate(null)
      setPricing(null)
      onDateSelect?.(date, null)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const clearSelection = () => {
    setStartDate(null)
    setEndDate(null)
    setPricing(null)
    onDateSelect?.(null, null)
    onPriceUpdate?.(null as any)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className="bg-white shadow-lg border-0 ring-1 ring-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          Select Your Rental Dates
        </CardTitle>
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            📅 Click your <strong>start date</strong>, then click your <strong>end date</strong> to see pricing
          </p>
          {!startDate && (
            <p className="text-xs text-blue-600 mt-1">Choose when you want to pick up your tool</p>
          )}
          {startDate && !endDate && (
            <p className="text-xs text-blue-600 mt-1">Now choose when you'll return it</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {generateCalendarDays().map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day.date, day.available)}
              disabled={!day.available}
              className={`
                p-2 text-sm rounded-lg transition-all duration-200 min-h-[40px] flex items-center justify-center font-medium
                ${day.date.getMonth() !== currentMonth.getMonth() ? 'text-slate-300' : ''}
                ${!day.available ? 'cursor-not-allowed opacity-50 bg-slate-100' : 'cursor-pointer'}
                ${day.isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                ${day.isSelected ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg ring-2 ring-blue-300 transform scale-105' : ''}
                ${day.isInRange && !day.isSelected ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold' : ''}
                ${day.available && !day.isSelected && !day.isInRange && !day.isWeekend ? 'hover:bg-slate-100 hover:shadow-md hover:scale-105' : ''}
                ${day.isWeekend && day.available && !day.isSelected && !day.isInRange ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 hover:shadow-md hover:scale-105' : ''}
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span>Date Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-50 border border-orange-200 rounded"></div>
            <span>Weekend (+20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>

        {/* Selected Dates */}
        {startDate && (
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800">
                  {startDate.toLocaleDateString()}
                  {endDate && ` - ${endDate.toLocaleDateString()}`}
                </div>
                {pricing && (
                  <div className="text-sm text-slate-600">
                    {pricing.days} day{pricing.days !== 1 ? 's' : ''}
                    {pricing.weekendMultiplier > 1 && (
                      <span className="text-orange-600 ml-2">
                        (+20% weekend rate)
                      </span>
                    )}
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        {pricing && (
          <div className="space-y-4">
            {/* Rental Cost Card */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                  <DollarSign className="h-5 w-5" />
                  Rental Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Base Rate ({pricing.days} days)</span>
                  <span>{formatCurrency(pricing.breakdown.dailyRate * pricing.days)}</span>
                </div>

                {pricing.breakdown.weekendCharge && (
                  <div className="flex justify-between text-sm">
                    <span>Weekend Surcharge</span>
                    <span>+{formatCurrency(pricing.breakdown.weekendCharge)}</span>
                  </div>
                )}

                {pricing.breakdown.weeklyDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Weekly Discount (Save 15%!)</span>
                    <span>-{formatCurrency(pricing.breakdown.weeklyDiscount)}</span>
                  </div>
                )}

                <div className="border-t border-green-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes (8.25%)</span>
                    <span>{formatCurrency(pricing.taxes)}</span>
                  </div>
                  <div className="border-t border-green-300 pt-2">
                    <div className="flex justify-between font-bold text-xl text-green-800">
                      <span>Rental Total</span>
                      <span>{formatCurrency(pricing.rentalTotal)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-amber-800">Security Deposit</div>
                    <div className="text-xs text-amber-600">Refundable • Held temporarily</div>
                  </div>
                  <div className="font-bold text-lg text-amber-700">{formatCurrency(pricing.deposit)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Prominent Checkout Button */}
            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 shadow-xl">
              <CardContent className="pt-6 pb-6">
                <div className="text-center space-y-3">
                  <div className="text-white">
                    <div className="text-sm opacity-90">Ready to reserve?</div>
                    <div className="text-2xl font-bold">Pay only {formatCurrency(pricing.rentalTotal)}</div>
                    <div className="text-xs opacity-80">Deposit held separately, refunded after return</div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full h-14 bg-white text-green-700 hover:bg-green-50 font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => {
                      if (startDate && endDate) {
                        const checkoutParams = new URLSearchParams({
                          toolId: toolId,
                          toolName: 'Professional Tool', // TODO: Pass actual tool name
                          startDate: startDate.toLocaleDateString(),
                          endDate: endDate.toLocaleDateString(),
                          days: pricing.days.toString(),
                          subtotal: pricing.subtotal.toFixed(2),
                          taxes: pricing.taxes.toFixed(2),
                          rentalTotal: pricing.rentalTotal.toFixed(2),
                          deposit: pricing.deposit.toFixed(2),
                          location: 'Provo Central' // TODO: Pass actual location
                        })
                        window.location.href = `/checkout?${checkoutParams.toString()}`
                      }
                    }}
                  >
                    🔒 Reserve & Pay Now
                  </Button>
                  <div className="text-xs text-white/80">
                    💳 Secure payment • 🔄 Free cancellation within 2 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}