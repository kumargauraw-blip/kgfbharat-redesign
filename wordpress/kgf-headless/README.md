# KGF Bharat Headless CMS

WordPress plugin that provides Custom Post Types and REST API endpoints for the KGF Bharat headless Next.js frontend.

## Requirements

- WordPress 6.0 or higher
- PHP 8.0 or higher
- Advanced Custom Fields (optional, but recommended for enhanced editing)

## Installation

1. Copy the `kgf-headless` directory to `wp-content/plugins/` on your WordPress installation.
2. Activate the plugin from the WordPress admin Plugins page.
3. The plugin automatically registers all Custom Post Types and REST API endpoints upon activation.

## Custom Post Types

The plugin registers five Custom Post Types:

| Post Type         | Label        | Admin Menu Icon            |
|-------------------|--------------|----------------------------|
| `kgf_course`      | Courses      | dashicons-welcome-learn-more |
| `kgf_event`       | Events       | dashicons-calendar-alt     |
| `kgf_batch`       | Batches      | dashicons-groups           |
| `kgf_gallery`     | Gallery      | dashicons-format-gallery   |
| `kgf_testimonial` | Testimonials | dashicons-format-quote     |

All CPTs support: title, editor, thumbnail, custom-fields, excerpt.

## REST API Endpoints

All custom endpoints are registered under the `kgf/v1` namespace.

### Courses

**GET** `/wp-json/kgf/v1/courses`

Returns all published courses with meta fields.

Example response:
```json
[
  {
    "id": "42",
    "slug": "ai-fundamentals-productivity",
    "title": "AI Fundamentals for 10X Productivity",
    "tagline": "Boost your personal and professional productivity tenfold.",
    "description": "Master the basics of AI tools...",
    "targetAudience": ["Everyone"],
    "status": "Active",
    "price": "4,999",
    "duration": "4 Weeks",
    "format": "Online",
    "thumbnailUrl": null,
    "overview": "Master the basics of AI tools...",
    "curriculum": ["Intro to LLMs", "Prompt Engineering"],
    "learningOutcomes": ["Master ChatGPT", "Automate Emails"],
    "instructorBio": "",
    "faq": [
      {
        "question": "Do I need any prior experience?",
        "answer": "No. This course is designed for beginners."
      }
    ],
    "createdAt": "2026-02-08T06:58:58",
    "updatedAt": "2026-02-08T06:58:58"
  }
]
```

**GET** `/wp-json/kgf/v1/courses/{slug}`

Returns a single course by its `kgf_slug` meta field value.

**GET** `/wp-json/kgf/v1/courses/{slug}/batches`

Returns all batches associated with a course. The course is identified by slug, and batches are linked via the `kgf_course_id` meta field.

### Events

**GET** `/wp-json/kgf/v1/events`

Returns all published events with meta fields.

Example response:
```json
[
  {
    "id": "55",
    "title": "Sanatana Tech Summit 2026",
    "slug": "sanatana-tech-summit-2026",
    "description": "A two-day technology summit...",
    "date": "2026-05-22",
    "endDate": "2026-05-23",
    "time": "9:00 AM - 6:00 PM IST",
    "location": "HICC Convention Centre, Hyderabad",
    "type": "upcoming",
    "category": "conference",
    "imageUrl": null,
    "registrationUrl": "https://kgfbharat.org/register/sanatana-tech-summit",
    "highlights": []
  }
]
```

**GET** `/wp-json/kgf/v1/events/{slug}`

Returns a single event by its `kgf_slug` meta field value.

### Gallery

**GET** `/wp-json/kgf/v1/gallery`

Returns all published gallery items. Supports an optional `category` query parameter.

Example: `/wp-json/kgf/v1/gallery?category=Awards`

Example response:
```json
[
  {
    "id": "70",
    "title": "Dharmalankaran 2025 Award Ceremony",
    "description": "The prestigious awards ceremony...",
    "type": "photo",
    "url": "/images/gallery/dharmalankaran-ceremony.jpg",
    "thumbnailUrl": "/images/gallery/dharmalankaran-ceremony.jpg",
    "category": "Awards",
    "date": "2025-12-14"
  }
]
```

### Testimonials

**GET** `/wp-json/kgf/v1/testimonials`

Returns all published testimonials. Supports an optional `course_slug` query parameter.

Example: `/wp-json/kgf/v1/testimonials?course_slug=ai-fundamentals-productivity`

Example response:
```json
[
  {
    "id": "80",
    "name": "Rajesh Sharma",
    "role": "Senior Developer",
    "company": "TCS",
    "content": "This course transformed my approach...",
    "courseSlug": "ai-fundamentals-productivity",
    "rating": 5,
    "imageUrl": null
  }
]
```

## Meta Fields

Each CPT has associated meta fields registered via `register_post_meta()` with `show_in_rest` enabled. These fields are available through both the default WP REST API and the custom `kgf/v1` endpoints.

Array-type fields (targetAudience, curriculum, learningOutcomes, faq, highlights) are stored as JSON-encoded strings and decoded in the custom API response.

## CORS Configuration

The plugin configures CORS headers for the following origins:

- `https://kgfbharat.org`
- `https://www.kgfbharat.org`
- `http://localhost:3000` (for local development)

Allowed methods: GET, POST, OPTIONS
Allowed headers: Content-Type, Authorization

To add or modify allowed origins, edit the `$allowed_origins` array in `kgf-headless.php`.

## ACF Integration

If Advanced Custom Fields (ACF) is installed and active, the plugin automatically includes ACF field data in standard WP REST API responses under the `acf` key. This works for all five CPTs.

You can use ACF to add additional fields without modifying plugin code. The custom `kgf/v1` endpoints use `register_post_meta` fields directly, so ACF is optional.

## Importing Sample Data

### Via WordPress Admin

1. Go to **Tools > KGF Sample Data** in the WordPress admin.
2. Click "Import Sample Data" to create sample posts for all CPTs.

### Via WP-CLI

```bash
wp kgf import-sample-data
```

This creates:
- 6 courses (1 Active, 5 Planned)
- 3 batches (all for the first course)
- 6 events (3 past, 3 upcoming)
- 10 gallery items (8 photos, 2 videos)
- 4 testimonials

The sample data matches the JSON files used by the Next.js frontend during development.

## Directory Structure

```
kgf-headless/
  kgf-headless.php        Main plugin file (CPTs, meta, CORS, REST routes)
  includes/
    sample-data.php        Sample data importer (admin page + WP-CLI)
  README.md                This file
```
