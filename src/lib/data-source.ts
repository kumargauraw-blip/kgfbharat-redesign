import * as wp from './wordpress';
import * as fallback from './wp-fallback';
import type { Course, Batch, Event, GalleryItem, Testimonial } from './types';

const useWordPress = !!process.env.WORDPRESS_API_URL;

export async function getCourses(): Promise<Course[]> {
  if (!useWordPress) return fallback.getCourses();
  try {
    return await wp.wpGetCourses();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getCourses();
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  if (!useWordPress) return fallback.getCourseBySlug(slug);
  try {
    return await wp.wpGetCourseBySlug(slug);
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getCourseBySlug(slug);
  }
}

export async function getEvents(): Promise<Event[]> {
  if (!useWordPress) return fallback.getEvents();
  try {
    return await wp.wpGetEvents();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getEvents();
  }
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  if (!useWordPress) return fallback.getEventBySlug(slug);
  try {
    return await wp.wpGetEventBySlug(slug);
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getEventBySlug(slug);
  }
}

export async function getBatches(): Promise<Batch[]> {
  if (!useWordPress) return fallback.getBatches();
  try {
    return await wp.wpGetBatches();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getBatches();
  }
}

export async function getBatchesByCourseId(courseId: string): Promise<Batch[]> {
  if (!useWordPress) return fallback.getBatchesByCourseId(courseId);
  try {
    return await wp.wpGetBatchesByCourseId(courseId);
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getBatchesByCourseId(courseId);
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!useWordPress) return fallback.getGalleryItems();
  try {
    return await wp.wpGetGalleryItems();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getGalleryItems();
  }
}

export async function getGalleryCategories(): Promise<string[]> {
  if (!useWordPress) return fallback.getGalleryCategories();
  try {
    return await wp.wpGetGalleryCategories();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getGalleryCategories();
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!useWordPress) return fallback.getTestimonials();
  try {
    return await wp.wpGetTestimonials();
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getTestimonials();
  }
}

export async function getTestimonialsByCourseSlug(courseSlug: string): Promise<Testimonial[]> {
  if (!useWordPress) return fallback.getTestimonialsByCourseSlug(courseSlug);
  try {
    return await wp.wpGetTestimonialsByCourseSlug(courseSlug);
  } catch (error) {
    console.error('WordPress API error, using fallback:', error);
    return fallback.getTestimonialsByCourseSlug(courseSlug);
  }
}
