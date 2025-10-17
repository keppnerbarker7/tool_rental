import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, Search, ArrowLeft, Wrench, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const quickLinks = [
    {
      name: 'Browse All Tools',
      href: '/tools',
      description: 'Explore our complete catalog',
      icon: Wrench,
      color: 'blue'
    },
    {
      name: 'How It Works',
      href: '/how-it-works',
      description: 'Learn about our rental process',
      icon: HelpCircle,
      color: 'green'
    },
    {
      name: 'Contact Support',
      href: '/contact',
      description: 'Get help from our team',
      icon: HelpCircle,
      color: 'purple'
    }
  ]

  const popularCategories = [
    { name: 'Pressure Washers', href: '/tools?category=pressure-washers' },
    { name: 'Carpet Cleaners', href: '/tools?category=carpet-cleaners' },
    { name: 'Lawn & Garden', href: '/tools?category=lawn-garden' },
    { name: 'Power Tools', href: '/tools?category=power-tools' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Main Error Card */}
        <Card className="border-0 shadow-2xl mb-8">
          <CardContent className="pt-16 pb-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-12 w-12 text-slate-400" />
            </div>

            <Badge className="mb-6 bg-red-100 text-red-800 px-4 py-2">
              404 - Page Not Found
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Oops! Page Not Found
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to finding the tools you need!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 font-semibold" asChild>
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:bg-slate-50 h-12 px-8 font-semibold" asChild>
                <Link href="/tools">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Tools
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickLinks.map((link, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-${link.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <link.icon className={`h-6 w-6 text-${link.color}-600`} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{link.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{link.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={link.href}>Go There</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Categories */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
              Popular Tool Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  asChild
                >
                  <Link href={category.href}>
                    <div>
                      <div className="font-medium text-slate-900">{category.name}</div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-8">
          <p className="text-slate-600 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" asChild>
              <Link href="/faq">
                <HelpCircle className="h-4 w-4 mr-2" />
                View FAQ
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="tel:+18015550123">
                Call (801) 555-0123
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}