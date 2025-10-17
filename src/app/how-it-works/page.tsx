import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Calendar,
  CreditCard,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Browse & Search',
      description: 'Find the perfect tool for your project from our extensive catalog of professional-grade equipment.',
      icon: Search,
      features: [
        'Search by tool name or project type',
        'Filter by category and price range',
        'View detailed specifications',
        'Check real-time availability'
      ]
    },
    {
      number: 2,
      title: 'Select Dates',
      description: 'Choose your rental period using our easy calendar interface with instant pricing.',
      icon: Calendar,
      features: [
        'Interactive availability calendar',
        'Flexible rental periods',
        'Weekend and bulk discounts',
        'Instant price calculation'
      ]
    },
    {
      number: 3,
      title: 'Secure Payment',
      description: 'Complete your reservation with our secure payment system and receive instant confirmation.',
      icon: CreditCard,
      features: [
        'Secure credit card processing',
        'Instant reservation confirmation',
        'Email and SMS notifications',
        'Digital receipt delivery'
      ]
    },
    {
      number: 4,
      title: 'Self-Service Pickup',
      description: 'Use your unique access code to pick up your tool at the scheduled time.',
      icon: Smartphone,
      features: [
        'Unique access code via SMS',
        'Self-service pickup system',
        'Tool inspection checklist',
        '24/7 pickup availability'
      ]
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'No waiting in line or dealing with paperwork. Reserve online and pick up instantly with your access code.'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All tools are covered with comprehensive insurance. Damage protection included with every rental.'
    },
    {
      icon: MapPin,
      title: 'Convenient Locations',
      description: 'Multiple pickup locations across Utah County for easy access to your rental tools.'
    }
  ]

  const faqs = [
    {
      question: 'How far in advance can I book a tool?',
      answer: 'You can book tools up to 90 days in advance. For same-day rentals, bookings must be made at least 2 hours before pickup.'
    },
    {
      question: 'What if I need to extend my rental?',
      answer: 'You can extend your rental through your account dashboard, subject to availability. Additional charges will apply for the extended period.'
    },
    {
      question: 'What happens if a tool is damaged?',
      answer: 'All rentals include damage protection. Minor wear is expected, but significant damage may result in repair fees. We\'ll assess any issues when you return the tool.'
    },
    {
      question: 'Can I cancel my reservation?',
      answer: 'Yes, you can cancel up to 24 hours before your pickup time for a full refund. Cancellations within 24 hours may incur a fee.'
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Currently, we operate on a self-service pickup model. Delivery services may be available in the future for large orders.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            Simple • Secure • Self-Service
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Renting professional tools has never been easier. Our streamlined process gets you the equipment you need in just a few clicks.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Four Simple Steps</h2>
            <p className="text-xl text-slate-600">
              From search to pickup, the entire process takes just minutes
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-32 w-px h-16 bg-blue-200 transform -translate-x-1/2 z-0" />
                )}

                <Card className={`relative overflow-hidden shadow-xl border-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="md:flex">
                    <div className="md:w-1/2 p-8 md:p-12">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mr-4">
                          {step.number}
                        </div>
                        <step.icon className="h-8 w-8 text-blue-600" />
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-slate-900">{step.title}</h3>
                      <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-slate-600">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
                      <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
                        <step.icon className="h-16 w-16 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Why Choose Our Service?</h2>
            <p className="text-xl text-slate-600">
              Professional tools made accessible with modern convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-900">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our rental process
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white border-0 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="py-16 px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                Browse our catalog of professional tools and get your project started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100 shadow-lg h-14 px-8 text-lg font-semibold" asChild>
                  <Link href="/tools">
                    Browse Tools
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 h-14 px-8 text-lg font-semibold">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}