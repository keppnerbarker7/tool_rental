import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HomeSearchBar } from '@/components/tools/home-search-bar'
import { Wrench, Clock, Shield, MapPin, Zap, Star, ArrowRight, CheckCircle, TrendingUp, Droplets, Wind, Leaf } from 'lucide-react'

export default function Home() {
  const iconMap: Record<string, any> = {
    'Droplets': Droplets,
    'Wind': Wind,
    'Wrench': Wrench,
    'Leaf': Leaf
  }

  const categories = [
    {
      title: 'Pressure Washers',
      description: 'High-power cleaning equipment',
      href: '/tools?category=pressure-washers',
      count: 12,
      gradient: 'from-cyan-500 to-blue-500',
      icon: '🔧'
    },
    {
      title: 'Carpet Cleaners',
      description: 'Professional carpet cleaning tools',
      href: '/tools?category=carpet-cleaners',
      count: 8,
      gradient: 'from-purple-500 to-pink-500',
      icon: '🧽'
    },
    {
      title: 'Lawn & Garden',
      description: 'Outdoor maintenance equipment',
      href: '/tools?category=lawn-garden',
      count: 24,
      gradient: 'from-green-500 to-emerald-500',
      icon: '🌱'
    },
    {
      title: 'Paint Sprayers',
      description: 'Professional paint application tools',
      href: '/tools?category=paint-sprayers',
      count: 8,
      gradient: 'from-orange-500 to-red-500',
      icon: '🎨'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Reserve online, pickup with your code',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Clock,
      title: 'No Waiting',
      description: '24/7 self-service pickup locations',
      color: 'from-blue-400 to-cyan-500'
    }
  ]

  const stats = [
    { number: 'Quality', label: 'Professional Tools', icon: Wrench },
    { number: '24/7', label: 'Pickup Access', icon: Clock }
  ]

  const featuredTools = [
    {
      id: 1,
      name: 'Professional Pressure Washer',
      category: 'Pressure Washers',
      categoryIcon: 'Droplets',
      benefit: 'Perfect for driveways & decks',
      dailyRate: 35,
      weeklyRate: 150,
      image: '/placeholder-tool.jpg',
      slug: 'professional-pressure-washer'
    },
    {
      id: 2,
      name: 'Commercial Carpet Cleaner',
      category: 'Carpet Cleaners',
      categoryIcon: 'Wind',
      benefit: 'Deep clean carpets like new',
      dailyRate: 45,
      weeklyRate: 180,
      image: '/placeholder-tool.jpg',
      slug: 'commercial-carpet-cleaner'
    },
    {
      id: 3,
      name: 'Professional Paint Sprayer',
      category: 'Paint Sprayers',
      categoryIcon: 'Wrench',
      benefit: 'Perfect finish every time',
      dailyRate: 35,
      weeklyRate: 140,
      image: '/placeholder-tool.jpg',
      slug: 'professional-paint-sprayer'
    },
    {
      id: 4,
      name: 'Zero-Turn Lawn Mower',
      category: 'Lawn & Garden',
      categoryIcon: 'Leaf',
      benefit: 'Cut large lawns fast',
      dailyRate: 65,
      weeklyRate: 260,
      image: '/placeholder-tool.jpg',
      slug: 'zero-turn-lawn-mower'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/Get-Your-Home-Pressure-Washed.png"
            alt="Professional pressure washing"
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-white/90 font-medium">New to Utah County - Quality Tools, Instant Access</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block">Professional Tools</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block">
                On Demand
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Skip the store lines. Reserve online, pickup instantly with your code.
              <span className="text-cyan-400 font-semibold"> Pro-grade tools</span> ready when you are.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-12 text-white/90">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="font-medium">No Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="font-medium">24/7 Self-Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-cyan-400" />
                <span className="font-medium">Damage Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="font-medium">Local Utah County</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <HomeSearchBar placeholder="Search tools by name, project, or category..." />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="modern-button modern-button-primary h-16 px-12 text-xl font-bold" asChild>
                <Link href="/tools">
                  <Wrench className="h-6 w-6 mr-3" />
                  Browse All Tools
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>
              <Button size="lg" className="modern-button bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-2 border-cyan-400/50 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl hover:scale-105 h-16 px-12 text-xl font-bold transition-all duration-300" asChild>
                <Link href="/support">
                  <Star className="h-6 w-6 mr-3" />
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Simplified Stats */}
            <div className="flex justify-center gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-4">
                    <stat.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Lawn Care Showcase Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/how-to-dethatch-your-lawn.png"
            alt="Professional lawn care tools"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-slate-900/75 to-emerald-900/85"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-green-400/30">
              <Leaf className="h-5 w-5 text-green-400" />
              <span className="text-green-100 font-medium">Lawn & Garden Specialists</span>
            </div>
            <h2 className="text-6xl font-black text-white mb-8 leading-tight">
              Transform Your <span className="text-green-400">Outdoor Space</span>
            </h2>
            <p className="text-2xl text-green-100 mb-12 leading-relaxed max-w-3xl">
              From lawn dethatchers to hedge trimmers, get professional-grade lawn care tools that deliver results. Reserve online and pickup with your code.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/tools?category=lawn-garden">
                  <Leaf className="h-6 w-6 mr-3" />
                  Browse Lawn Tools
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>

              <div className="flex items-center gap-4 text-green-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Spring Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Pro Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pressure Washers Showcase Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/fsp-blog-4_benefits_of_pressure_washing1.webp"
            alt="Professional pressure washing tools"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-slate-900/75 to-blue-900/85"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-blue-400/30">
              <Droplets className="h-5 w-5 text-blue-400" />
              <span className="text-blue-100 font-medium">Pressure Washing Specialists</span>
            </div>
            <h2 className="text-6xl font-black text-white mb-8 leading-tight">
              Power Clean <span className="text-blue-400">Everything</span>
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl">
              From driveways to decks, our professional-grade pressure washers deliver the power you need for any cleaning project. Book online and grab your tool with your access code.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/tools?category=pressure-washers">
                  <Droplets className="h-6 w-6 mr-3" />
                  Browse Pressure Washers
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>

              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">High Power</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Pro Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carpet Cleaners Showcase Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Green+Carpet+Cleaning.jpg"
            alt="Professional carpet cleaning equipment"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-slate-900/60 to-purple-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-purple-400/30">
              <Wind className="h-5 w-5 text-purple-400" />
              <span className="text-purple-100 font-medium">Carpet Cleaning Specialists</span>
            </div>
            <h2 className="text-6xl font-black text-white mb-8 leading-tight">
              Deep Clean <span className="text-purple-400">Like A Pro</span>
            </h2>
            <p className="text-2xl text-purple-100 mb-12 leading-relaxed max-w-3xl">
              Restore carpets to like-new condition with our commercial-grade carpet cleaning equipment. Reserve online for convenient pickup.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/tools?category=carpet-cleaners">
                  <Wind className="h-6 w-6 mr-3" />
                  Browse Carpet Cleaners
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>

              <div className="flex items-center gap-4 text-purple-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Deep Clean</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Pro Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paint Sprayers Showcase Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_8017-1.jpg"
            alt="Professional paint spraying equipment"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-slate-900/60 to-orange-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-orange-400/30">
              <Wrench className="h-5 w-5 text-orange-400" />
              <span className="text-orange-100 font-medium">Paint Spraying Specialists</span>
            </div>
            <h2 className="text-6xl font-black mb-8 leading-tight">
              <span className="text-white">Perfect Finish</span> <span className="text-orange-400">Every Time</span>
            </h2>
            <p className="text-2xl text-orange-100 mb-12 leading-relaxed max-w-3xl">
              Achieve professional results with our precision paint sprayers. From cabinets to walls, get that flawless finish with tools ready when you are.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/tools?category=paint-sprayers">
                  <Wrench className="h-6 w-6 mr-3" />
                  Browse Paint Sprayers
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>

              <div className="flex items-center gap-4 text-orange-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                  <span className="font-medium">Perfect Finish</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                  <span className="font-medium">Pro Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Tools Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-green-400/20">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">24/7 Instant Access</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Currently in Demand</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reserve online, get your access code instantly, and pick up tools anytime - day or night. Just grab your tool and go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="modern-card group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20">
                <Link href={`/tools/${tool.slug}`}>
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                        {iconMap[tool.categoryIcon] && React.createElement(iconMap[tool.categoryIcon], {
                          className: "h-5 w-5 text-cyan-600"
                        })}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full font-bold text-sm">
                        ${tool.dailyRate}/day
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tool.benefit}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{tool.category}</span>
                      <span className="text-gray-500">${tool.weeklyRate}/week</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full modern-button modern-button-primary h-12 font-bold">
                      <Zap className="h-4 w-4 mr-2" />
                      Reserve Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>

        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Hero Action Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/360_F_137617032_Qi7isTcURFOJmVxMT5JGgJKMntRvdJPu.jpg"
            alt="Professional tools in action"
            fill
            className="object-cover opacity-50"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/55 via-gray-800/45 to-slate-900/55"></div>
        </div>

        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="text-white/90 font-medium">Join 1000+ satisfied customers</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
              Ready to Build
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent block">
                Something Amazing?
              </span>
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional tools are just a click away. No contracts, no membership fees, no waiting in line.
              <span className="text-cyan-400 font-semibold"> Just great tools ready when you need them.</span>
            </p>

            <div className="flex justify-center">
              <Button size="lg" className="modern-button modern-button-primary h-20 px-16 text-2xl font-black shadow-2xl" asChild>
                <Link href="/tools">
                  <Wrench className="h-8 w-8 mr-4" />
                  Browse Tools
                  <ArrowRight className="h-8 w-8 ml-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">24/7 Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">Local Business</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">Pro Quality</span>
              </div>
              <Link
                href="/admin"
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
                title="Admin Access"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}