'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/admin/image-upload'
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  X
} from 'lucide-react'
import Link from 'next/link'
import { getToolById } from '@/lib/tools-service'
import { Tool } from '@/types'

interface EditToolPageProps {
  params: Promise<{ id: string }>
}

export default function EditToolPage({ params }: EditToolPageProps) {
  const router = useRouter()
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: 'POWER_TOOLS',
    description: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    deposit: '',
    replacementCost: '',
    location: '',
    condition: '',
    status: 'AVAILABLE',
    trainingRequired: false,
    images: [] as string[],
    specifications: {} as Record<string, string>,
    policies: [] as string[]
  })

  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [newPolicy, setNewPolicy] = useState('')

  useEffect(() => {
    params.then((resolvedParams) => {
      const foundTool = getToolById(resolvedParams.id)
      if (!foundTool) {
        notFound()
      }

      setTool(foundTool)
      setFormData({
        name: foundTool.name,
        brand: foundTool.brand || '',
        model: foundTool.model || '',
        category: foundTool.category,
        description: foundTool.description,
        dailyRate: foundTool.dailyRate.toString(),
        weeklyRate: foundTool.weeklyRate?.toString() || '',
        monthlyRate: foundTool.monthlyRate?.toString() || '',
        deposit: foundTool.deposit.toString(),
        replacementCost: foundTool.replacementCost.toString(),
        location: foundTool.location,
        condition: foundTool.condition,
        status: foundTool.status,
        trainingRequired: foundTool.trainingRequired,
        images: foundTool.images || [],
        specifications: foundTool.specifications || {},
        policies: foundTool.policies || []
      })
      setLoading(false)
    })
  }, [params])

  const categories = [
    { value: 'PRESSURE_WASHERS', label: 'Pressure Washers' },
    { value: 'CARPET_CLEANERS', label: 'Carpet Cleaners' },
    { value: 'LAWN_GARDEN', label: 'Lawn & Garden' },
    { value: 'POWER_TOOLS', label: 'Power Tools' }
  ]

  const statuses = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'RENTED', label: 'Rented' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
    { value: 'RETIRED', label: 'Retired' }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs
      }
    })
  }

  const addPolicy = () => {
    if (newPolicy) {
      setFormData(prev => ({
        ...prev,
        policies: [...prev.policies, newPolicy]
      }))
      setNewPolicy('')
    }
  }

  const removePolicy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      policies: prev.policies.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedToolData = {
      ...tool,
      ...formData,
      dailyRate: parseFloat(formData.dailyRate),
      weeklyRate: formData.weeklyRate ? parseFloat(formData.weeklyRate) : undefined,
      monthlyRate: formData.monthlyRate ? parseFloat(formData.monthlyRate) : undefined,
      deposit: parseFloat(formData.deposit),
      replacementCost: parseFloat(formData.replacementCost),
      updatedAt: new Date()
    }

    console.log('Updated tool data:', updatedToolData)

    // In production, save to database via API
    alert('Tool updated successfully! (In production, this would save to your database)')
    router.push('/admin/tools')
  }

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!tool) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/tools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Tool</h1>
            <p className="text-gray-600">Update tool information and settings</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href={`/tools/${tool.slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tool Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <Input
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.trainingRequired}
                  onChange={(e) => handleInputChange('trainingRequired', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Training Required</label>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Daily Rate ($) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.dailyRate}
                    onChange={(e) => handleInputChange('dailyRate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weekly Rate ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.weeklyRate}
                    onChange={(e) => handleInputChange('weeklyRate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Rate ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.monthlyRate}
                    onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Security Deposit ($) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.deposit}
                    onChange={(e) => handleInputChange('deposit', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Replacement Cost ($) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.replacementCost}
                    onChange={(e) => handleInputChange('replacementCost', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Specification name (e.g., Power)"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                />
                <Input
                  placeholder="Value (e.g., 2000 PSI)"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                />
                <Button type="button" onClick={addSpecification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div>
                      <strong>{key}:</strong> {value}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpecification(key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add rental policy or guideline..."
                  value={newPolicy}
                  onChange={(e) => setNewPolicy(e.target.value)}
                />
                <Button type="button" onClick={addPolicy}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {formData.policies.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div>{policy}</div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePolicy(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Update Tool
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/admin/tools">
                  Cancel
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={
                    formData.status === 'AVAILABLE' ? 'default' :
                    formData.status === 'RENTED' ? 'secondary' :
                    formData.status === 'MAINTENANCE' ? 'destructive' : 'outline'
                  }>
                    {formData.status.toLowerCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created:</span>
                  <span className="text-sm">{new Date(tool.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm">{new Date(tool.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}