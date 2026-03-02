<?php
/**
 * Plugin Name: KGF Bharat Headless CMS
 * Description: Custom Post Types and REST API endpoints for the KGF Bharat headless Next.js frontend.
 * Version: 1.2.0
 * Author: KGF Bharat
 * Text Domain: kgf-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KGF_HEADLESS_VERSION', '1.2.0' );
define( 'KGF_HEADLESS_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Register Custom Post Types.
 */
function kgf_register_post_types() {

	// Courses
	register_post_type( 'kgf_course', array(
		'labels'       => array(
			'name'               => __( 'Courses', 'kgf-headless' ),
			'singular_name'      => __( 'Course', 'kgf-headless' ),
			'add_new'            => __( 'Add New Course', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New Course', 'kgf-headless' ),
			'edit_item'          => __( 'Edit Course', 'kgf-headless' ),
			'new_item'           => __( 'New Course', 'kgf-headless' ),
			'view_item'          => __( 'View Course', 'kgf-headless' ),
			'search_items'       => __( 'Search Courses', 'kgf-headless' ),
			'not_found'          => __( 'No courses found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No courses found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-courses',
		'menu_icon'    => 'dashicons-welcome-learn-more',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'courses' ),
	) );

	// Events
	register_post_type( 'kgf_event', array(
		'labels'       => array(
			'name'               => __( 'Events', 'kgf-headless' ),
			'singular_name'      => __( 'Event', 'kgf-headless' ),
			'add_new'            => __( 'Add New Event', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New Event', 'kgf-headless' ),
			'edit_item'          => __( 'Edit Event', 'kgf-headless' ),
			'new_item'           => __( 'New Event', 'kgf-headless' ),
			'view_item'          => __( 'View Event', 'kgf-headless' ),
			'search_items'       => __( 'Search Events', 'kgf-headless' ),
			'not_found'          => __( 'No events found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No events found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-events',
		'menu_icon'    => 'dashicons-calendar-alt',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'events' ),
	) );

	// Batches
	register_post_type( 'kgf_batch', array(
		'labels'       => array(
			'name'               => __( 'Batches', 'kgf-headless' ),
			'singular_name'      => __( 'Batch', 'kgf-headless' ),
			'add_new'            => __( 'Add New Batch', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New Batch', 'kgf-headless' ),
			'edit_item'          => __( 'Edit Batch', 'kgf-headless' ),
			'new_item'           => __( 'New Batch', 'kgf-headless' ),
			'view_item'          => __( 'View Batch', 'kgf-headless' ),
			'search_items'       => __( 'Search Batches', 'kgf-headless' ),
			'not_found'          => __( 'No batches found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No batches found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-batches',
		'menu_icon'    => 'dashicons-groups',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'batches' ),
	) );

	// Gallery
	register_post_type( 'kgf_gallery', array(
		'labels'       => array(
			'name'               => __( 'Gallery', 'kgf-headless' ),
			'singular_name'      => __( 'Gallery Item', 'kgf-headless' ),
			'add_new'            => __( 'Add New Gallery Item', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New Gallery Item', 'kgf-headless' ),
			'edit_item'          => __( 'Edit Gallery Item', 'kgf-headless' ),
			'new_item'           => __( 'New Gallery Item', 'kgf-headless' ),
			'view_item'          => __( 'View Gallery Item', 'kgf-headless' ),
			'search_items'       => __( 'Search Gallery', 'kgf-headless' ),
			'not_found'          => __( 'No gallery items found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No gallery items found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-gallery',
		'menu_icon'    => 'dashicons-format-gallery',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'gallery' ),
	) );

	// Testimonials
	register_post_type( 'kgf_testimonial', array(
		'labels'       => array(
			'name'               => __( 'Testimonials', 'kgf-headless' ),
			'singular_name'      => __( 'Testimonial', 'kgf-headless' ),
			'add_new'            => __( 'Add New Testimonial', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New Testimonial', 'kgf-headless' ),
			'edit_item'          => __( 'Edit Testimonial', 'kgf-headless' ),
			'new_item'           => __( 'New Testimonial', 'kgf-headless' ),
			'view_item'          => __( 'View Testimonial', 'kgf-headless' ),
			'search_items'       => __( 'Search Testimonials', 'kgf-headless' ),
			'not_found'          => __( 'No testimonials found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No testimonials found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-testimonials',
		'menu_icon'    => 'dashicons-format-quote',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'testimonials' ),
	) );

	// News
	register_post_type( 'kgf_news', array(
		'labels'       => array(
			'name'               => __( 'News', 'kgf-headless' ),
			'singular_name'      => __( 'News', 'kgf-headless' ),
			'add_new'            => __( 'Add New News', 'kgf-headless' ),
			'add_new_item'       => __( 'Add New News', 'kgf-headless' ),
			'edit_item'          => __( 'Edit News', 'kgf-headless' ),
			'new_item'           => __( 'New News', 'kgf-headless' ),
			'view_item'          => __( 'View News', 'kgf-headless' ),
			'search_items'       => __( 'Search News', 'kgf-headless' ),
			'not_found'          => __( 'No news found', 'kgf-headless' ),
			'not_found_in_trash' => __( 'No news found in trash', 'kgf-headless' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'rest_base'    => 'kgf-news',
		'menu_icon'    => 'dashicons-media-document',
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'rewrite'      => array( 'slug' => 'news' ),
	) );
}
add_action( 'init', 'kgf_register_post_types' );

/**
 * Register meta fields for each CPT.
 */
function kgf_register_meta_fields() {

	// Course meta fields (plain strings).
	$course_string_fields = array(
		'kgf_slug',
		'kgf_tagline',
		'kgf_duration',
		'kgf_format',
		'kgf_price',
		'kgf_status',
		'kgf_instructor_bio',
		'kgf_course_category',
	);

	foreach ( $course_string_fields as $field ) {
		register_post_meta( 'kgf_course', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Course meta fields (JSON-encoded strings, need wp_kses_post to preserve brackets/quotes).
	$course_json_fields = array(
		'kgf_target_audience',
		'kgf_curriculum',
		'kgf_learning_outcomes',
		'kgf_faq',
	);
	foreach ( $course_json_fields as $field ) {
		register_post_meta( 'kgf_course', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'wp_kses_post',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Event meta fields (plain strings).
	$event_string_fields = array(
		'kgf_slug',
		'kgf_event_type',
		'kgf_start_date',
		'kgf_end_date',
		'kgf_time',
		'kgf_location',
		'kgf_venue',
		'kgf_registration_url',
		'kgf_event_status',
	);

	foreach ( $event_string_fields as $field ) {
		register_post_meta( 'kgf_event', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Event JSON-encoded field.
	register_post_meta( 'kgf_event', 'kgf_highlights', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'wp_kses_post',
		'auth_callback'     => function () {
			return current_user_can( 'edit_posts' );
		},
	) );

	// Batch meta fields.
	$batch_string_fields = array(
		'kgf_course_id',
		'kgf_batch_number',
		'kgf_start_date',
		'kgf_end_date',
		'kgf_format',
		'kgf_location',
		'kgf_price',
		'kgf_enrollment_url',
		'kgf_batch_status',
	);

	foreach ( $batch_string_fields as $field ) {
		register_post_meta( 'kgf_batch', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Batch integer fields.
	$batch_int_fields = array( 'kgf_max_seats', 'kgf_seats_remaining' );
	foreach ( $batch_int_fields as $field ) {
		register_post_meta( 'kgf_batch', $field, array(
			'type'              => 'integer',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'absint',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Gallery meta fields.
	$gallery_fields = array(
		'kgf_image_url',
		'kgf_category',
		'kgf_event_name',
		'kgf_date',
		'kgf_media_type',
		'kgf_video_url',
	);

	foreach ( $gallery_fields as $field ) {
		register_post_meta( 'kgf_gallery', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	// Testimonial meta fields.
	$testimonial_string_fields = array(
		'kgf_student_name',
		'kgf_course_name',
		'kgf_course_slug',
		'kgf_testimonial_text',
		'kgf_designation',
		'kgf_company',
	);

	foreach ( $testimonial_string_fields as $field ) {
		register_post_meta( 'kgf_testimonial', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}

	register_post_meta( 'kgf_testimonial', 'kgf_rating', array(
		'type'              => 'integer',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'absint',
		'auth_callback'     => function () {
			return current_user_can( 'edit_posts' );
		},
	) );

	// News meta fields.
	$news_string_fields = array(
		'kgf_news_url',
		'kgf_news_source',
		'kgf_news_date',
		'kgf_news_category',
	);

	foreach ( $news_string_fields as $field ) {
		register_post_meta( 'kgf_news', $field, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}
}
add_action( 'init', 'kgf_register_meta_fields' );

/**
 * CORS headers for REST API.
 */
add_action( 'rest_api_init', function () {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function ( $value ) {
		$origin          = get_http_origin();
		$allowed_origins = array(
			'https://kgfbharat.org',
			'https://www.kgfbharat.org',
			'http://localhost:3000',
		);
		if ( in_array( $origin, $allowed_origins, true ) ) {
			header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
		}
		header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
		return $value;
	} );
} );

/**
 * Helper: Decode a JSON-encoded meta value, return array or empty array.
 *
 * @param string $value The JSON string.
 * @return array
 */
function kgf_decode_json_meta( $value ) {
	if ( empty( $value ) ) {
		return array();
	}
	$decoded = json_decode( $value, true );
	if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $decoded ) ) {
		return array();
	}
	return $decoded;
}

/**
 * Helper: Get featured image URL for a post.
 *
 * @param int $post_id The post ID.
 * @return string|null
 */
function kgf_get_thumbnail_url( $post_id ) {
	$thumb_id = get_post_thumbnail_id( $post_id );
	if ( $thumb_id ) {
		$url = wp_get_attachment_url( $thumb_id );
		return $url ? $url : null;
	}
	return null;
}

/**
 * Format a course post for API response.
 *
 * @param WP_Post $post The course post.
 * @return array
 */
function kgf_format_course( $post ) {
	$meta = get_post_meta( $post->ID );

	$slug              = isset( $meta['kgf_slug'][0] ) ? $meta['kgf_slug'][0] : sanitize_title( $post->post_title );
	$tagline           = isset( $meta['kgf_tagline'][0] ) ? $meta['kgf_tagline'][0] : '';
	$duration          = isset( $meta['kgf_duration'][0] ) ? $meta['kgf_duration'][0] : '';
	$format            = isset( $meta['kgf_format'][0] ) ? $meta['kgf_format'][0] : '';
	$price             = isset( $meta['kgf_price'][0] ) ? $meta['kgf_price'][0] : '';
	$status            = isset( $meta['kgf_status'][0] ) ? $meta['kgf_status'][0] : '';
	$instructor_bio    = isset( $meta['kgf_instructor_bio'][0] ) ? $meta['kgf_instructor_bio'][0] : '';
	$course_category   = isset( $meta['kgf_course_category'][0] ) ? $meta['kgf_course_category'][0] : '';
	$target_audience   = kgf_decode_json_meta( isset( $meta['kgf_target_audience'][0] ) ? $meta['kgf_target_audience'][0] : '' );
	$curriculum        = kgf_decode_json_meta( isset( $meta['kgf_curriculum'][0] ) ? $meta['kgf_curriculum'][0] : '' );
	$learning_outcomes = kgf_decode_json_meta( isset( $meta['kgf_learning_outcomes'][0] ) ? $meta['kgf_learning_outcomes'][0] : '' );
	$faq               = kgf_decode_json_meta( isset( $meta['kgf_faq'][0] ) ? $meta['kgf_faq'][0] : '' );

	return array(
		'id'               => (string) $post->ID,
		'slug'             => $slug,
		'title'            => $post->post_title,
		'tagline'          => $tagline,
		'description'      => $post->post_content,
		'targetAudience'   => $target_audience,
		'status'           => $status,
		'price'            => $price,
		'duration'         => $duration,
		'format'           => $format,
		'courseCategory'    => $course_category,
		'thumbnailUrl'     => kgf_get_thumbnail_url( $post->ID ),
		'overview'         => wp_trim_words( $post->post_content, 55 ),
		'curriculum'       => $curriculum,
		'learningOutcomes' => $learning_outcomes,
		'instructorBio'    => $instructor_bio,
		'faq'              => $faq,
		'createdAt'        => $post->post_date_gmt,
		'updatedAt'        => $post->post_modified_gmt,
	);
}

/**
 * Format a batch post for API response.
 *
 * @param WP_Post $post The batch post.
 * @return array
 */
function kgf_format_batch( $post ) {
	$meta = get_post_meta( $post->ID );

	return array(
		'id'             => (string) $post->ID,
		'courseId'        => isset( $meta['kgf_course_id'][0] ) ? $meta['kgf_course_id'][0] : '',
		'batchNumber'    => isset( $meta['kgf_batch_number'][0] ) ? $meta['kgf_batch_number'][0] : '',
		'startDate'      => isset( $meta['kgf_start_date'][0] ) ? $meta['kgf_start_date'][0] : '',
		'endDate'        => isset( $meta['kgf_end_date'][0] ) ? $meta['kgf_end_date'][0] : '',
		'format'         => isset( $meta['kgf_format'][0] ) ? $meta['kgf_format'][0] : '',
		'location'       => isset( $meta['kgf_location'][0] ) ? $meta['kgf_location'][0] : '',
		'price'          => isset( $meta['kgf_price'][0] ) ? $meta['kgf_price'][0] : '',
		'enrollmentUrl'  => isset( $meta['kgf_enrollment_url'][0] ) ? $meta['kgf_enrollment_url'][0] : '',
		'status'         => isset( $meta['kgf_batch_status'][0] ) ? $meta['kgf_batch_status'][0] : '',
		'maxSeats'       => isset( $meta['kgf_max_seats'][0] ) ? (int) $meta['kgf_max_seats'][0] : null,
		'seatsRemaining' => isset( $meta['kgf_seats_remaining'][0] ) ? (int) $meta['kgf_seats_remaining'][0] : null,
	);
}

/**
 * Format an event post for API response.
 *
 * @param WP_Post $post The event post.
 * @return array
 */
function kgf_format_event( $post ) {
	$meta = get_post_meta( $post->ID );

	$highlights = kgf_decode_json_meta( isset( $meta['kgf_highlights'][0] ) ? $meta['kgf_highlights'][0] : '' );

	return array(
		'id'              => (string) $post->ID,
		'title'           => $post->post_title,
		'slug'            => isset( $meta['kgf_slug'][0] ) ? $meta['kgf_slug'][0] : sanitize_title( $post->post_title ),
		'description'     => $post->post_content,
		'date'            => isset( $meta['kgf_start_date'][0] ) ? $meta['kgf_start_date'][0] : '',
		'endDate'         => isset( $meta['kgf_end_date'][0] ) ? $meta['kgf_end_date'][0] : null,
		'time'            => isset( $meta['kgf_time'][0] ) ? $meta['kgf_time'][0] : '',
		'location'        => isset( $meta['kgf_location'][0] ) ? $meta['kgf_location'][0] : '',
		'type'            => isset( $meta['kgf_event_type'][0] ) ? $meta['kgf_event_type'][0] : '',
		'category'        => isset( $meta['kgf_event_status'][0] ) ? $meta['kgf_event_status'][0] : '',
		'imageUrl'        => kgf_get_thumbnail_url( $post->ID ),
		'registrationUrl' => isset( $meta['kgf_registration_url'][0] ) ? $meta['kgf_registration_url'][0] : null,
		'highlights'      => $highlights,
	);
}

/**
 * Format a gallery post for API response.
 *
 * @param WP_Post $post The gallery post.
 * @return array
 */
function kgf_format_gallery_item( $post ) {
	$meta = get_post_meta( $post->ID );

	$media_type = isset( $meta['kgf_media_type'][0] ) ? $meta['kgf_media_type'][0] : 'photo';
	$image_url  = isset( $meta['kgf_image_url'][0] ) ? $meta['kgf_image_url'][0] : '';
	$video_url  = isset( $meta['kgf_video_url'][0] ) ? $meta['kgf_video_url'][0] : '';

	// For videos, the main URL is the video URL; for photos, it is the image URL.
	$url = ( 'video' === $media_type && ! empty( $video_url ) ) ? $video_url : $image_url;

	return array(
		'id'           => (string) $post->ID,
		'title'        => $post->post_title,
		'description'  => $post->post_content,
		'type'         => $media_type,
		'url'          => $url,
		'thumbnailUrl' => kgf_get_thumbnail_url( $post->ID ) ? kgf_get_thumbnail_url( $post->ID ) : $image_url,
		'category'     => isset( $meta['kgf_category'][0] ) ? $meta['kgf_category'][0] : '',
		'date'         => isset( $meta['kgf_date'][0] ) ? $meta['kgf_date'][0] : '',
	);
}

/**
 * Format a testimonial post for API response.
 *
 * @param WP_Post $post The testimonial post.
 * @return array
 */
function kgf_format_testimonial( $post ) {
	$meta = get_post_meta( $post->ID );

	return array(
		'id'         => (string) $post->ID,
		'name'       => isset( $meta['kgf_student_name'][0] ) ? $meta['kgf_student_name'][0] : $post->post_title,
		'role'       => isset( $meta['kgf_designation'][0] ) ? $meta['kgf_designation'][0] : '',
		'company'    => isset( $meta['kgf_company'][0] ) ? $meta['kgf_company'][0] : '',
		'content'    => isset( $meta['kgf_testimonial_text'][0] ) ? $meta['kgf_testimonial_text'][0] : $post->post_content,
		'courseSlug'  => isset( $meta['kgf_course_slug'][0] ) ? $meta['kgf_course_slug'][0] : '',
		'rating'     => isset( $meta['kgf_rating'][0] ) ? (int) $meta['kgf_rating'][0] : 5,
		'imageUrl'   => kgf_get_thumbnail_url( $post->ID ),
	);
}

/**
 * Format a news post for API response.
 *
 * @param WP_Post $post The news post.
 * @return array
 */
function kgf_format_news( $post, $full = false ) {
	$meta = get_post_meta( $post->ID );

	$data = array(
		'id'          => (string) $post->ID,
		'slug'        => $post->post_name,
		'title'       => $post->post_title,
		'description' => wp_trim_words( $post->post_content, 30 ),
		'imageUrl'    => kgf_get_thumbnail_url( $post->ID ),
		'url'         => ! empty( $meta['kgf_news_url'][0] ) ? $meta['kgf_news_url'][0] : null,
		'source'      => isset( $meta['kgf_news_source'][0] ) ? $meta['kgf_news_source'][0] : '',
		'date'        => isset( $meta['kgf_news_date'][0] ) ? $meta['kgf_news_date'][0] : '',
		'category'    => isset( $meta['kgf_news_category'][0] ) ? $meta['kgf_news_category'][0] : '',
	);

	if ( $full ) {
		$data['content'] = apply_filters( 'the_content', $post->post_content );
	}

	return $data;
}

/**
 * Register custom REST API routes.
 */
function kgf_register_rest_routes() {

	$namespace = 'kgf/v1';

	// GET /courses
	register_rest_route( $namespace, '/courses', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_courses',
		'permission_callback' => '__return_true',
	) );

	// GET /courses/{slug}
	register_rest_route( $namespace, '/courses/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_course_by_slug',
		'permission_callback' => '__return_true',
		'args'                => array(
			'slug' => array(
				'required'          => true,
				'validate_callback' => function ( $param ) {
					return is_string( $param ) && preg_match( '/^[a-zA-Z0-9-]+$/', $param );
				},
			),
		),
	) );

	// GET /courses/{slug}/batches
	register_rest_route( $namespace, '/courses/(?P<slug>[a-zA-Z0-9-]+)/batches', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_course_batches',
		'permission_callback' => '__return_true',
		'args'                => array(
			'slug' => array(
				'required'          => true,
				'validate_callback' => function ( $param ) {
					return is_string( $param ) && preg_match( '/^[a-zA-Z0-9-]+$/', $param );
				},
			),
		),
	) );

	// GET /events
	register_rest_route( $namespace, '/events', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_events',
		'permission_callback' => '__return_true',
	) );

	// GET /events/{slug}
	register_rest_route( $namespace, '/events/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_event_by_slug',
		'permission_callback' => '__return_true',
		'args'                => array(
			'slug' => array(
				'required'          => true,
				'validate_callback' => function ( $param ) {
					return is_string( $param ) && preg_match( '/^[a-zA-Z0-9-]+$/', $param );
				},
			),
		),
	) );

	// GET /gallery
	register_rest_route( $namespace, '/gallery', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_gallery',
		'permission_callback' => '__return_true',
		'args'                => array(
			'category' => array(
				'required'          => false,
				'sanitize_callback' => 'sanitize_text_field',
			),
		),
	) );

	// GET /testimonials
	register_rest_route( $namespace, '/testimonials', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_testimonials',
		'permission_callback' => '__return_true',
		'args'                => array(
			'course_slug' => array(
				'required'          => false,
				'sanitize_callback' => 'sanitize_text_field',
			),
		),
	) );

	// GET /news
	register_rest_route( $namespace, '/news', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_news',
		'permission_callback' => '__return_true',
	) );

	// GET /news/{slug}
	register_rest_route( $namespace, '/news/(?P<slug>[a-zA-Z0-9_-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'kgf_rest_get_news_by_slug',
		'permission_callback' => '__return_true',
		'args'                => array(
			'slug' => array(
				'required'          => true,
				'validate_callback' => function ( $param ) {
					return is_string( $param );
				},
			),
		),
	) );
}
add_action( 'rest_api_init', 'kgf_register_rest_routes' );

/**
 * REST callback: Get all courses.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_courses( $request ) {
	$posts = get_posts( array(
		'post_type'      => 'kgf_course',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'ASC',
	) );

	$courses = array_map( 'kgf_format_course', $posts );

	return new WP_REST_Response( $courses, 200 );
}

/**
 * REST callback: Get a single course by slug meta field.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_course_by_slug( $request ) {
	$slug = $request->get_param( 'slug' );

	$posts = get_posts( array(
		'post_type'      => 'kgf_course',
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'meta_key'       => 'kgf_slug',
		'meta_value'     => sanitize_text_field( $slug ),
	) );

	if ( empty( $posts ) ) {
		return new WP_REST_Response(
			array( 'message' => 'Course not found.' ),
			404
		);
	}

	return new WP_REST_Response( kgf_format_course( $posts[0] ), 200 );
}

/**
 * REST callback: Get batches for a course identified by slug.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_course_batches( $request ) {
	$slug = $request->get_param( 'slug' );

	// First find the course to get its ID.
	$courses = get_posts( array(
		'post_type'      => 'kgf_course',
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'meta_key'       => 'kgf_slug',
		'meta_value'     => sanitize_text_field( $slug ),
	) );

	if ( empty( $courses ) ) {
		return new WP_REST_Response(
			array( 'message' => 'Course not found.' ),
			404
		);
	}

	$course_id = (string) $courses[0]->ID;

	$batches = get_posts( array(
		'post_type'      => 'kgf_batch',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'meta_key'       => 'kgf_course_id',
		'meta_value'     => $course_id,
		'orderby'        => 'meta_value',
		'order'          => 'ASC',
	) );

	$formatted = array_map( 'kgf_format_batch', $batches );

	return new WP_REST_Response( $formatted, 200 );
}

/**
 * REST callback: Get all events.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_events( $request ) {
	$posts = get_posts( array(
		'post_type'      => 'kgf_event',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$events = array_map( 'kgf_format_event', $posts );

	return new WP_REST_Response( $events, 200 );
}

/**
 * REST callback: Get a single event by slug meta field.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_event_by_slug( $request ) {
	$slug = $request->get_param( 'slug' );

	$posts = get_posts( array(
		'post_type'      => 'kgf_event',
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'meta_key'       => 'kgf_slug',
		'meta_value'     => sanitize_text_field( $slug ),
	) );

	if ( empty( $posts ) ) {
		return new WP_REST_Response(
			array( 'message' => 'Event not found.' ),
			404
		);
	}

	return new WP_REST_Response( kgf_format_event( $posts[0] ), 200 );
}

/**
 * REST callback: Get gallery items with optional category filter.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_gallery( $request ) {
	$args = array(
		'post_type'      => 'kgf_gallery',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	);

	$category = $request->get_param( 'category' );
	if ( ! empty( $category ) ) {
		$args['meta_key']   = 'kgf_category';
		$args['meta_value'] = sanitize_text_field( $category );
	}

	$posts = get_posts( $args );
	$items = array_map( 'kgf_format_gallery_item', $posts );

	return new WP_REST_Response( $items, 200 );
}

/**
 * REST callback: Get testimonials with optional course_slug filter.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_testimonials( $request ) {
	$args = array(
		'post_type'      => 'kgf_testimonial',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	);

	$course_slug = $request->get_param( 'course_slug' );
	if ( ! empty( $course_slug ) ) {
		$args['meta_key']   = 'kgf_course_slug';
		$args['meta_value'] = sanitize_text_field( $course_slug );
	}

	$posts        = get_posts( $args );
	$testimonials = array_map( 'kgf_format_testimonial', $posts );

	return new WP_REST_Response( $testimonials, 200 );
}

/**
 * REST callback: Get all news.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function kgf_rest_get_news( $request ) {
	$posts = get_posts( array(
		'post_type'      => 'kgf_news',
		'posts_per_page' => 100,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$news = array_map( 'kgf_format_news', $posts );

	return new WP_REST_Response( $news, 200 );
}

/**
 * REST callback: Get a single news item by slug (with full content).
 */
function kgf_rest_get_news_by_slug( $request ) {
	$slug  = $request->get_param( 'slug' );
	$posts = get_posts( array(
		'post_type'      => 'kgf_news',
		'name'           => $slug,
		'posts_per_page' => 1,
		'post_status'    => 'publish',
	) );

	if ( empty( $posts ) ) {
		return new WP_REST_Response( array( 'message' => 'News not found' ), 404 );
	}

	return new WP_REST_Response( kgf_format_news( $posts[0], true ), 200 );
}

/**
 * Include ACF fields in REST API responses if ACF is active.
 */
function kgf_add_acf_to_rest() {
	if ( ! function_exists( 'get_fields' ) ) {
		return;
	}

	$post_types = array( 'kgf_course', 'kgf_event', 'kgf_batch', 'kgf_gallery', 'kgf_testimonial', 'kgf_news' );

	foreach ( $post_types as $post_type ) {
		add_filter( "rest_prepare_{$post_type}", function ( $response, $post ) {
			if ( function_exists( 'get_fields' ) ) {
				$acf_fields = get_fields( $post->ID );
				if ( $acf_fields ) {
					$response->data['acf'] = $acf_fields;
				}
			}
			return $response;
		}, 10, 2 );
	}
}
add_action( 'rest_api_init', 'kgf_add_acf_to_rest' );

/**
 * Register ACF Field Groups for all KGF custom post types.
 * This gives editors a nice visual form in wp-admin.
 */
function kgf_register_acf_field_groups() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	// ── COURSES ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_course',
		'title'    => 'Course Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_slug', 'label' => 'Slug', 'name' => 'kgf_slug', 'type' => 'text', 'instructions' => 'URL-friendly slug (e.g. ai-fundamentals). Used in the frontend URL.', 'required' => 1 ),
			array( 'key' => 'field_kgf_tagline', 'label' => 'Tagline', 'name' => 'kgf_tagline', 'type' => 'text', 'instructions' => 'Short tagline shown below the title.' ),
			array( 'key' => 'field_kgf_course_category', 'label' => 'Course Category', 'name' => 'kgf_course_category', 'type' => 'select', 'choices' => array( 'dharmic' => 'Dharmic', 'ai-tech' => 'AI-Tech' ), 'default_value' => 'ai-tech', 'instructions' => 'Category for the course: Dharmic or AI-Tech.' ),
			array( 'key' => 'field_kgf_status', 'label' => 'Status', 'name' => 'kgf_status', 'type' => 'select', 'choices' => array( 'active' => 'Active', 'upcoming' => 'Upcoming', 'completed' => 'Completed', 'draft' => 'Draft' ), 'default_value' => 'active' ),
			array( 'key' => 'field_kgf_price', 'label' => 'Price (INR)', 'name' => 'kgf_price', 'type' => 'text', 'instructions' => 'Price in INR without currency symbol (e.g. 10000).' ),
			array( 'key' => 'field_kgf_duration', 'label' => 'Duration', 'name' => 'kgf_duration', 'type' => 'text', 'instructions' => 'e.g. "3 Months", "6 Weeks"' ),
			array( 'key' => 'field_kgf_format', 'label' => 'Format', 'name' => 'kgf_format', 'type' => 'text', 'instructions' => 'e.g. "Live Online + Recorded Sessions"' ),
			array( 'key' => 'field_kgf_instructor_bio', 'label' => 'Instructor Bio', 'name' => 'kgf_instructor_bio', 'type' => 'textarea', 'rows' => 3 ),
			array( 'key' => 'field_kgf_target_audience', 'label' => 'Target Audience', 'name' => 'kgf_target_audience', 'type' => 'textarea', 'instructions' => 'JSON array of strings, e.g. ["Students", "Professionals"]', 'rows' => 3 ),
			array( 'key' => 'field_kgf_curriculum', 'label' => 'Curriculum', 'name' => 'kgf_curriculum', 'type' => 'textarea', 'instructions' => 'JSON array of strings. Each item is a curriculum point.', 'rows' => 5 ),
			array( 'key' => 'field_kgf_learning_outcomes', 'label' => 'Learning Outcomes', 'name' => 'kgf_learning_outcomes', 'type' => 'textarea', 'instructions' => 'JSON array of strings. Each item is a learning outcome.', 'rows' => 5 ),
			array( 'key' => 'field_kgf_faq', 'label' => 'FAQ', 'name' => 'kgf_faq', 'type' => 'textarea', 'instructions' => 'JSON array of objects: [{"question":"...","answer":"..."}]', 'rows' => 5 ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_course' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
		'menu_order' => 0,
	) );

	// ── EVENTS ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_event',
		'title'    => 'Event Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_event_slug', 'label' => 'Slug', 'name' => 'kgf_slug', 'type' => 'text', 'instructions' => 'URL-friendly slug.', 'required' => 1 ),
			array( 'key' => 'field_kgf_event_type', 'label' => 'Event Type', 'name' => 'kgf_event_type', 'type' => 'select', 'choices' => array( 'workshop' => 'Workshop', 'seminar' => 'Seminar', 'webinar' => 'Webinar', 'conference' => 'Conference', 'cultural' => 'Cultural', 'other' => 'Other' ) ),
			array( 'key' => 'field_kgf_event_start', 'label' => 'Start Date', 'name' => 'kgf_start_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_event_end', 'label' => 'End Date', 'name' => 'kgf_end_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_event_time', 'label' => 'Time', 'name' => 'kgf_time', 'type' => 'text', 'instructions' => 'e.g. "10:00 AM - 4:00 PM IST"' ),
			array( 'key' => 'field_kgf_event_location', 'label' => 'Location', 'name' => 'kgf_location', 'type' => 'text' ),
			array( 'key' => 'field_kgf_event_venue', 'label' => 'Venue', 'name' => 'kgf_venue', 'type' => 'text' ),
			array( 'key' => 'field_kgf_event_reg_url', 'label' => 'Registration URL', 'name' => 'kgf_registration_url', 'type' => 'url' ),
			array( 'key' => 'field_kgf_event_status', 'label' => 'Event Status', 'name' => 'kgf_event_status', 'type' => 'select', 'choices' => array( 'upcoming' => 'Upcoming', 'ongoing' => 'Ongoing', 'completed' => 'Completed', 'cancelled' => 'Cancelled' ) ),
			array( 'key' => 'field_kgf_event_highlights', 'label' => 'Highlights', 'name' => 'kgf_highlights', 'type' => 'textarea', 'instructions' => 'JSON array of strings.', 'rows' => 4 ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_event' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
	) );

	// ── BATCHES ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_batch',
		'title'    => 'Batch Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_batch_course_id', 'label' => 'Course ID', 'name' => 'kgf_course_id', 'type' => 'text', 'instructions' => 'The WordPress post ID of the parent course.', 'required' => 1 ),
			array( 'key' => 'field_kgf_batch_number', 'label' => 'Batch Number', 'name' => 'kgf_batch_number', 'type' => 'text' ),
			array( 'key' => 'field_kgf_batch_start', 'label' => 'Start Date', 'name' => 'kgf_start_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_batch_end', 'label' => 'End Date', 'name' => 'kgf_end_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_batch_format', 'label' => 'Format', 'name' => 'kgf_format', 'type' => 'text' ),
			array( 'key' => 'field_kgf_batch_location', 'label' => 'Location', 'name' => 'kgf_location', 'type' => 'text' ),
			array( 'key' => 'field_kgf_batch_price', 'label' => 'Price (INR)', 'name' => 'kgf_price', 'type' => 'text' ),
			array( 'key' => 'field_kgf_batch_enroll_url', 'label' => 'Enrollment URL', 'name' => 'kgf_enrollment_url', 'type' => 'url' ),
			array( 'key' => 'field_kgf_batch_status', 'label' => 'Batch Status', 'name' => 'kgf_batch_status', 'type' => 'select', 'choices' => array( 'active' => 'Active', 'upcoming' => 'Upcoming', 'completed' => 'Completed', 'cancelled' => 'Cancelled' ) ),
			array( 'key' => 'field_kgf_batch_max_seats', 'label' => 'Max Seats', 'name' => 'kgf_max_seats', 'type' => 'number' ),
			array( 'key' => 'field_kgf_batch_seats_left', 'label' => 'Seats Remaining', 'name' => 'kgf_seats_remaining', 'type' => 'number' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_batch' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
	) );

	// ── GALLERY ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_gallery',
		'title'    => 'Gallery Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_gallery_image_url', 'label' => 'Image URL', 'name' => 'kgf_image_url', 'type' => 'url' ),
			array( 'key' => 'field_kgf_gallery_category', 'label' => 'Category', 'name' => 'kgf_category', 'type' => 'text' ),
			array( 'key' => 'field_kgf_gallery_event', 'label' => 'Event Name', 'name' => 'kgf_event_name', 'type' => 'text' ),
			array( 'key' => 'field_kgf_gallery_date', 'label' => 'Date', 'name' => 'kgf_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_gallery_media_type', 'label' => 'Media Type', 'name' => 'kgf_media_type', 'type' => 'select', 'choices' => array( 'photo' => 'Photo', 'video' => 'Video' ), 'default_value' => 'photo' ),
			array( 'key' => 'field_kgf_gallery_video_url', 'label' => 'Video URL', 'name' => 'kgf_video_url', 'type' => 'url', 'conditional_logic' => array( array( array( 'field' => 'field_kgf_gallery_media_type', 'operator' => '==', 'value' => 'video' ) ) ) ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_gallery' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
	) );

	// ── TESTIMONIALS ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_testimonial',
		'title'    => 'Testimonial Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_testimonial_name', 'label' => 'Student Name', 'name' => 'kgf_student_name', 'type' => 'text', 'required' => 1 ),
			array( 'key' => 'field_kgf_testimonial_text', 'label' => 'Testimonial Text', 'name' => 'kgf_testimonial_text', 'type' => 'textarea', 'rows' => 4, 'required' => 1 ),
			array( 'key' => 'field_kgf_testimonial_designation', 'label' => 'Designation / Role', 'name' => 'kgf_designation', 'type' => 'text' ),
			array( 'key' => 'field_kgf_testimonial_company', 'label' => 'Company', 'name' => 'kgf_company', 'type' => 'text' ),
			array( 'key' => 'field_kgf_testimonial_course_name', 'label' => 'Course Name', 'name' => 'kgf_course_name', 'type' => 'text' ),
			array( 'key' => 'field_kgf_testimonial_course_slug', 'label' => 'Course Slug', 'name' => 'kgf_course_slug', 'type' => 'text' ),
			array( 'key' => 'field_kgf_testimonial_rating', 'label' => 'Rating (1-5)', 'name' => 'kgf_rating', 'type' => 'number', 'min' => 1, 'max' => 5, 'default_value' => 5 ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_testimonial' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
	) );

	// ── NEWS ──
	acf_add_local_field_group( array(
		'key'      => 'group_kgf_news',
		'title'    => 'News Details',
		'fields'   => array(
			array( 'key' => 'field_kgf_news_url', 'label' => 'URL Link', 'name' => 'kgf_news_url', 'type' => 'url', 'instructions' => 'Link to the full news article (optional).', 'required' => 0 ),
			array( 'key' => 'field_kgf_news_source', 'label' => 'Source Name', 'name' => 'kgf_news_source', 'type' => 'text', 'instructions' => 'e.g. "The Times of India", "Republic World"' ),
			array( 'key' => 'field_kgf_news_date', 'label' => 'Publication Date', 'name' => 'kgf_news_date', 'type' => 'date_picker', 'display_format' => 'd/m/Y', 'return_format' => 'Y-m-d' ),
			array( 'key' => 'field_kgf_news_category', 'label' => 'Category', 'name' => 'kgf_news_category', 'type' => 'text', 'instructions' => 'e.g. "Education", "Technology", "Culture"' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'kgf_news' ) ) ),
		'position' => 'normal',
		'style'    => 'default',
	) );
}
add_action( 'acf/init', 'kgf_register_acf_field_groups' );

/**
 * Load sample data importer if in admin.
 */
if ( is_admin() ) {
	$sample_data_file = KGF_HEADLESS_DIR . 'includes/sample-data.php';
	if ( file_exists( $sample_data_file ) ) {
		require_once $sample_data_file;
	}
}

/**
 * Load sample data importer for WP-CLI.
 */
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	$sample_data_file = KGF_HEADLESS_DIR . 'includes/sample-data.php';
	if ( file_exists( $sample_data_file ) ) {
		require_once $sample_data_file;
	}
}
