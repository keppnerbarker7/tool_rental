import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Phone, Navigation, Car, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function LocationsPage() {
  const locations = [
    {
      name: 'Provo Central',
      address: '1234 University Avenue, Provo, UT 84604',
      phone: '(801) 555-0123',
      hours: {
        weekday: '6:00 AM - 10:00 PM',
        weekend: '7:00 AM - 9:00 PM'
      },
      features: ['24/7 Access', 'Covered Pickup Area', 'Large Tool Inventory', 'Training Center'],
      description: 'Our flagship location with the largest selection of tools and equipment.',
      specialties: ['Construction Equipment', 'Power Tools', 'Landscaping'],
      isMain: true
    },
    {
      name: 'Orem North',
      address: '567 State Street, Orem, UT 84057',
      phone: '(801) 555-0124',
      hours: {
        weekday: '6:00 AM - 9:00 PM',
        weekend: '7:00 AM - 8:00 PM'
      },
      features: ['Self-Service Pickup', 'Ample Parking', 'Quick Return Kiosk'],
      description: 'Convenient location for Orem and surrounding areas.',
      specialties: ['Home Improvement', 'Carpet Cleaners', 'Pressure Washers'],
      isMain: false
    },
    {
      name: 'Spanish Fork',
      address: '890 Main Street, Spanish Fork, UT 84660',
      phone: '(801) 555-0125',
      hours: {
        weekday: '7:00 AM - 8:00 PM',
        weekend: '8:00 AM - 7:00 PM'
      },
      features: ['Rural Tool Selection', 'Agricultural Equipment', 'Extended Pickup Hours'],
      description: 'Specialized in agricultural and rural property maintenance tools.',
      specialties: ['Farm Equipment', 'Large Machinery', 'Outdoor Tools'],
      isMain: false
    },
    {
      name: 'American Fork',
      address: '456 Pioneer Road, American Fork, UT 84003',
      phone: '(801) 555-0126',
      hours: {
        weekday: '6:30 AM - 9:00 PM',
        weekend: '7:30 AM - 8:00 PM'
      },
      features: ['Drive-Through Pickup', 'Compact Tool Focus', 'Same-Day Service'],
      description: 'Express location focusing on smaller tools and quick rentals.',
      specialties: ['Hand Tools', 'Small Power Tools', 'Indoor Projects'],
      isMain: false
    }
  ]

  const serviceArea = [
    'Provo', 'Orem', 'Spanish Fork', 'American Fork', 'Lehi', 'Pleasant Grove',
    'Springville', 'Mapleton', 'Salem', 'Payson', 'Santaquin', 'Lindon'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2">
            <MapPin className="h-4 w-4 mr-2" />
            Serving Utah County
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Convenient Pickup Locations
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Four strategically located facilities across Utah County for easy access to professional tools.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {locations.map((location, index) => (
              <Card key={index} className={`${
                location.isMain ? 'ring-2 ring-blue-500 shadow-2xl' : 'shadow-lg hover:shadow-xl'
              } border-0 transition-all duration-300 overflow-hidden`}>
                {location.isMain && (
                  <div className="bg-blue-600 text-white px-4 py-2 text-center">
                    <Badge className="bg-white text-blue-600">
                      Main Location
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    {location.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    {location.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Address and Contact */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Navigation className="h-5 w-5 text-slate-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">{location.address}</p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800" asChild>
                          <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                            Get Directions
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-slate-500" />
                      <a href={`tel:${location.phone}`} className="font-medium text-slate-900 hover:text-blue-600">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-slate-500" />
                      <span className="font-medium text-slate-900">Pickup Hours</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Monday - Friday:</span>
                        <span className="font-medium text-slate-900">{location.hours.weekday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Saturday - Sunday:</span>
                        <span className="font-medium text-slate-900">{location.hours.weekend}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <span className="font-medium text-slate-900 mb-3 block">Features</span>
                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <span className="font-medium text-slate-900 mb-3 block">Tool Specialties</span>
                    <div className="flex flex-wrap gap-2">
                      {location.specialties.map((specialty, specialtyIndex) => (
                        <Badge key={specialtyIndex} className="bg-blue-100 text-blue-800 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/tools">Browse Tools</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4 mr-2" />
                        View Map
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Service Area</h2>
            <p className="text-xl text-slate-600">
              We proudly serve communities throughout Utah County
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceArea.map((city, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Easy Pickup</h3>
                <p className="text-slate-600 text-sm">Drive-up access at all locations with covered pickup areas</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Extended Hours</h3>
                <p className="text-slate-600 text-sm">Early morning and evening pickup times to fit your schedule</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Same-Day Service</h3>
                <p className="text-slate-600 text-sm">Reserve online and pick up the same day at most locations</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="py-12 px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                All locations offer self-service pickup with your reservation code. Contact us for special arrangements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100" asChild>
                  <Link href="/tools">Reserve Tools Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}