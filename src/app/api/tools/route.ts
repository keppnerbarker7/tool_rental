import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { seedTools } from '@/lib/seed-data'

// GET /api/tools - Get all tools
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // Fallback to seed data if database is not set up
      return NextResponse.json(seedTools)
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Database connection error:', error)
    // Fallback to seed data if Supabase is not configured
    return NextResponse.json(seedTools)
  }
}

// POST /api/tools - Create new tool
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const toolData = {
      id: crypto.randomUUID(),
      name: body.name,
      slug: slug,
      description: body.description,
      category: body.category,
      brand: body.brand || null,
      model: body.model || null,
      daily_rate: parseFloat(body.dailyRate),
      weekly_rate: body.weeklyRate ? parseFloat(body.weeklyRate) : null,
      monthly_rate: body.monthlyRate ? parseFloat(body.monthlyRate) : null,
      deposit: parseFloat(body.deposit),
      replacement_cost: parseFloat(body.replacementCost),
      status: body.status,
      condition: body.condition,
      location: body.location,
      images: body.images || [],
      specifications: body.specifications || {},
      policies: body.policies || [],
      training_required: body.trainingRequired || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('tools')
      .insert([toolData])
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}