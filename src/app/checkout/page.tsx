'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Calendar,
  MapPin,
  DollarSign,
  Lock,
  CheckCircle,
  MessageSquare
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { stripePromise } from '@/lib/stripe'
import { StripeCheckoutForm } from '@/components/checkout/stripe-checkout-form'

interface CheckoutData {
  toolId: string
  toolName: string
  toolImage: string
  startDate: string
  endDate: string
  days: number
  subtotal: number
  taxes: number
  rentalTotal: number
  deposit: number
  location: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [clientSecret, setClientSecret] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [finalTotal, setFinalTotal] = useState(0)
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    // Get checkout data from URL params
    const data: CheckoutData = {
      toolId: searchParams.get('toolId') || 'pressure-washer-1',
      toolName: searchParams.get('toolName') || 'Professional Pressure Washer',
      toolImage: '/images/placeholder-tool.jpg',
      startDate: searchParams.get('startDate') || new Date().toLocaleDateString(),
      endDate: searchParams.get('endDate') || new Date(Date.now() + 86400000).toLocaleDateString(),
      days: parseInt(searchParams.get('days') || '1'),
      subtotal: parseFloat(searchParams.get('subtotal') || '45.00'),
      taxes: parseFloat(searchParams.get('taxes') || '3.71'),
      rentalTotal: parseFloat(searchParams.get('rentalTotal') || '48.71'),
      deposit: parseFloat(searchParams.get('deposit') || '100.00'),
      location: searchParams.get('location') || 'Provo Central'
    }
    setCheckoutData(data)
    setFinalTotal(data.rentalTotal)

    // Create payment intent
    createPaymentIntent(data)
  }, [searchParams])

  // Memoized validation result
  const isContactInfoValid = useMemo(() => {
    const emailValid = Boolean(contactInfo.email && contactInfo.email.trim().length > 0)
    const phoneValid = Boolean(contactInfo.phone && contactInfo.phone.trim().length > 0)
    const firstNameValid = Boolean(contactInfo.firstName && contactInfo.firstName.trim().length > 0)
    const lastNameValid = Boolean(contactInfo.lastName && contactInfo.lastName.trim().length > 0)

    const isValid = emailValid && phoneValid && firstNameValid && lastNameValid

    console.log('🔍 Contact validation (memoized):', {
      email: contactInfo.email || '[empty]',
      emailLength: contactInfo.email?.length || 0,
      emailValid,
      phone: contactInfo.phone || '[empty]',
      phoneLength: contactInfo.phone?.length || 0,
      phoneValid,
      firstName: contactInfo.firstName || '[empty]',
      firstNameLength: contactInfo.firstName?.length || 0,
      firstNameValid,
      lastName: contactInfo.lastName || '[empty]',
      lastNameLength: contactInfo.lastName?.length || 0,
      lastNameValid,
      finalValid: isValid
    })
    return isValid
  }, [contactInfo.email, contactInfo.phone, contactInfo.firstName, contactInfo.lastName])

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim()

    if (code === 'TESTING') {
      setPromoApplied(true)
      setPromoDiscount(checkoutData?.rentalTotal || 0)
      setFinalTotal(0)
      setError('')
    } else if (code === '') {
      setError('Please enter a promo code')
    } else {
      setError('Invalid promo code')
      setPromoApplied(false)
      setPromoDiscount(0)
      setFinalTotal(checkoutData?.rentalTotal || 0)
    }
  }

  const removePromoCode = () => {
    setPromoCode('')
    setPromoApplied(false)
    setPromoDiscount(0)
    setFinalTotal(checkoutData?.rentalTotal || 0)
    setError('')
  }

  const createPaymentIntent = async (data: CheckoutData) => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.rentalTotal, // Only charge rental amount, not deposit
          toolName: data.toolName,
          startDate: data.startDate,
          endDate: data.endDate,
        }),
      })

      const { clientSecret: secret, error } = await response.json()

      if (error) {
        setError(error)
      } else {
        setClientSecret(secret)
      }
    } catch (err) {
      setError('Failed to initialize payment')
    }
  }

  const handlePaymentSuccess = async () => {
    try {
      console.log('🚀 Starting payment success process...')

      // Generate access code
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      console.log('📱 Generated access code:', accessCode)

      // Pass rental data and contact info to success page
      const successParams = new URLSearchParams({
        toolName: checkoutData?.toolName || '',
        startDate: checkoutData?.startDate || '',
        endDate: checkoutData?.endDate || '',
        days: checkoutData?.days.toString() || '1',
        rentalTotal: finalTotal.toString(),
        deposit: checkoutData?.deposit.toString() || '0',
        location: checkoutData?.location || '',
        email: contactInfo.email,
        phone: contactInfo.phone,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        accessCode: accessCode
      })

      console.log('📧 Sending receipt...')
      // Send email receipt and SMS
      await sendReceipt(accessCode)

      console.log('🎉 Redirecting to success page...')
      router.push(`/checkout/success?${successParams.toString()}`)

    } catch (error) {
      console.error('❌ Error in handlePaymentSuccess:', error)
      // Still redirect even if email fails
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      const successParams = new URLSearchParams({
        toolName: checkoutData?.toolName || '',
        startDate: checkoutData?.startDate || '',
        endDate: checkoutData?.endDate || '',
        days: checkoutData?.days.toString() || '1',
        rentalTotal: finalTotal.toString(),
        deposit: checkoutData?.deposit.toString() || '0',
        location: checkoutData?.location || '',
        email: contactInfo.email,
        phone: contactInfo.phone,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        accessCode: accessCode
      })
      router.push(`/checkout/success?${successParams.toString()}`)
    }
  }

  const sendReceipt = async (accessCode: string) => {
    try {
      // Send email receipt
      const emailResponse = await fetch('/api/send-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: contactInfo.email,
          customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
          toolName: checkoutData?.toolName,
          startDate: checkoutData?.startDate,
          endDate: checkoutData?.endDate,
          days: checkoutData?.days,
          totalPaid: finalTotal,
          deposit: checkoutData?.deposit,
          location: checkoutData?.location,
          accessCode: accessCode
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      console.log('✅ Email receipt sent to:', contactInfo.email)
      console.log('📱 Access code generated:', accessCode)

      // TODO: Implement SMS sending
      console.log('SMS would be sent to:', contactInfo.phone, 'with code:', accessCode)

    } catch (error) {
      console.error('Failed to send receipt:', error)
      // Don't block checkout if email fails
    }
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/tools/${checkoutData.toolId}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Tool
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
            <div className="ml-auto flex items-center gap-2 text-green-600">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Main Payment Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Rental Summary */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Rental Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={checkoutData.toolImage}
                      alt={checkoutData.toolName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{checkoutData.toolName}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {checkoutData.startDate} - {checkoutData.endDate} ({checkoutData.days} day{checkoutData.days !== 1 ? 's' : ''})
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {checkoutData.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  We'll send your receipt and access code to these details
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                    <Input
                      placeholder="John"
                      value={contactInfo.firstName}
                      onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                    <Input
                      placeholder="Doe"
                      value={contactInfo.lastName}
                      onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                      className="h-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="h-12"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">📧 Receipt will be sent here</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="(801) 555-0123"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="h-12"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">📱 Access code will be texted here</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                    {paymentMethod === 'card' && <CheckCircle className="h-4 w-4 text-blue-500 ml-auto" />}
                  </button>
                </div>

                {/* Free Rental or Stripe Payment Form */}
                {finalTotal === 0 ? (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-center space-y-4">
                      <div className="text-green-800">
                        <div className="text-lg font-bold">🎉 Free Rental!</div>
                        <div className="text-sm">No payment required with TESTING promo code</div>
                      </div>
                      <Button
                        size="lg"
                        className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          console.log('🟢 Confirm button clicked!')
                          console.log('📞 Contact info at click:', contactInfo)
                          console.log('✅ Valid at click:', isContactInfoValid)
                          if (isContactInfoValid) {
                            handlePaymentSuccess()
                          } else {
                            console.log('❌ Contact info not valid, button should be disabled')
                          }
                        }}
                        disabled={!isContactInfoValid}
                      >
                        ✅ Confirm Free Reservation
                      </Button>
                    </div>
                  </div>
                ) : paymentMethod === 'card' && clientSecret ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#059669',
                            colorBackground: '#ffffff',
                            colorText: '#374151',
                            colorDanger: '#dc2626',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '8px',
                          },
                        },
                      }}
                    >
                      <StripeCheckoutForm
                        clientSecret={clientSecret}
                        amount={finalTotal}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </Elements>
                  </div>
                ) : null}

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Loading State */}
                {!clientSecret && !error && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-gray-600">Initializing payment...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">Secure Payment</div>
                    <div className="text-sm text-green-600">
                      Your payment information is encrypted and secure. We use Stripe for secure payment processing.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">

            {/* Pricing Breakdown */}
            <Card className="bg-white shadow-lg border-0 sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Rental Cost */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Rental ({checkoutData.days} day{checkoutData.days !== 1 ? 's' : ''})</span>
                    <span>{formatCurrency(checkoutData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes (8.25%)</span>
                    <span>{formatCurrency(checkoutData.taxes)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg text-green-800">
                      <span>Subtotal</span>
                      <span>{formatCurrency(checkoutData.rentalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Promo Code</h4>
                    {!promoApplied ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                        />
                        <Button
                          onClick={applyPromoCode}
                          variant="outline"
                          className="whitespace-nowrap"
                        >
                          Apply
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-green-800">TESTING - 100% OFF</div>
                            <div className="text-xs text-green-600">Testing promo applied</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-700">-{formatCurrency(promoDiscount)}</span>
                            <Button
                              onClick={removePromoCode}
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Total */}
                {promoApplied && (
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-xl text-green-800">
                      <span>Final Total</span>
                      <span className={finalTotal === 0 ? "text-green-600" : ""}>{formatCurrency(finalTotal)}</span>
                    </div>
                    {finalTotal === 0 && (
                      <div className="text-center text-green-600 font-medium text-sm mt-1">🎉 FREE RENTAL!</div>
                    )}
                  </div>
                )}

                {/* Deposit */}
                <div className="border-t pt-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-amber-800">Security Deposit</div>
                        <div className="text-xs text-amber-600">Refundable • Held temporarily</div>
                      </div>
                      <div className="font-semibold text-amber-700">{formatCurrency(checkoutData.deposit)}</div>
                    </div>
                  </div>
                </div>

                {/* Payment button is now in the Stripe form */}

                <div className="text-xs text-gray-500 text-center">
                  By completing this purchase, you agree to our rental terms and conditions.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}