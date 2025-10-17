'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  Calendar,
  MapPin,
  MessageSquare,
  Download,
  Home,
  Smartphone
} from 'lucide-react'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [accessCode, setAccessCode] = useState('')
  const [rentalData, setRentalData] = useState({
    toolName: 'Professional Pressure Washer',
    startDate: 'Dec 20, 2024',
    endDate: 'Dec 22, 2024',
    days: 3,
    totalPaid: 48.71,
    deposit: 100.00,
    location: 'Provo Central',
    email: '',
    phone: ''
  })

  useEffect(() => {
    // Get access code from URL params or generate one
    const urlAccessCode = searchParams.get('accessCode')
    const code = urlAccessCode || Math.random().toString(36).substring(2, 8).toUpperCase()
    setAccessCode(code)

    // Get rental data from URL params
    const toolName = searchParams.get('toolName') || 'Professional Pressure Washer'
    const startDate = searchParams.get('startDate') || new Date().toLocaleDateString()
    const endDate = searchParams.get('endDate') || new Date(Date.now() + 86400000).toLocaleDateString()
    const days = parseInt(searchParams.get('days') || '1')
    const totalPaid = parseFloat(searchParams.get('rentalTotal') || '0')
    const deposit = parseFloat(searchParams.get('deposit') || '100')
    const location = searchParams.get('location') || 'Provo Central'
    const email = searchParams.get('email') || ''
    const phone = searchParams.get('phone') || ''

    setRentalData({
      toolName,
      startDate,
      endDate,
      days,
      totalPaid,
      deposit,
      location,
      email,
      phone
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container px-4 py-12 max-w-4xl mx-auto">

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {rentalData.email ? `Thanks ${rentalData.email.split('@')[0]}!` : 'Reservation Confirmed!'}
          </h1>
          <p className="text-xl text-gray-600">
            Your tool rental has been successfully reserved.
            {rentalData.email && (
              <span> Check your email at <strong>{rentalData.email}</strong> for confirmation details.</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Access Code Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <Smartphone className="h-6 w-6" />
                Your Access Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-black text-blue-900 tracking-wider bg-white rounded-lg py-4 px-6 border-2 border-blue-200 mb-4">
                  {accessCode}
                </div>
                <p className="text-sm text-blue-700">
                  Use this code to access your tool at the pickup location. Save this code to your phone!
                </p>
                {rentalData.phone && (
                  <p className="text-xs text-blue-600 mt-2">
                    📱 Also sent via SMS to {rentalData.phone}
                  </p>
                )}
              </div>

              <div className="bg-blue-100 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">How to Use Your Code:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Go to the pickup location during business hours</li>
                  <li>Enter your access code at the self-service kiosk</li>
                  <li>Follow the on-screen instructions to retrieve your tool</li>
                  <li>Return the tool to the same location when finished</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Rental Details */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-green-600" />
                Rental Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tool:</span>
                  <span className="font-medium">{rentalData.toolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Period:</span>
                  <span className="font-medium">{rentalData.startDate} - {rentalData.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{rentalData.days} day{rentalData.days !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Location:</span>
                  <span className="font-medium">{rentalData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className={`font-semibold ${rentalData.totalPaid === 0 ? 'text-green-600' : 'text-green-600'}`}>
                    {rentalData.totalPaid === 0 ? 'FREE' : `$${rentalData.totalPaid.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 rounded-lg p-3">
                  <MessageSquare className="h-4 w-4" />
                  <div className="text-sm">
                    <strong>Security Deposit:</strong> ${rentalData.deposit.toFixed(2)} has been authorized on your card and will be released after tool return.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Location */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-purple-600" />
                Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Provo Central</h4>
                <p className="text-gray-600">1234 University Avenue</p>
                <p className="text-gray-600">Provo, UT 84604</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hours:</h4>
                <p className="text-gray-600">24/7 Self-Service Access</p>
                <p className="text-gray-600">Staff Available: 6 AM - 10 PM Daily</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {['24/7 Access', 'Ample Parking', 'Security Cameras'].map((feature) => (
                    <span key={feature} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Check Your Email</p>
                    <p className="text-sm text-gray-600">Confirmation and pickup instructions sent to your email</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Save Your Access Code</p>
                    <p className="text-sm text-gray-600">Screenshot or save the code {accessCode} to your phone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Pick Up Your Tool</p>
                    <p className="text-sm text-gray-600">Use your code at the self-service kiosk</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <Button asChild className="w-full">
                  <Link href="/account">
                    View My Rentals
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Contact */}
        <Card className="mt-8 bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is available 24/7 for any questions about your rental.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/support">Contact Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:+18015550123">Call (801) 555-0123</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}