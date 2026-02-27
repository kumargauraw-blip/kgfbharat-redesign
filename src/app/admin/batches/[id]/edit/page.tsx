import { notFound } from "next/navigation"
import BatchForm from "@/components/admin/BatchForm"
import { getBatches } from "@/lib/batchService"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditBatchPage({ params }: PageProps) {
    const { id } = await params
    const batches = await getBatches()
    const batch = batches.find((b) => b.id === id)

    if (!batch) {
        notFound()
    }

    return <BatchForm initialData={batch} />
}
