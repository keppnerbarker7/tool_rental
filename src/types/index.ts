// Core types for the Tool Rental application

export enum ToolCategory {
  PRESSURE_WASHERS = 'PRESSURE_WASHERS',
  CARPET_CLEANERS = 'CARPET_CLEANERS',
  LAWN_GARDEN = 'LAWN_GARDEN',
  POWER_TOOLS = 'POWER_TOOLS',
}

export enum ToolStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: ToolCategory
  brand?: string
  model?: string
  dailyRate: number
  weeklyRate?: number
  monthlyRate?: number
  deposit: number
  status: ToolStatus
  condition: string
  location: string
  images: string[]
  specifications: Record<string, any>
  replacementCost: number
  trainingRequired: boolean
  policies: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Reservation {
  id: string
  userId: string
  toolId: string
  startDate: Date
  endDate: Date
  totalCost: number
  baseRate: number
  taxes: number
  fees: number
  deposit: number
  weekendMultiplier?: number
  status: ReservationStatus
  accessCode?: string
  accessCodeValidFrom?: Date
  accessCodeValidTo?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface PaymentIntent {
  id: string
  reservationId: string
  amount: number
  currency: string
  status: PaymentStatus
  stripePaymentIntentId?: string
  paymentMethod?: string
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  role: 'CUSTOMER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}