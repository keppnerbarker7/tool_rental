import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/tools/[id] - Get single tool
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Get tool error:', error)
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/tools/[id] - Update tool
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const toolData = {
      name: body.name,
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
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('tools')
      .update(toolData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/tools/[id] - Delete tool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Tool deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}