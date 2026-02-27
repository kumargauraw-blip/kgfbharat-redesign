import fs from 'fs/promises';
import path from 'path';
import { Batch } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'batches.json');

async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE_PATH);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

export async function getBatches(): Promise<Batch[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data) as Batch[];
    } catch {
        return [];
    }
}

export async function getBatchesByCourseId(courseId: string): Promise<Batch[]> {
    const batches = await getBatches();
    return batches.filter(b => b.courseId === courseId);
}

export async function saveBatches(batches: Batch[]): Promise<void> {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(batches, null, 2), 'utf-8');
}

export async function upsertBatch(batch: Batch): Promise<void> {
    const batches = await getBatches();
    const index = batches.findIndex(b => b.id === batch.id);

    if (index >= 0) {
        batches[index] = { ...batches[index], ...batch };
    } else {
        batches.push(batch);
    }

    await saveBatches(batches);
}

export async function deleteBatch(id: string): Promise<void> {
    let batches = await getBatches();
    batches = batches.filter(b => b.id !== id);
    await saveBatches(batches);
}
