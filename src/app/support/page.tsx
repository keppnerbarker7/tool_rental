'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Zap,
  Shield,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0) // First FAQ open by default
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Message sent! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const quickHelp = [
    {
      title: 'Browse Tools',
      description: 'See all available tools with prices',
      icon: '🔧',
      link: '/tools',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Call Us Now',
      description: 'Speak with our team directly',
      icon: '📞',
      link: 'tel:+18015550123',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Emergency Line',
      description: '24/7 for urgent tool issues',
      icon: '🚨',
      link: 'tel:+18015550911',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const locations = [
    {
      name: 'Provo Central',
      address: '1234 University Avenue, Provo, UT 84604',
      phone: '(801) 555-0123',
      hours: '6 AM - 10 PM Daily',
      features: ['24/7 Access', 'Training Center', 'Large Inventory']
    },
    {
      name: 'Orem North',
      address: '567 State Street, Orem, UT 84057',
      phone: '(801) 555-0124',
      hours: '6 AM - 9 PM Daily',
      features: ['Quick Return', 'Ample Parking', 'Self-Service']
    },
    {
      name: 'Spanish Fork',
      address: '890 Main Street, Spanish Fork, UT 84660',
      phone: '(801) 555-0125',
      hours: '7 AM - 8 PM Daily',
      features: ['Rural Tools', 'Agricultural Equipment']
    }
  ]

  const faqs = [
    {
      question: 'How do I rent a tool?',
      answer: 'Super simple! Browse our tools online, select your dates, pay securely, and get a pickup code via text. Use your code at any location to grab your tool - no paperwork needed!'
    },
    {
      question: 'What does it cost?',
      answer: 'Tools start at $15/day. You save 15% on weekly rentals and 25% on monthly. All prices include damage protection. See exact pricing on each tool card when browsing.'
    },
    {
      question: 'Where can I pick up tools?',
      answer: 'We have 3 convenient Utah County locations in Provo, Orem, and Spanish Fork. Most offer 24/7 self-service pickup with your access code.'
    },
    {
      question: 'What if something breaks?',
      answer: 'Don\'t worry! All rentals include damage protection. Normal wear is expected. For significant damage, stop using the tool and call us immediately for a replacement.'
    },
    {
      question: 'Can I extend my rental?',
      answer: 'Yes! Extend through your account or call us. Extensions are subject to availability and charged at current daily rates.'
    },
    {
      question: 'How do returns work?',
      answer: 'Return to the same location using your access code. Scan the return QR code and you\'re done! Return early? Get credit for unused days.'
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Browse & Book',
      description: 'Find your tool online and reserve with secure payment',
      icon: Search
    },
    {
      step: 2,
      title: 'Get Your Code',
      description: 'Receive pickup code via text message',
      icon: MessageSquare
    },
    {
      step: 3,
      title: 'Self-Service Pickup',
      description: 'Use your code at our location - no waiting in line',
      icon: Zap
    },
    {
      step: 4,
      title: 'Return Easy',
      description: 'Drop off and scan QR code when you\'re done',
      icon: CheckCircle
    }
  ]

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Matching Homepage Style */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/360_F_267116945_mKJfHU5x2zNuVME59BdfFtOzwB4PSJC5.jpg"
            alt="Professional customer support and service"
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="block text-white">Support &</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Get instant answers or reach our team. We're here to help make your tool rental experience seamless.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="modern-button modern-button-primary h-16 px-12 text-xl font-bold" asChild>
              <Link href="tel:+18015550123">
                <Phone className="h-6 w-6 mr-3" />
                Call Now
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>
            <Button size="lg" className="modern-button bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-2 border-cyan-400/50 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl hover:scale-105 h-16 px-12 text-xl font-bold transition-all duration-300" asChild>
              <Link href="#contact">
                <MessageSquare className="h-6 w-6 mr-3" />
                Send Message
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* How It Works */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600">4 simple steps to get the tools you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg">
                    <step.icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-lime-500 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Streamlined FAQ Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Quick Answers</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <Card key={index} className="modern-card">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors py-5"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </CardTitle>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>

                {openFAQ === index && (
                  <CardContent className="pt-0 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Streamlined Contact Section */}
        <section id="contact">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600">Quick contact options and pickup locations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Options */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="modern-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>
                  <div className="space-y-4">
                    <a href="tel:+18015550123" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyan-50 transition-colors group">
                      <Phone className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-cyan-600">(801) 555-0123</div>
                        <div className="text-sm text-gray-500">Call anytime</div>
                      </div>
                    </a>
                    <a href="mailto:support@uvtoolrental.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyan-50 transition-colors group">
                      <Mail className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-cyan-600">Email Support</div>
                        <div className="text-sm text-gray-500">2 hour response</div>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 p-3">
                      <Clock className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Business Hours</div>
                        <div className="text-sm text-gray-500">Mon-Sun: 6 AM - 10 PM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 modern-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>We'll respond within 2 hours during business hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
                    required
                  />
                  <Button type="submit" className="w-full modern-button modern-button-primary h-12 font-bold">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Simplified Locations */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Pickup Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {locations.map((location, index) => (
                <Card key={index} className="modern-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 mb-2">{location.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                    <p className="text-gray-500 text-sm mb-3">{location.hours}</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {location.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Simplified Trust Section */}
        <section className="text-center">
          <Card className="modern-card p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, text: 'Fully Insured', color: 'text-green-600' },
              { icon: Clock, text: '24/7 Access', color: 'text-blue-600' },
              { icon: Star, text: 'Pro Quality', color: 'text-purple-600' },
              { icon: CheckCircle, text: 'Local Team', color: 'text-cyan-600' }
            ].map((badge, index) => (
              <div key={index} className="text-center">
                <badge.icon className={`h-8 w-8 ${badge.color} mx-auto mb-2`} />
                <span className="text-sm font-semibold text-gray-800">{badge.text}</span>
              </div>
            ))}
          </div>
          </Card>
        </section>
      </div>
    </div>
  )
}