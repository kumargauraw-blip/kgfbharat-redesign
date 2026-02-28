import type { Course, Batch, Event, GalleryItem, Testimonial, FAQ, CourseFormat, CourseStatus, TargetAudience } from './types';

const WP_API_URL = process.env.WORDPRESS_API_URL || '';
const REVALIDATE = parseInt(process.env.WORDPRESS_API_REVALIDATE || '300', 10);

// WordPress REST API response types

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  date: string;
  modified: string;
  acf?: Record<string, any>;
  meta?: Record<string, any>;
}

// Helper to strip HTML tags from WP rendered content
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper to get a field value from ACF or meta
function getField(post: WPPost, field: string, fallback: any = ''): any {
  if (post.acf && post.acf[field] !== undefined && post.acf[field] !== null) {
    return post.acf[field];
  }
  if (post.meta && post.meta[field] !== undefined && post.meta[field] !== null) {
    return post.meta[field];
  }
  return fallback;
}

// Safely parse a JSON string field or return the value if already parsed
function safeJsonParse(value: any, fallback: any = []): any {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

// Fetch helper with revalidation
async function wpFetch<T>(endpoint: string): Promise<T> {
  const separator = endpoint.startsWith('/') ? '' : '/';
  const url = `${WP_API_URL}${separator}${endpoint}`;

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} for ${url}`);
  }

  return res.json() as Promise<T>;
}

// Try custom KGF endpoint first, fall back to standard WP REST API
async function wpFetchWithFallback<T>(customPath: string, standardPath: string): Promise<T> {
  try {
    return await wpFetch<T>(`/wp-json/kgf/v1/${customPath}`);
  } catch {
    return await wpFetch<T>(`/wp-json/wp/v2/${standardPath}?per_page=100`);
  }
}

// ---- Mappers ----

function mapWPCourse(wp: WPPost): Course {
  const description = stripHtml(wp.content?.rendered || '');

  return {
    id: String(wp.id),
    slug: wp.slug,
    title: stripHtml(wp.title?.rendered || ''),
    tagline: getField(wp, 'tagline', ''),
    description,
    targetAudience: safeJsonParse(getField(wp, 'target_audience', []), []) as TargetAudience[],
    status: (getField(wp, 'status', 'Active') || 'Active') as CourseStatus,
    price: getField(wp, 'price', ''),
    duration: getField(wp, 'duration', ''),
    format: (getField(wp, 'format', 'Online') || 'Online') as CourseFormat,
    thumbnailUrl: getField(wp, 'thumbnail_url') || undefined,
    overview: getField(wp, 'overview', '') || description,
    curriculum: safeJsonParse(getField(wp, 'curriculum', []), []),
    learningOutcomes: safeJsonParse(getField(wp, 'learning_outcomes', []), []),
    instructorBio: getField(wp, 'instructor_bio') || undefined,
    faq: safeJsonParse(getField(wp, 'faq', []), []) as FAQ[],
    createdAt: wp.date,
    updatedAt: wp.modified,
  };
}

function mapWPBatch(wp: WPPost): Batch {
  return {
    id: String(wp.id),
    courseId: getField(wp, 'course_id', ''),
    batchNumber: getField(wp, 'batch_number', ''),
    startDate: getField(wp, 'start_date', ''),
    endDate: getField(wp, 'end_date', ''),
    format: (getField(wp, 'format', 'Online') || 'Online') as CourseFormat,
    location: getField(wp, 'location') || undefined,
    price: getField(wp, 'price', ''),
    enrollmentUrl: getField(wp, 'enrollment_url', ''),
    status: getField(wp, 'status', 'Upcoming') as Batch['status'],
    maxSeats: getField(wp, 'max_seats') ? Number(getField(wp, 'max_seats')) : undefined,
    seatsRemaining: getField(wp, 'seats_remaining') ? Number(getField(wp, 'seats_remaining')) : undefined,
  };
}

function mapWPEvent(wp: WPPost): Event {
  return {
    id: String(wp.id),
    title: stripHtml(wp.title?.rendered || ''),
    slug: wp.slug,
    description: stripHtml(wp.content?.rendered || ''),
    date: getField(wp, 'date', wp.date),
    endDate: getField(wp, 'end_date') || undefined,
    time: getField(wp, 'time', ''),
    location: getField(wp, 'location', ''),
    type: (getField(wp, 'event_type', 'upcoming') || 'upcoming') as Event['type'],
    category: (getField(wp, 'category', 'conference') || 'conference') as Event['category'],
    imageUrl: getField(wp, 'image_url') || undefined,
    registrationUrl: getField(wp, 'registration_url') || undefined,
    highlights: safeJsonParse(getField(wp, 'highlights', []), []),
  };
}

function mapWPGalleryItem(wp: WPPost): GalleryItem {
  return {
    id: String(wp.id),
    title: stripHtml(wp.title?.rendered || ''),
    description: getField(wp, 'description') || stripHtml(wp.content?.rendered || '') || undefined,
    type: (getField(wp, 'media_type', 'photo') || 'photo') as GalleryItem['type'],
    url: getField(wp, 'url', ''),
    thumbnailUrl: getField(wp, 'thumbnail_url') || undefined,
    category: getField(wp, 'category', ''),
    date: getField(wp, 'date', wp.date),
  };
}

function mapWPTestimonial(wp: WPPost): Testimonial {
  return {
    id: String(wp.id),
    name: getField(wp, 'name', stripHtml(wp.title?.rendered || '')),
    role: getField(wp, 'role', ''),
    company: getField(wp, 'company') || undefined,
    content: getField(wp, 'content', '') || stripHtml(wp.content?.rendered || ''),
    courseSlug: getField(wp, 'course_slug') || undefined,
    rating: Number(getField(wp, 'rating', 5)) || 5,
    imageUrl: getField(wp, 'image_url') || undefined,
  };
}

// ---- Public API ----

export async function wpGetCourses(): Promise<Course[]> {
  const posts = await wpFetchWithFallback<WPPost[]>('courses', 'kgf_course');
  return posts.map(mapWPCourse);
}

export async function wpGetCourseBySlug(slug: string): Promise<Course | undefined> {
  try {
    const posts = await wpFetch<WPPost[]>(`/wp-json/kgf/v1/courses?slug=${encodeURIComponent(slug)}`);
    if (posts.length > 0) return mapWPCourse(posts[0]);
  } catch {
    // Fall through to standard endpoint
  }

  try {
    const posts = await wpFetch<WPPost[]>(`/wp-json/wp/v2/kgf_course?slug=${encodeURIComponent(slug)}`);
    if (posts.length > 0) return mapWPCourse(posts[0]);
  } catch {
    // No result
  }

  return undefined;
}

export async function wpGetEvents(): Promise<Event[]> {
  const posts = await wpFetchWithFallback<WPPost[]>('events', 'kgf_event');
  return posts.map(mapWPEvent);
}

export async function wpGetEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const posts = await wpFetch<WPPost[]>(`/wp-json/kgf/v1/events?slug=${encodeURIComponent(slug)}`);
    if (posts.length > 0) return mapWPEvent(posts[0]);
  } catch {
    // Fall through
  }

  try {
    const posts = await wpFetch<WPPost[]>(`/wp-json/wp/v2/kgf_event?slug=${encodeURIComponent(slug)}`);
    if (posts.length > 0) return mapWPEvent(posts[0]);
  } catch {
    // No result
  }

  return undefined;
}

export async function wpGetBatches(): Promise<Batch[]> {
  const posts = await wpFetchWithFallback<WPPost[]>('batches', 'kgf_batch');
  return posts.map(mapWPBatch);
}

export async function wpGetBatchesByCourseId(courseId: string): Promise<Batch[]> {
  const allBatches = await wpGetBatches();
  return allBatches.filter(b => b.courseId === courseId);
}

export async function wpGetGalleryItems(): Promise<GalleryItem[]> {
  const posts = await wpFetchWithFallback<WPPost[]>('gallery', 'kgf_gallery');
  return posts.map(mapWPGalleryItem);
}

export async function wpGetGalleryCategories(): Promise<string[]> {
  const items = await wpGetGalleryItems();
  const categories = new Set(items.map(item => item.category));
  return ['All', ...Array.from(categories)];
}

export async function wpGetTestimonials(): Promise<Testimonial[]> {
  const posts = await wpFetchWithFallback<WPPost[]>('testimonials', 'kgf_testimonial');
  return posts.map(mapWPTestimonial);
}

export async function wpGetTestimonialsByCourseSlug(courseSlug: string): Promise<Testimonial[]> {
  const allTestimonials = await wpGetTestimonials();
  return allTestimonials.filter(t => t.courseSlug === courseSlug);
}
