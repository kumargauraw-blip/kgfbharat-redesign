import fs from 'fs/promises';
import path from 'path';
import { Testimonial } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'testimonials.json');

async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE_PATH);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data) as Testimonial[];
    } catch {
        return [];
    }
}

export async function getTestimonialsByCourseSlug(courseSlug: string): Promise<Testimonial[]> {
    const testimonials = await getTestimonials();
    return testimonials.filter(t => t.courseSlug === courseSlug);
}
