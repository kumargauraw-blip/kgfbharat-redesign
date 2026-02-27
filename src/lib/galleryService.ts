import fs from 'fs/promises';
import path from 'path';
import { GalleryItem } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'gallery.json');

async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE_PATH);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data) as GalleryItem[];
    } catch {
        return [];
    }
}

export async function getGalleryCategories(): Promise<string[]> {
    const items = await getGalleryItems();
    const categories = new Set(items.map(item => item.category));
    return ['All', ...Array.from(categories)];
}
