import { AdminNavigation } from '@/components/admin/admin-navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication is now handled by middleware
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      {/* Main Content */}
      <div className="pl-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}