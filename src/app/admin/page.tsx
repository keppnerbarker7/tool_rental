import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Wrench,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Mock data - in production, fetch from your database
  const stats = {
    totalTools: 62,
    availableTools: 45,
    activeReservations: 17,
    totalUsers: 234,
    monthlyRevenue: 12450,
    maintenanceAlerts: 3
  }

  const recentReservations = [
    {
      id: 'res_001',
      toolName: 'Pressure Washer 2000 PSI',
      customerName: 'John Smith',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      status: 'active',
      total: 29.99
    },
    {
      id: 'res_002',
      toolName: 'Concrete Mixer',
      customerName: 'Sarah Johnson',
      startDate: '2024-02-14',
      endDate: '2024-02-18',
      status: 'pending',
      total: 159.96
    },
    {
      id: 'res_003',
      toolName: 'Chainsaw 18"',
      customerName: 'Mike Wilson',
      startDate: '2024-02-13',
      endDate: '2024-02-13',
      status: 'completed',
      total: 45.00
    }
  ]

  const maintenanceAlerts = [
    {
      id: 'alert_001',
      toolName: 'Zero Turn Mower',
      issue: 'Scheduled maintenance due',
      priority: 'medium'
    },
    {
      id: 'alert_002',
      toolName: 'Demolition Hammer',
      issue: 'Reported vibration issue',
      priority: 'high'
    },
    {
      id: 'alert_003',
      toolName: 'Tile Saw',
      issue: 'Blade replacement needed',
      priority: 'low'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to Utah Valley Tool Rental admin</p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href="/admin/tools/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTools}</div>
            <div className="text-xs text-muted-foreground">
              {stats.availableTools} available
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeReservations}</div>
            <div className="text-xs text-muted-foreground">
              Currently rented
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">
              Registered customers
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.3%</div>
            <div className="text-xs text-muted-foreground">
              vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.maintenanceAlerts}</div>
            <div className="text-xs text-muted-foreground">
              Need attention
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Reservations
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/reservations">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{reservation.toolName}</h4>
                    <p className="text-sm text-gray-600">{reservation.customerName}</p>
                    <p className="text-xs text-gray-500">
                      {reservation.startDate} to {reservation.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        reservation.status === 'active' ? 'default' :
                        reservation.status === 'pending' ? 'secondary' : 'outline'
                      }
                      className="mb-2"
                    >
                      {reservation.status}
                    </Badge>
                    <p className="font-medium">${reservation.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Maintenance Alerts
              <Button variant="outline" size="sm">
                Manage All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{alert.toolName}</h4>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                  <Badge
                    variant={
                      alert.priority === 'high' ? 'destructive' :
                      alert.priority === 'medium' ? 'secondary' : 'outline'
                    }
                  >
                    {alert.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}