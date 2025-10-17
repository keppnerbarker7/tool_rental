import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface DatabaseTool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  brand?: string
  model?: string
  daily_rate: number
  weekly_rate?: number
  monthly_rate?: number
  deposit: number
  replacement_cost: number
  status: string
  condition: string
  location: string
  images: string[]
  specifications: Record<string, any>
  policies: string[]
  training_required: boolean
  created_at: string
  updated_at: string
}