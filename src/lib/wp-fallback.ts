// Re-export existing JSON-based service functions as fallback
export { getCourses, getCourseBySlug } from './courseService';
export { getBatches, getBatchesByCourseId } from './batchService';
export { getEvents, getEventBySlug } from './eventService';
export { getGalleryItems, getGalleryCategories } from './galleryService';
export { getTestimonials, getTestimonialsByCourseSlug } from './testimonialService';

import type { News } from './types';
import { promises as fs } from 'fs';
import path from 'path';

export async function getNews(): Promise<News[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as News[];
  } catch {
    return [];
  }
}
