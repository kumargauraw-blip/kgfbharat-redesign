import fs from 'fs/promises';
import path from 'path';
import { Event } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'events.json');

async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE_PATH);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

export async function getEvents(): Promise<Event[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data) as Event[];
    } catch {
        return [];
    }
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
    const events = await getEvents();
    return events.find(e => e.slug === slug);
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const events = await getEvents();
    return events.filter(e => e.type === 'upcoming');
}

export async function getPastEvents(): Promise<Event[]> {
    const events = await getEvents();
    return events.filter(e => e.type === 'past');
}
