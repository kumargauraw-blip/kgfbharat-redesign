import fs from 'fs/promises';
import path from 'path';
import { Course } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'courses.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE_PATH);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Read all courses
export async function getCourses(): Promise<Course[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data) as Course[];
    } catch (error) {
        // If file doesn't exist, return empty array or default data
        return [];
    }
}

// Get single course by slug
export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
    const courses = await getCourses();
    return courses.find(c => c.slug === slug);
}

// Save courses (overwrite)
export async function saveCourses(courses: Course[]): Promise<void> {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(courses, null, 2), 'utf-8');
}

// Add or Update a course
export async function upsertCourse(course: Course): Promise<void> {
    const courses = await getCourses();
    const index = courses.findIndex(c => c.id === course.id);

    if (index >= 0) {
        courses[index] = { ...courses[index], ...course, updatedAt: new Date().toISOString() };
    } else {
        courses.push({ ...course, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    await saveCourses(courses);
}

// Delete a course
export async function deleteCourse(id: string): Promise<void> {
    let courses = await getCourses();
    courses = courses.filter(c => c.id !== id);
    await saveCourses(courses);
}
