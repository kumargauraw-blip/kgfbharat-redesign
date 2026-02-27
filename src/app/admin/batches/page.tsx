import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchBatches, fetchCourses } from "@/app/actions"

export const dynamic = "force-dynamic"

export default async function AdminBatchesPage() {
    const [batches, courses] = await Promise.all([
        fetchBatches(),
        fetchCourses(),
    ])

    const courseMap = new Map(courses.map(c => [c.id, c.title]))

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Batches</h1>
                    <p className="text-gray-500">Manage batch schedules for your courses</p>
                </div>
                <Button asChild>
                    <Link href="/admin/batches/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New Batch
                    </Link>
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {batches.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No batches found. Create your first batch!
                                </td>
                            </tr>
                        ) : (
                            batches.map((batch) => (
                                <tr key={batch.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {courseMap.get(batch.courseId) || "Unknown Course"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {batch.batchNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(batch.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                        {" - "}
                                        {new Date(batch.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            batch.status === "Enrolling"
                                                ? "bg-green-100 text-green-800"
                                                : batch.status === "Upcoming"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : batch.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                        }`}>
                                            {batch.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {batch.seatsRemaining != null && batch.maxSeats != null
                                            ? `${batch.seatsRemaining}/${batch.maxSeats}`
                                            : "N/A"
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/batches/${batch.id}/edit`}>
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                'use server'
                                                const { deleteBatchAction } = await import("@/app/actions")
                                                await deleteBatchAction(batch.id)
                                            }}>
                                                <Button variant="ghost" size="icon" type="submit">
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
