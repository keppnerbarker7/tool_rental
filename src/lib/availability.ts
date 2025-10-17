'use client'

import { addDays, format, isWeekend, parseISO, startOfDay, endOfDay } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

// Utah timezone
const UTAH_TIMEZONE = 'America/Denver'

// Business configuration
export const BUSINESS_CONFIG = {
  PICKUP_HOUR: parseInt(process.env.PICKUP_HOUR || '8'),
  RETURN_HOUR: parseInt(process.env.RETURN_HOUR || '18'),
  WEEKEND_MULTIPLIER: parseFloat(process.env.WEEKEND_MULTIPLIER || '1.2'),
  TAX_RATE: parseFloat(process.env.TAX_RATE || '0.0825'),
  OVERDUE_GRACE_MINUTES: parseInt(process.env.OVERDUE_GRACE_MINUTES || '30')
}

export interface AvailabilityCalendar {
  date: string // YYYY-MM-DD format
  available: boolean
  reason?: string
  price?: number
}

export interface PricingBreakdown {
  baseRate: number
  weekendMultiplier?: number
  subtotal: number
  taxes: number
  fees: number
  deposit: number
  total: number
  totalWithoutDeposit: number
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

// Mock reservations for availability calculation
const mockReservations = [
  {
    toolId: 'cc-002',
    startDate: new Date('2024-10-05'),
    endDate: new Date('2024-10-07'),
    status: 'CONFIRMED'
  },
  {
    toolId: 'lg-002',
    startDate: new Date('2024-10-03'),
    endDate: new Date('2024-10-10'),
    status: 'MAINTENANCE'
  }
]

/**
 * Convert date to Utah timezone
 */
export function toUtahTime(date: Date): Date {
  return toZonedTime(date, UTAH_TIMEZONE)
}

/**
 * Convert Utah time to UTC
 */
export function fromUtahTime(date: Date): Date {
  return fromZonedTime(date, UTAH_TIMEZONE)
}

/**
 * Get pickup and return times in Utah timezone
 */
export function getPickupReturnTimes(date: Date): { pickup: Date; return: Date } {
  const utahDate = toUtahTime(date)

  const pickup = new Date(utahDate)
  pickup.setHours(BUSINESS_CONFIG.PICKUP_HOUR, 0, 0, 0)

  const returnTime = new Date(utahDate)
  returnTime.setHours(BUSINESS_CONFIG.RETURN_HOUR, 0, 0, 0)

  return {
    pickup: fromUtahTime(pickup),
    return: fromUtahTime(returnTime)
  }
}

/**
 * Calculate access code validity window
 */
export function getAccessCodeValidity(startDate: Date, endDate: Date): {
  validFrom: Date
  validTo: Date
} {
  const { pickup } = getPickupReturnTimes(startDate)
  const { return: returnTime } = getPickupReturnTimes(endDate)

  // Access code valid 30 minutes before pickup
  const validFrom = new Date(pickup.getTime() - 30 * 60 * 1000)

  // Access code valid until return time plus grace period
  const validTo = new Date(returnTime.getTime() + BUSINESS_CONFIG.OVERDUE_GRACE_MINUTES * 60 * 1000)

  return { validFrom, validTo }
}

/**
 * Check if a tool is available for given dates
 */
export function isToolAvailable(
  toolId: string,
  startDate: Date,
  endDate: Date,
  excludeReservationId?: string
): boolean {
  const reservations = mockReservations.filter(r =>
    r.toolId === toolId &&
    (excludeReservationId ? r.status !== excludeReservationId : true)
  )

  return !reservations.some(reservation => {
    const resStart = startOfDay(reservation.startDate)
    const resEnd = endOfDay(reservation.endDate)
    const reqStart = startOfDay(startDate)
    const reqEnd = endOfDay(endDate)

    // Check for date overlap
    return reqStart <= resEnd && reqEnd >= resStart
  })
}

/**
 * Generate availability calendar for a tool
 */
export function generateAvailabilityCalendar(
  toolId: string,
  startDate: Date = new Date(),
  daysToGenerate: number = 30
): AvailabilityCalendar[] {
  const calendar: AvailabilityCalendar[] = []

  for (let i = 0; i < daysToGenerate; i++) {
    const date = addDays(startDate, i)
    const dateString = format(date, 'yyyy-MM-dd')

    // Check if date is in the past
    if (date < startOfDay(new Date())) {
      calendar.push({
        date: dateString,
        available: false,
        reason: 'Past date'
      })
      continue
    }

    // Check tool availability
    const available = isToolAvailable(toolId, date, date)

    calendar.push({
      date: dateString,
      available,
      reason: available ? undefined : 'Already reserved'
    })
  }

  return calendar
}

/**
 * Get next available date for a tool
 */
export function getNextAvailableDate(toolId: string): Date | null {
  const today = new Date()
  const calendar = generateAvailabilityCalendar(toolId, today, 60)

  const nextAvailable = calendar.find(day => day.available)
  return nextAvailable ? parseISO(nextAvailable.date) : null
}

/**
 * Calculate pricing for a rental period
 */
export function calculatePricing(
  dailyRate: number,
  weeklyRate: number | undefined,
  monthlyRate: number | undefined,
  deposit: number,
  startDate: Date,
  endDate: Date
): PricingBreakdown {
  const days = Math.ceil((endOfDay(endDate).getTime() - startOfDay(startDate).getTime()) / (1000 * 60 * 60 * 24))

  let baseRate: number
  let weekendMultiplier = 1

  // Determine best rate
  if (monthlyRate && days >= 28) {
    baseRate = monthlyRate
  } else if (weeklyRate && days >= 7) {
    const weeks = Math.ceil(days / 7)
    baseRate = weeklyRate * weeks
  } else {
    baseRate = dailyRate * days

    // Apply weekend multiplier for weekend days
    const weekendDays = countWeekendDays(startDate, endDate)
    if (weekendDays > 0) {
      weekendMultiplier = BUSINESS_CONFIG.WEEKEND_MULTIPLIER
      baseRate = baseRate * weekendMultiplier
    }
  }

  const subtotal = baseRate
  const taxes = subtotal * BUSINESS_CONFIG.TAX_RATE
  const fees = 0 // No additional fees for now
  const total = subtotal + taxes + fees + deposit
  const totalWithoutDeposit = subtotal + taxes + fees

  return {
    baseRate,
    weekendMultiplier: weekendMultiplier > 1 ? weekendMultiplier : undefined,
    subtotal,
    taxes,
    fees,
    deposit,
    total,
    totalWithoutDeposit
  }
}

/**
 * Count weekend days in a date range
 */
function countWeekendDays(startDate: Date, endDate: Date): number {
  let count = 0
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    if (isWeekend(currentDate)) {
      count++
    }
    currentDate = addDays(currentDate, 1)
  }

  return count
}

/**
 * Check if dates fall on weekend or holiday
 */
export function isWeekendOrHoliday(date: Date): boolean {
  const utahDate = toUtahTime(date)

  // Check for weekend
  if (isWeekend(utahDate)) {
    return true
  }

  // Check for common holidays (simplified list)
  const holidays = [
    '01-01', // New Year's Day
    '07-04', // Independence Day
    '12-25', // Christmas Day
    '11-24', // Thanksgiving (simplified - 4th Thursday would be more complex)
  ]

  const dateString = format(utahDate, 'MM-dd')
  return holidays.includes(dateString)
}

/**
 * Format date for display in Utah timezone
 */
export function formatUtahDate(date: Date, formatString: string = 'PPP'): string {
  const utahDate = toUtahTime(date)
  return format(utahDate, formatString)
}

/**
 * Format pickup/return times for display
 */
export function formatPickupReturnTimes(date: Date): { pickup: string; return: string } {
  const { pickup, return: returnTime } = getPickupReturnTimes(date)

  return {
    pickup: formatUtahDate(pickup, 'h:mm a'),
    return: formatUtahDate(returnTime, 'h:mm a')
  }
}

/**
 * Validate rental dates
 */
export function validateRentalDates(startDate: Date, endDate: Date): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const today = startOfDay(new Date())

  // Check if start date is in the future
  if (startOfDay(startDate) < today) {
    errors.push('Start date cannot be in the past')
  }

  // Check if end date is after start date
  if (endOfDay(endDate) <= startOfDay(startDate)) {
    errors.push('End date must be after start date')
  }

  // Check if rental period is not too long (e.g., max 30 days)
  const days = Math.ceil((endOfDay(endDate).getTime() - startOfDay(startDate).getTime()) / (1000 * 60 * 60 * 24))
  if (days > 30) {
    errors.push('Rental period cannot exceed 30 days')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Get business hours for a date
 */
export function getBusinessHours(date: Date): { open: Date; close: Date } {
  const { pickup, return: returnTime } = getPickupReturnTimes(date)
  return { open: pickup, close: returnTime }
}