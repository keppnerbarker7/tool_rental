'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/admin/image-upload'
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function NewToolPage() {
  const router = useRouter()
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
    location: 'Utah County Warehouse',
    condition: 'Excellent',
    trainingRequired: false,
    images: [] as string[],
    specifications: {} as Record<string, string>,
    policies: [] as string[]
  })

  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [newPolicy, setNewPolicy] = useState('')

  const categories = [
    { value: 'PRESSURE_WASHERS', label: 'Pressure Washers' },
    { value: 'CARPET_CLEANERS', label: 'Carpet Cleaners' },
    { value: 'LAWN_GARDEN', label: 'Lawn & Garden' },
    { value: 'POWER_TOOLS', label: 'Power Tools' }
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

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create tool')
      }

      const newTool = await response.json()
      console.log('Tool created:', newTool)

      alert('Tool created successfully!')
      router.push('/admin/tools')
    } catch (error) {
      console.error('Error creating tool:', error)
      alert('Failed to create tool. Please try again.')
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Add New Tool</h1>
            <p className="text-gray-600">Create a new tool listing</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
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
                    placeholder="e.g., Pressure Washer 2000 PSI"
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
                    placeholder="e.g., Karcher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <Input
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="e.g., K2000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Describe the tool, its uses, and key features..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="29.99"
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
                    placeholder="179.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Rate ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.monthlyRate}
                    onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                    placeholder="599.99"
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
                    placeholder="100.00"
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
                    placeholder="1500.00"
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
                Save Tool
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/admin/tools">
                  Cancel
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImagesChange}
                maxImages={5}
              />
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center relative overflow-hidden">
                  {formData.images.length > 0 ? (
                    <Image
                      src={formData.images[0]}
                      alt="Tool preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Image Preview</span>
                  )}
                </div>
                <h3 className="font-medium">{formData.name || 'Tool Name'}</h3>
                <p className="text-sm text-gray-600">{formData.brand}</p>
                <div className="mt-2">
                  <Badge variant="outline">{formData.category.replace('_', ' ').toLowerCase()}</Badge>
                </div>
                {formData.dailyRate && (
                  <p className="font-medium text-lg mt-2">${formData.dailyRate}/day</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}