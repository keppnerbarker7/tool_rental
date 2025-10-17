'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  DollarSign
} from 'lucide-react'

interface Reservation {
  id: string;
  toolName: string;
  toolId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  status: string;
  total: number;
  deposit: number;
  accessCode: string | null;
  createdAt: string;
  pickupTime: string;
  returnTime: string;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Mock reservations data
  const mockReservations = [
    {
      id: 'res_001',
      toolName: 'Pressure Washer 2000 PSI',
      toolId: 'tool_001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '(801) 555-0123',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      status: 'active',
      total: 29.99,
      deposit: 100.00,
      accessCode: 'PW2024',
      createdAt: '2024-02-14T10:30:00Z',
      pickupTime: '08:00',
      returnTime: '18:00'
    },
    {
      id: 'res_002',
      toolName: 'Concrete Mixer',
      toolId: 'tool_002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '(801) 555-0456',
      startDate: '2024-02-14',
      endDate: '2024-02-18',
      status: 'pending',
      total: 159.96,
      deposit: 200.00,
      accessCode: null,
      createdAt: '2024-02-13T14:22:00Z',
      pickupTime: '09:00',
      returnTime: '17:00'
    },
    {
      id: 'res_003',
      toolName: 'Chainsaw 18"',
      toolId: 'tool_003',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.wilson@email.com',
      customerPhone: '(801) 555-0789',
      startDate: '2024-02-13',
      endDate: '2024-02-13',
      status: 'completed',
      total: 45.00,
      deposit: 50.00,
      accessCode: 'CS2024',
      createdAt: '2024-02-12T16:45:00Z',
      pickupTime: '07:00',
      returnTime: '19:00'
    },
    {
      id: 'res_004',
      toolName: 'Tile Saw',
      toolId: 'tool_004',
      customerName: 'Lisa Davis',
      customerEmail: 'lisa.davis@email.com',
      customerPhone: '(801) 555-0321',
      startDate: '2024-02-16',
      endDate: '2024-02-17',
      status: 'confirmed',
      total: 39.98,
      deposit: 75.00,
      accessCode: 'TS2024',
      createdAt: '2024-02-14T11:15:00Z',
      pickupTime: '08:30',
      returnTime: '18:30'
    },
    {
      id: 'res_005',
      toolName: 'Zero Turn Mower',
      toolId: 'tool_005',
      customerName: 'Robert Brown',
      customerEmail: 'rob.brown@email.com',
      customerPhone: '(801) 555-0654',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      status: 'overdue',
      total: 89.97,
      deposit: 150.00,
      accessCode: 'ZT2024',
      createdAt: '2024-02-09T13:20:00Z',
      pickupTime: '06:00',
      returnTime: '20:00'
    }
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setReservations(mockReservations)
      setLoading(false)
    }, 500)
  }, [])

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch =
      reservation.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !statusFilter || reservation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'pending': return 'Pending'
      case 'confirmed': return 'Confirmed'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
      case 'overdue': return 'Overdue'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservation Management</h1>
          <p className="text-gray-600">Manage all tool reservations and bookings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{reservations.length}</div>
            <p className="text-xs text-muted-foreground">Total Reservations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {reservations.filter(r => r.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {reservations.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {reservations.filter(r => r.status === 'confirmed').length}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {reservations.filter(r => r.status === 'overdue').length}
            </div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by tool, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Reservations ({filteredReservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading reservations...</div>
          ) : filteredReservations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No reservations found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Reservation</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Dates</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Access Code</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{reservation.toolName}</div>
                          <div className="text-sm text-gray-500">#{reservation.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                          <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">
                            {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.pickupTime} - {reservation.returnTime}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(reservation.status)}>
                          {getStatusLabel(reservation.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{formatCurrency(reservation.total)}</div>
                          <div className="text-sm text-gray-500">
                            Deposit: {formatCurrency(reservation.deposit)}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {reservation.accessCode ? (
                          <Badge variant="outline" className="font-mono">
                            {reservation.accessCode}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}