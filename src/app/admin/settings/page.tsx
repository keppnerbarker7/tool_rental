'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Save,
  Settings,
  DollarSign,
  Calendar,
  MapPin,
  Bell,
  Shield,
  Mail,
  Smartphone
} from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Business Settings
    businessName: 'Utah Valley Tool Rental',
    businessEmail: 'contact@utahvalleytools.com',
    businessPhone: '(801) 555-0100',
    businessAddress: '123 Main St, Provo, UT 84601',

    // Pricing Settings
    weekendMultiplier: 1.2,
    taxRate: 0.0875,
    processingFee: 2.99,
    lateReturnFee: 25.00,
    damageFee: 50.00,

    // Operational Settings
    defaultPickupTime: '08:00',
    defaultReturnTime: '18:00',
    advanceBookingDays: 90,
    minRentalHours: 4,
    maxRentalDays: 30,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pickupReminders: true,
    returnReminders: true,
    maintenanceAlerts: true,

    // Security Settings
    requireTrainingConfirmation: true,
    requireDeposit: true,
    autoApproveReservations: false,
    allowSameDayBooking: true,
    requirePhoneVerification: false
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    console.log('Settings saved:', settings)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your tool rental business settings</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          {saved && (
            <Badge className="bg-green-100 text-green-800">
              Settings saved successfully
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <Input
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={settings.businessEmail}
                onChange={(e) => handleInputChange('businessEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={settings.businessPhone}
                onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                value={settings.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Weekend Multiplier</label>
              <Input
                type="number"
                step="0.1"
                value={settings.weekendMultiplier}
                onChange={(e) => handleInputChange('weekendMultiplier', parseFloat(e.target.value))}
              />
              <p className="text-xs text-gray-500 mt-1">
                Multiplier for weekend rentals (e.g., 1.2 = 20% increase)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <Input
                type="number"
                step="0.0001"
                value={settings.taxRate}
                onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Processing Fee ($)</label>
              <Input
                type="number"
                step="0.01"
                value={settings.processingFee}
                onChange={(e) => handleInputChange('processingFee', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Late Return Fee ($)</label>
              <Input
                type="number"
                step="0.01"
                value={settings.lateReturnFee}
                onChange={(e) => handleInputChange('lateReturnFee', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Damage Assessment Fee ($)</label>
              <Input
                type="number"
                step="0.01"
                value={settings.damageFee}
                onChange={(e) => handleInputChange('damageFee', parseFloat(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Operational Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Operational Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Pickup Time</label>
              <Input
                type="time"
                value={settings.defaultPickupTime}
                onChange={(e) => handleInputChange('defaultPickupTime', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Return Time</label>
              <Input
                type="time"
                value={settings.defaultReturnTime}
                onChange={(e) => handleInputChange('defaultReturnTime', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Advance Booking (days)</label>
              <Input
                type="number"
                value={settings.advanceBookingDays}
                onChange={(e) => handleInputChange('advanceBookingDays', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Rental (hours)</label>
              <Input
                type="number"
                value={settings.minRentalHours}
                onChange={(e) => handleInputChange('minRentalHours', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Rental (days)</label>
              <Input
                type="number"
                value={settings.maxRentalDays}
                onChange={(e) => handleInputChange('maxRentalDays', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <label className="text-sm font-medium">Email Notifications</label>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-gray-500" />
                <label className="text-sm font-medium">SMS Notifications</label>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Pickup Reminders</label>
              <input
                type="checkbox"
                checked={settings.pickupReminders}
                onChange={(e) => handleInputChange('pickupReminders', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Return Reminders</label>
              <input
                type="checkbox"
                checked={settings.returnReminders}
                onChange={(e) => handleInputChange('returnReminders', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Maintenance Alerts</label>
              <input
                type="checkbox"
                checked={settings.maintenanceAlerts}
                onChange={(e) => handleInputChange('maintenanceAlerts', e.target.checked)}
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Policy Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Require Training Confirmation</label>
                  <input
                    type="checkbox"
                    checked={settings.requireTrainingConfirmation}
                    onChange={(e) => handleInputChange('requireTrainingConfirmation', e.target.checked)}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Require Security Deposit</label>
                  <input
                    type="checkbox"
                    checked={settings.requireDeposit}
                    onChange={(e) => handleInputChange('requireDeposit', e.target.checked)}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-approve Reservations</label>
                  <input
                    type="checkbox"
                    checked={settings.autoApproveReservations}
                    onChange={(e) => handleInputChange('autoApproveReservations', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Allow Same-day Booking</label>
                  <input
                    type="checkbox"
                    checked={settings.allowSameDayBooking}
                    onChange={(e) => handleInputChange('allowSameDayBooking', e.target.checked)}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Require Phone Verification</label>
                  <input
                    type="checkbox"
                    checked={settings.requirePhoneVerification}
                    onChange={(e) => handleInputChange('requirePhoneVerification', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}