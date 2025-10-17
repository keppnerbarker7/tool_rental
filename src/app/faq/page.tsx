'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, Search, HelpCircle, Clock, Shield, DollarSign, MapPin, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      color: 'blue',
      faqs: [
        {
          question: 'How do I rent a tool?',
          answer: 'Renting is simple: 1) Browse our catalog online, 2) Select your dates, 3) Complete payment, 4) Receive pickup code via SMS, 5) Use your code at our self-service pickup location. No paperwork needed!'
        },
        {
          question: 'Do I need to create an account?',
          answer: 'While you can browse without an account, creating one makes reservations faster and lets you track your rental history. It only takes 30 seconds to sign up!'
        },
        {
          question: 'What do I need to bring for pickup?',
          answer: 'Just bring a valid driver\'s license or government ID and your pickup code (sent via SMS). That\'s it! No need to print anything.'
        },
        {
          question: 'Can I rent tools for someone else?',
          answer: 'Yes, but the person picking up must have valid ID and the pickup code. The renter is responsible for the tool and any damages.'
        }
      ]
    },
    {
      title: 'Pricing & Payment',
      icon: DollarSign,
      color: 'green',
      faqs: [
        {
          question: 'How much does it cost to rent tools?',
          answer: 'Daily rates start at $15. We offer 15% discounts for weekly rentals and 25% for monthly rentals. Check our Pricing page for detailed rates by tool category.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees! The price you see includes damage protection. The only additional cost is a refundable security deposit, which varies by tool value.'
        },
        {
          question: 'When do I pay?',
          answer: 'Payment is required at the time of reservation. We accept all major credit cards. Your card is charged immediately, and deposits are refunded within 2-3 business days after return.'
        },
        {
          question: 'What if I return a tool early?',
          answer: 'Great news! You\'ll receive credit for unused full days on your next rental. For example, if you rent for 3 days but return after 1 day, you get 2 days of credit.'
        },
        {
          question: 'Do you offer discounts for multiple tools?',
          answer: 'Yes! Rent 3+ tools and save 10%. Weekly and monthly rentals also receive automatic discounts. Contact us for large project quotes.'
        }
      ]
    },
    {
      title: 'Pickup & Return',
      icon: MapPin,
      color: 'purple',
      faqs: [
        {
          question: 'How does self-service pickup work?',
          answer: 'Use the access code sent to your phone to unlock your assigned storage unit. Your tools will be ready inside with a checklist. Scan the QR code to confirm pickup.'
        },
        {
          question: 'What are your pickup hours?',
          answer: 'Most locations offer pickup from 6 AM to 10 PM on weekdays and 7 AM to 9 PM on weekends. Some locations offer 24/7 access - check the specific location details.'
        },
        {
          question: 'Can I pick up tools the same day I book?',
          answer: 'Yes! Same-day pickup is available if you book at least 2 hours in advance. Tools are typically ready within 1 hour of booking.'
        },
        {
          question: 'What if I\'m running late for pickup?',
          answer: 'No problem! Your pickup window is flexible. Just make sure to collect your tools before the location closes or by your rental start time, whichever is later.'
        },
        {
          question: 'How do I return tools?',
          answer: 'Return to the same location you picked up from. Use your access code to open the unit, place tools inside, and scan the return QR code. You\'ll get immediate confirmation.'
        }
      ]
    },
    {
      title: 'Tool Condition & Safety',
      icon: Wrench,
      color: 'orange',
      faqs: [
        {
          question: 'What condition are the tools in?',
          answer: 'All tools are professionally maintained and inspected before each rental. We only rent commercial-grade equipment that meets our strict quality standards.'
        },
        {
          question: 'What if a tool breaks during my rental?',
          answer: 'Don\'t worry! All rentals include damage protection. Stop using the tool immediately and contact us. We\'ll provide a replacement if available or issue a refund for the unused period.'
        },
        {
          question: 'Do you provide training on tool use?',
          answer: 'Basic training videos are available online for each tool. Some high-powered tools require safety training - these are clearly marked and training can be scheduled at our main location.'
        },
        {
          question: 'What if I damage a tool?',
          answer: 'Minor wear and tear is expected and covered. Significant damage may result in repair fees, but these are capped at the tool\'s replacement value. Damage protection covers most scenarios.'
        },
        {
          question: 'Are tools cleaned between rentals?',
          answer: 'Yes! All tools are cleaned and sanitized between each rental. We follow strict hygiene protocols, especially for tools that come in contact with surfaces.'
        }
      ]
    },
    {
      title: 'Reservations & Changes',
      icon: Clock,
      color: 'indigo',
      faqs: [
        {
          question: 'How far in advance can I book?',
          answer: 'You can book up to 90 days in advance. For popular tools during busy seasons (spring/summer), we recommend booking 1-2 weeks ahead.'
        },
        {
          question: 'Can I extend my rental?',
          answer: 'Yes, if the tool is available! Extend through your account dashboard or contact us. Extensions are charged at the current daily rate and must be approved before your return time.'
        },
        {
          question: 'Can I cancel my reservation?',
          answer: 'You can cancel up to 24 hours before pickup for a full refund. Cancellations within 24 hours may incur a 25% processing fee.'
        },
        {
          question: 'What if the tool I want isn\'t available?',
          answer: 'We\'ll suggest similar tools or put you on a waitlist. If we can\'t accommodate your needs, we work with partner locations to help you find what you need.'
        },
        {
          question: 'Can I change my pickup location?',
          answer: 'Yes, but only if your requested tool is available at the new location. Changes must be made at least 4 hours before your pickup time.'
        }
      ]
    },
    {
      title: 'Insurance & Liability',
      icon: Shield,
      color: 'red',
      faqs: [
        {
          question: 'What does damage protection cover?',
          answer: 'Damage protection covers normal wear, minor damage, and most accidental damage. It doesn\'t cover theft, intentional damage, or damage from misuse outside normal operation.'
        },
        {
          question: 'What if a tool is stolen?',
          answer: 'Contact us immediately and file a police report. You\'re responsible for the replacement cost, but many homeowner\'s insurance policies cover rental equipment theft.'
        },
        {
          question: 'Am I liable for injuries caused by tools?',
          answer: 'You assume responsibility for safe operation. We strongly recommend reviewing safety information and ensuring you\'re comfortable operating any tool before renting.'
        },
        {
          question: 'Do you offer additional insurance?',
          answer: 'Our standard damage protection covers most scenarios. For high-value tools or extended rentals, additional coverage options are available at checkout.'
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            How Can We Help?
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our tool rental service. Can't find what you're looking for? Contact us!
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-12 text-lg border-2 border-slate-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {searchTerm && (
            <div className="mb-8">
              <p className="text-slate-600">
                {filteredFAQs.reduce((total, category) => total + category.faqs.length, 0)} results found for "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                    <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
                  <Badge variant="outline" className="ml-auto">
                    {category.faqs.length} {category.faqs.length === 1 ? 'question' : 'questions'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex
                    const isOpen = openItems.includes(globalIndex)

                    return (
                      <Card key={faqIndex} className="border-0 shadow-lg overflow-hidden">
                        <CardHeader
                          className="cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                          onClick={() => toggleItem(globalIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-slate-900 pr-4">
                              {faq.question}
                            </CardTitle>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>

                        {isOpen && (
                          <CardContent className="pt-0 pb-6">
                            <p className="text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">No results found</h3>
              <p className="text-slate-600 mb-6">
                Try different search terms or browse our categories above.
              </p>
              <Button onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="py-12 px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Can't find the answer you're looking for? Our support team is here to help you with any questions about tool rentals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700" asChild>
                  <a href="tel:+18015550123">Call (801) 555-0123</a>
                </Button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Available Mon-Fri 6AM-10PM, Sat-Sun 7AM-9PM
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Browse Tools</h3>
                <p className="text-slate-600 text-sm mb-4">See our full catalog of professional tools</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tools">View Tools</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">How It Works</h3>
                <p className="text-slate-600 text-sm mb-4">Learn about our rental process</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Find Locations</h3>
                <p className="text-slate-600 text-sm mb-4">Find pickup locations near you</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/locations">View Locations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}