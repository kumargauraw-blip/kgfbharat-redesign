import Link from "next/link"
import { LayoutDashboard, BookOpen, Users, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal text-white flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold font-heading">KGF Admin</h1>
                    <p className="text-xs text-saffron opacity-80">Content Management</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/courses" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-saffron transition-colors">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">Courses</span>
                    </Link>
                    <Link href="/admin/batches" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">Batches</span>
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Inquiries</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <Link href="/api/auth/signout" className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
