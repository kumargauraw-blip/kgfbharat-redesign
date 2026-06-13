import Image from "next/image"
import { Lock, Award } from "lucide-react"

export const metadata = {
    title: "Admin Login",
}

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; from?: string }>
}) {
    const params = await searchParams
    const from = params.from ?? ""
    const hasError = params.error === "1"

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-8">
                <div className="flex flex-col items-center text-center mb-6">
                    <Image src="/kgf-new-logo.png" alt="KGF Bharat" width={72} height={72} className="mb-3" />
                    <h1 className="text-2xl font-bold text-gray-900">KGF Admin</h1>
                    <p className="text-sm text-gray-500">Authorized personnel only</p>
                </div>

                <form action="/api/auth/login" method="POST" className="space-y-4">
                    {from && <input type="hidden" name="from" value={from} />}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoFocus
                                required
                                placeholder="Enter admin password"
                                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange"
                            />
                        </div>
                    </div>

                    {hasError && <p className="text-sm text-red-600">Incorrect password. Please try again.</p>}

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-navy text-white font-medium py-2.5 hover:bg-navy/90 transition-colors"
                    >
                        <Award className="h-4 w-4" />
                        Sign In to Generate Certificate
                    </button>
                </form>
            </div>
        </div>
    )
}
