import { AdminNavigation } from '@/components/admin/admin-navigation'
import { AdminAuthProvider } from '@/contexts/admin-auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        {/* Main Content */}
        <div className="pl-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  )
}