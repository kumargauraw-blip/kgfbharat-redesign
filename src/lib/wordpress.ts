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
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} for ${url}`);
  }

  return res.json() as Promise<T>;
}

// Fetch from custom KGF endpoint (returns pre-formatted data)
async function wpFetchCustom<T>(path: string): Promise<T> {
  return wpFetch<T>(`/wp-json/kgf/v1/${path}`);
}

// Fetch from standard WP REST API (returns WPPost format)
async function wpFetchStandard<T>(path: string): Promise<T> {
  return wpFetch<T>(`/wp-json/wp/v2/${path}?per_page=100`);
}

// ---- Mappers ----

function mapWPCourse(wp: WPPost): Course {
  const description = stripHtml(wp.content?.rendered || '');

  return {
    id: String(wp.id),
    slug: getField(wp, 'kgf_slug', '') || wp.slug,
    title: stripHtml(wp.title?.rendered || ''),
    tagline: getField(wp, 'kgf_tagline', ''),
    description,
    targetAudience: safeJsonParse(getField(wp, 'kgf_target_audience', []), []) as TargetAudience[],
    status: (getField(wp, 'kgf_status', 'Active') || 'Active') as CourseStatus,
    price: getField(wp, 'kgf_price', ''),
    duration: getField(wp, 'kgf_duration', ''),
    format: (getField(wp, 'kgf_format', 'Online') || 'Online') as CourseFormat,
    thumbnailUrl: getField(wp, 'thumbnail_url') || undefined,
    overview: getField(wp, 'overview', '') || description,
    curriculum: safeJsonParse(getField(wp, 'kgf_curriculum', []), []),
    learningOutcomes: safeJsonParse(getField(wp, 'kgf_learning_outcomes', []), []),
    instructorBio: getField(wp, 'kgf_instructor_bio') || undefined,
    faq: safeJsonParse(getField(wp, 'kgf_faq', []), []) as FAQ[],
    createdAt: wp.date,
    updatedAt: wp.modified,
  };
}

function mapWPBatch(wp: WPPost): Batch {
  return {
    id: String(wp.id),
    courseId: getField(wp, 'kgf_course_id', ''),
    batchNumber: getField(wp, 'kgf_batch_number', ''),
    startDate: getField(wp, 'kgf_start_date', ''),
    endDate: getField(wp, 'kgf_end_date', ''),
    format: (getField(wp, 'kgf_format', 'Online') || 'Online') as CourseFormat,
    location: getField(wp, 'kgf_location') || undefined,
    price: getField(wp, 'kgf_price', ''),
    enrollmentUrl: getField(wp, 'kgf_enrollment_url', ''),
    status: getField(wp, 'kgf_batch_status', 'Upcoming') as Batch['status'],
    maxSeats: getField(wp, 'kgf_max_seats') ? Number(getField(wp, 'kgf_max_seats')) : undefined,
    seatsRemaining: getField(wp, 'kgf_seats_remaining') ? Number(getField(wp, 'kgf_seats_remaining')) : undefined,
  };
}

function mapWPEvent(wp: WPPost): Event {
  return {
    id: String(wp.id),
    title: stripHtml(wp.title?.rendered || ''),
    slug: getField(wp, 'kgf_slug', '') || wp.slug,
    description: stripHtml(wp.content?.rendered || ''),
    date: getField(wp, 'kgf_start_date', wp.date),
    endDate: getField(wp, 'kgf_end_date') || undefined,
    time: getField(wp, 'kgf_time', ''),
    location: getField(wp, 'kgf_location', ''),
    type: (getField(wp, 'kgf_event_type', 'upcoming') || 'upcoming') as Event['type'],
    category: (getField(wp, 'kgf_event_type', 'conference') || 'conference') as Event['category'],
    imageUrl: getField(wp, 'image_url') || undefined,
    registrationUrl: getField(wp, 'kgf_registration_url') || undefined,
    highlights: safeJsonParse(getField(wp, 'kgf_highlights', []), []),
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

// ---- Custom endpoint response types (pre-formatted by kgf-headless plugin) ----

interface KGFCourseResponse {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string[];
  status: string;
  price: string;
  duration: string;
  format: string;
  thumbnailUrl: string | null;
  overview: string;
  curriculum: string[];
  learningOutcomes: string[];
  instructorBio: string;
  faq: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
}

interface KGFEventResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate: string | null;
  time: string;
  location: string;
  type: string;
  category: string;
  imageUrl: string | null;
  registrationUrl: string | null;
  highlights: string[];
}

interface KGFBatchResponse {
  id: string;
  courseId: string;
  batchNumber: string;
  startDate: string;
  endDate: string;
  format: string;
  location: string;
  price: string;
  enrollmentUrl: string;
  status: string;
  maxSeats: number | null;
  seatsRemaining: number | null;
}

interface KGFGalleryResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  thumbnailUrl: string | null;
  category: string;
  date: string;
}

interface KGFTestimonialResponse {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  courseSlug: string;
  rating: number;
  imageUrl: string | null;
}

// ---- Mappers from custom endpoint format ----

function mapKGFCourse(c: KGFCourseResponse): Course {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    tagline: c.tagline,
    description: stripHtml(c.description),
    targetAudience: (c.targetAudience || []) as TargetAudience[],
    status: (c.status || 'active') as CourseStatus,
    price: c.price,
    duration: c.duration,
    format: (c.format || 'Online') as CourseFormat,
    thumbnailUrl: c.thumbnailUrl || undefined,
    overview: c.overview || stripHtml(c.description),
    curriculum: c.curriculum || [],
    learningOutcomes: c.learningOutcomes || [],
    instructorBio: c.instructorBio || undefined,
    faq: (c.faq || []) as FAQ[],
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  };
}

function mapKGFBatch(b: KGFBatchResponse): Batch {
  return {
    id: b.id,
    courseId: b.courseId,
    batchNumber: b.batchNumber,
    startDate: b.startDate,
    endDate: b.endDate,
    format: (b.format || 'Online') as CourseFormat,
    location: b.location || undefined,
    price: b.price,
    enrollmentUrl: b.enrollmentUrl,
    status: (b.status || 'upcoming') as Batch['status'],
    maxSeats: b.maxSeats || undefined,
    seatsRemaining: b.seatsRemaining || undefined,
  };
}

function mapKGFEvent(e: KGFEventResponse): Event {
  return {
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: stripHtml(e.description),
    date: e.date,
    endDate: e.endDate || undefined,
    time: e.time,
    location: e.location,
    type: (e.type || 'upcoming') as Event['type'],
    category: (e.category || 'conference') as Event['category'],
    imageUrl: e.imageUrl || undefined,
    registrationUrl: e.registrationUrl || undefined,
    highlights: e.highlights || [],
  };
}

function mapKGFGalleryItem(g: KGFGalleryResponse): GalleryItem {
  return {
    id: g.id,
    title: g.title,
    description: g.description || undefined,
    type: (g.type || 'photo') as GalleryItem['type'],
    url: g.url,
    thumbnailUrl: g.thumbnailUrl || undefined,
    category: g.category,
    date: g.date,
  };
}

function mapKGFTestimonial(t: KGFTestimonialResponse): Testimonial {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company || undefined,
    content: t.content,
    courseSlug: t.courseSlug || undefined,
    rating: t.rating || 5,
    imageUrl: t.imageUrl || undefined,
  };
}

// ---- Public API (uses custom kgf/v1 endpoints, falls back to wp/v2 with WPPost mappers) ----

export async function wpGetCourses(): Promise<Course[]> {
  try {
    const data = await wpFetchCustom<KGFCourseResponse[]>('courses');
    return data.map(mapKGFCourse);
  } catch {
    const posts = await wpFetchStandard<WPPost[]>('kgf-courses');
    return posts.map(mapWPCourse);
  }
}

export async function wpGetCourseBySlug(slug: string): Promise<Course | undefined> {
  try {
    const data = await wpFetchCustom<KGFCourseResponse>(`courses/${encodeURIComponent(slug)}`);
    return mapKGFCourse(data);
  } catch {
    try {
      const posts = await wpFetchStandard<WPPost[]>(`kgf-courses?slug=${encodeURIComponent(slug)}`);
      if (posts.length > 0) return mapWPCourse(posts[0]);
    } catch {
      // No result
    }
  }
  return undefined;
}

export async function wpGetEvents(): Promise<Event[]> {
  try {
    const data = await wpFetchCustom<KGFEventResponse[]>('events');
    return data.map(mapKGFEvent);
  } catch {
    const posts = await wpFetchStandard<WPPost[]>('kgf-events');
    return posts.map(mapWPEvent);
  }
}

export async function wpGetEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const data = await wpFetchCustom<KGFEventResponse>(`events/${encodeURIComponent(slug)}`);
    return mapKGFEvent(data);
  } catch {
    try {
      const posts = await wpFetchStandard<WPPost[]>(`kgf-events?slug=${encodeURIComponent(slug)}`);
      if (posts.length > 0) return mapWPEvent(posts[0]);
    } catch {
      // No result
    }
  }
  return undefined;
}

export async function wpGetBatches(): Promise<Batch[]> {
  try {
    // No "all batches" custom endpoint, use standard
    const posts = await wpFetchStandard<WPPost[]>('kgf-batches');
    return posts.map(mapWPBatch);
  } catch {
    return [];
  }
}

export async function wpGetBatchesByCourseSlug(courseSlug: string): Promise<Batch[]> {
  try {
    const data = await wpFetchCustom<KGFBatchResponse[]>(`courses/${encodeURIComponent(courseSlug)}/batches`);
    return data.map(mapKGFBatch);
  } catch {
    return [];
  }
}

export async function wpGetBatchesByCourseId(courseId: string): Promise<Batch[]> {
  const allBatches = await wpGetBatches();
  return allBatches.filter(b => b.courseId === courseId);
}

export async function wpGetGalleryItems(): Promise<GalleryItem[]> {
  try {
    const data = await wpFetchCustom<KGFGalleryResponse[]>('gallery');
    return data.map(mapKGFGalleryItem);
  } catch {
    const posts = await wpFetchStandard<WPPost[]>('kgf-gallery');
    return posts.map(mapWPGalleryItem);
  }
}

export async function wpGetGalleryCategories(): Promise<string[]> {
  const items = await wpGetGalleryItems();
  const categories = new Set(items.map(item => item.category).filter(Boolean));
  return ['All', ...Array.from(categories)];
}

export async function wpGetTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await wpFetchCustom<KGFTestimonialResponse[]>('testimonials');
    return data.map(mapKGFTestimonial);
  } catch {
    const posts = await wpFetchStandard<WPPost[]>('kgf-testimonials');
    return posts.map(mapWPTestimonial);
  }
}

export async function wpGetTestimonialsByCourseSlug(courseSlug: string): Promise<Testimonial[]> {
  const allTestimonials = await wpGetTestimonials();
  return allTestimonials.filter(t => t.courseSlug === courseSlug);
}
