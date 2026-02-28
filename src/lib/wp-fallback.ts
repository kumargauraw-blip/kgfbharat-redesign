// Re-export existing JSON-based service functions as fallback
export { getCourses, getCourseBySlug } from './courseService';
export { getBatches, getBatchesByCourseId } from './batchService';
export { getEvents, getEventBySlug } from './eventService';
export { getGalleryItems, getGalleryCategories } from './galleryService';
export { getTestimonials, getTestimonialsByCourseSlug } from './testimonialService';
