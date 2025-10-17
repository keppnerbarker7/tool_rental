'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      })
    }, 3000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '(801) 555-0123',
      action: 'tel:+18015550123',
      hours: 'Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-9PM',
      badge: 'Available Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@uvtoolrental.com',
      action: 'mailto:support@uvtoolrental.com',
      hours: 'Response within 2 hours',
      badge: '2hr Response'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Chat Now',
      action: '#',
      hours: 'Available during business hours',
      badge: 'Coming Soon'
    }
  ]

  const quickHelp = [
    {
      title: 'Reservation Help',
      description: 'Need help with booking or changes?',
      link: '/how-it-works',
      linkText: 'How It Works'
    },
    {
      title: 'Tool Information',
      description: 'Questions about specific tools?',
      link: '/tools',
      linkText: 'Browse Tools'
    },
    {
      title: 'Pricing Questions',
      description: 'Want to know rental costs?',
      link: '/tools',
      linkText: 'View Tools & Pricing'
    },
    {
      title: 'Support & Info',
      description: 'Find FAQ, locations, and more',
      link: '/support',
      linkText: 'Help Center'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Message Sent!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for contacting us. We'll get back to you within 2 hours during business hours.
            </p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            <MessageSquare className="h-4 w-4 mr-2" />
            We're Here to Help
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Have questions about tool rentals? Need help with a reservation? Our friendly team is ready to assist you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>

            {contactMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <method.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-slate-900">{method.title}</h3>
                        <Badge variant={method.badge === 'Available Now' ? 'default' : method.badge === '2hr Response' ? 'secondary' : 'outline'} className="text-xs">
                          {method.badge}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{method.description}</p>
                      <a
                        href={method.action}
                        className="font-semibold text-blue-600 hover:text-blue-800 block mb-2"
                      >
                        {method.contact}
                      </a>
                      <p className="text-xs text-slate-500">{method.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Business Hours */}
            <Card className="border-0 shadow-lg bg-slate-900 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-400" />
                  <h3 className="font-bold text-lg">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Monday - Friday:</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Saturday:</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Sunday:</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(801) 555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation-help">Reservation Help</option>
                      <option value="tool-question">Tool Question</option>
                      <option value="pricing-inquiry">Pricing Inquiry</option>
                      <option value="damage-report">Damage Report</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Please describe how we can help you..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Help Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Quick Help</h2>
            <p className="text-xl text-slate-600">
              Find answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelp.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.link}>{item.linkText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-16">
          <Card className="bg-red-50 border-red-200 border-2">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-red-800">Emergency Support</h2>
              <p className="text-red-700 mb-6">
                For urgent issues with rented equipment or safety concerns, call our emergency line:
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <a href="tel:+18015550911">
                  <Phone className="h-5 w-5 mr-2" />
                  (801) 555-0911
                </a>
              </Button>
              <p className="text-red-600 text-sm mt-4">Available 24/7 for emergencies only</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}