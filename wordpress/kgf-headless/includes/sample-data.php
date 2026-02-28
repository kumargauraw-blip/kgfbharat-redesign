<?php
/**
 * KGF Bharat Sample Data Importer
 *
 * Provides admin UI and WP-CLI command to import sample content
 * matching the Next.js frontend JSON data files.
 *
 * @package KGF_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class KGF_Sample_Data_Importer
 *
 * Handles importing sample data for all KGF custom post types.
 */
class KGF_Sample_Data_Importer {

	/**
	 * Constructor. Registers admin page and WP-CLI command.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_admin_page' ) );

		if ( defined( 'WP_CLI' ) && WP_CLI ) {
			WP_CLI::add_command( 'kgf import-sample-data', array( $this, 'cli_import' ) );
		}
	}

	/**
	 * Add admin menu page under the KGF menu.
	 */
	public function add_admin_page() {
		add_management_page(
			__( 'KGF Sample Data', 'kgf-headless' ),
			__( 'KGF Sample Data', 'kgf-headless' ),
			'manage_options',
			'kgf-sample-data',
			array( $this, 'render_admin_page' )
		);
	}

	/**
	 * Render the admin page for importing sample data.
	 */
	public function render_admin_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$imported = false;
		$results  = array();

		if ( isset( $_POST['kgf_import_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kgf_import_nonce'] ) ), 'kgf_import_sample_data' ) ) {
			$results  = $this->import_all();
			$imported = true;
		}

		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'KGF Bharat Sample Data Importer', 'kgf-headless' ); ?></h1>
			<p><?php esc_html_e( 'Click the button below to import sample data for all KGF custom post types. This will create sample courses, batches, events, gallery items, and testimonials.', 'kgf-headless' ); ?></p>

			<?php if ( $imported ) : ?>
				<div class="notice notice-success">
					<p><strong><?php esc_html_e( 'Sample data imported successfully!', 'kgf-headless' ); ?></strong></p>
					<ul>
						<?php foreach ( $results as $type => $count ) : ?>
							<li><?php echo esc_html( ucfirst( $type ) . ': ' . $count . ' items created' ); ?></li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<form method="post" action="">
				<?php wp_nonce_field( 'kgf_import_sample_data', 'kgf_import_nonce' ); ?>
				<p>
					<input
						type="submit"
						class="button button-primary"
						value="<?php esc_attr_e( 'Import Sample Data', 'kgf-headless' ); ?>"
					/>
				</p>
			</form>
		</div>
		<?php
	}

	/**
	 * WP-CLI handler for importing sample data.
	 *
	 * ## EXAMPLES
	 *
	 *     wp kgf import-sample-data
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 */
	public function cli_import( $args, $assoc_args ) {
		WP_CLI::log( 'Starting KGF sample data import...' );

		$results = $this->import_all();

		foreach ( $results as $type => $count ) {
			WP_CLI::success( ucfirst( $type ) . ': ' . $count . ' items created.' );
		}

		WP_CLI::success( 'All sample data imported successfully!' );
	}

	/**
	 * Import all sample data.
	 *
	 * @return array Counts of imported items by type.
	 */
	public function import_all() {
		$results = array();

		$results['courses']      = $this->import_courses();
		$results['batches']      = $this->import_batches();
		$results['events']       = $this->import_events();
		$results['gallery']      = $this->import_gallery();
		$results['testimonials'] = $this->import_testimonials();

		return $results;
	}

	/**
	 * Import sample courses.
	 *
	 * @return int Number of courses created.
	 */
	public function import_courses() {
		$courses = array(
			array(
				'title'            => 'AI Fundamentals for 10X Productivity',
				'slug'             => 'ai-fundamentals-productivity',
				'tagline'          => 'Boost your personal and professional productivity tenfold.',
				'description'      => 'Master the basics of AI tools like ChatGPT, Claude, and Midjourney. Learn prompt engineering, workflow automation, and how to integrate AI into your daily tasks.',
				'target_audience'  => array( 'Everyone' ),
				'status'           => 'Active',
				'price'            => '₹4,999',
				'duration'         => '4 Weeks',
				'format'           => 'Online',
				'curriculum'       => array(
					'Intro to LLMs',
					'Prompt Engineering',
					'AI for Writing',
					'AI for Images',
				),
				'learning_outcomes' => array(
					'Master ChatGPT',
					'Automate Emails',
					'Create Content Faster',
				),
				'faq'              => array(
					array(
						'question' => 'Do I need any prior AI or programming experience?',
						'answer'   => 'No. This course is designed for absolute beginners. We start from the fundamentals and gradually build up to advanced techniques. All you need is a laptop and an internet connection.',
					),
					array(
						'question' => 'What tools and platforms will we use during the course?',
						'answer'   => 'You will get hands-on experience with ChatGPT, Claude, Midjourney, and other leading AI tools. We also cover workflow automation platforms to help you integrate AI into your daily routine.',
					),
					array(
						'question' => 'Is the course live or pre-recorded?',
						'answer'   => 'All sessions are conducted live via Zoom with the instructor. Recordings are provided after each session so you can revisit the material at your own pace.',
					),
					array(
						'question' => 'Will I receive a certificate upon completion?',
						'answer'   => 'Yes. Upon successfully completing all modules and the final project, you will receive a KGF Bharat Certificate of Completion that you can add to your LinkedIn profile.',
					),
				),
			),
			array(
				'title'            => 'Advanced AI Specialization Mastery for Creators',
				'slug'             => 'advanced-ai-creators',
				'tagline'          => 'Leverage AI to generate content and grow your audience.',
				'description'      => 'Designed for YouTubers, writers, and designers. Learn to use AI for video editing, scriptwriting, thumbnail generation, and content strategy.',
				'target_audience'  => array( 'Creators' ),
				'status'           => 'Planned',
				'price'            => 'Contact for pricing',
				'duration'         => '6 Weeks',
				'format'           => 'Online',
				'curriculum'       => array(),
				'learning_outcomes' => array(),
				'faq'              => array(),
			),
			array(
				'title'            => 'Advanced AI Engineering Mastery',
				'slug'             => 'advanced-ai-engineering',
				'tagline'          => 'Deep dive into LLMs, RAG, and building AI apps.',
				'description'      => 'For developers and engineers. Build your own AI agents, fine-tune models, and integrate LLMs into production applications.',
				'target_audience'  => array( 'Engineers' ),
				'status'           => 'Planned',
				'price'            => 'Contact for pricing',
				'duration'         => '8 Weeks',
				'format'           => 'Hybrid',
				'curriculum'       => array(),
				'learning_outcomes' => array(),
				'faq'              => array(),
			),
			array(
				'title'            => 'Advanced AI Mastery for Database Professionals',
				'slug'             => 'ai-database-pros',
				'tagline'          => 'Transform database management with AI agents.',
				'description'      => 'Learn how AI can optimize queries, manage schemas, and automate database maintenance tasks.',
				'target_audience'  => array( 'Database Professionals' ),
				'status'           => 'Planned',
				'price'            => 'Contact for pricing',
				'duration'         => '6 Weeks',
				'format'           => 'Online',
				'curriculum'       => array(),
				'learning_outcomes' => array(),
				'faq'              => array(),
			),
			array(
				'title'            => 'Advanced AI Mastery for Marketers',
				'slug'             => 'ai-for-marketers',
				'tagline'          => 'Automate campaigns and personalize experiences.',
				'description'      => 'Use AI for customer segmentation, ad copy generation, predictive analytics, and marketing automation.',
				'target_audience'  => array( 'Marketers' ),
				'status'           => 'Planned',
				'price'            => 'Contact for pricing',
				'duration'         => '5 Weeks',
				'format'           => 'Online',
				'curriculum'       => array(),
				'learning_outcomes' => array(),
				'faq'              => array(),
			),
			array(
				'title'            => 'Advanced AI Mastery for Business Leaders',
				'slug'             => 'ai-business-leaders',
				'tagline'          => 'Strategic AI implementation for growth.',
				'description'      => 'Understand the AI landscape, identify high-value use cases, and lead AI transformation in your organization.',
				'target_audience'  => array( 'Business Leaders' ),
				'status'           => 'Planned',
				'price'            => 'Contact for pricing',
				'duration'         => '2 Days (Workshop)',
				'format'           => 'In-Person',
				'curriculum'       => array(),
				'learning_outcomes' => array(),
				'faq'              => array(),
			),
		);

		$count = 0;
		foreach ( $courses as $course ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $course['title'],
				'post_content' => $course['description'],
				'post_type'    => 'kgf_course',
				'post_status'  => 'publish',
			) );

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, 'kgf_slug', $course['slug'] );
			update_post_meta( $post_id, 'kgf_tagline', $course['tagline'] );
			update_post_meta( $post_id, 'kgf_duration', $course['duration'] );
			update_post_meta( $post_id, 'kgf_format', $course['format'] );
			update_post_meta( $post_id, 'kgf_price', $course['price'] );
			update_post_meta( $post_id, 'kgf_status', $course['status'] );
			update_post_meta( $post_id, 'kgf_target_audience', wp_json_encode( $course['target_audience'] ) );
			update_post_meta( $post_id, 'kgf_curriculum', wp_json_encode( $course['curriculum'] ) );
			update_post_meta( $post_id, 'kgf_learning_outcomes', wp_json_encode( $course['learning_outcomes'] ) );
			update_post_meta( $post_id, 'kgf_instructor_bio', '' );
			update_post_meta( $post_id, 'kgf_faq', wp_json_encode( $course['faq'] ) );

			$count++;
		}

		return $count;
	}

	/**
	 * Import sample batches.
	 *
	 * @return int Number of batches created.
	 */
	public function import_batches() {
		$batches = array(
			array(
				'title'           => 'AI Fundamentals - Batch 1',
				'course_id'       => '1',
				'batch_number'    => 'Batch 1',
				'start_date'      => '2026-03-15',
				'end_date'        => '2026-04-12',
				'format'          => 'Online',
				'location'        => 'Virtual (Zoom)',
				'price'           => '4,999',
				'enrollment_url'  => 'https://kgfbharat.org/enroll/ai-fundamentals-b1',
				'status'          => 'Enrolling',
				'max_seats'       => 30,
				'seats_remaining' => 12,
			),
			array(
				'title'           => 'AI Fundamentals - Batch 2',
				'course_id'       => '1',
				'batch_number'    => 'Batch 2',
				'start_date'      => '2026-04-20',
				'end_date'        => '2026-05-18',
				'format'          => 'Hybrid',
				'location'        => 'Bengaluru + Virtual',
				'price'           => '5,999',
				'enrollment_url'  => 'https://kgfbharat.org/enroll/ai-fundamentals-b2',
				'status'          => 'Upcoming',
				'max_seats'       => 25,
				'seats_remaining' => 25,
			),
			array(
				'title'           => 'AI Fundamentals - Batch 3',
				'course_id'       => '1',
				'batch_number'    => 'Batch 3',
				'start_date'      => '2026-06-01',
				'end_date'        => '2026-06-28',
				'format'          => 'Online',
				'location'        => 'Virtual (Zoom)',
				'price'           => '4,999',
				'enrollment_url'  => 'https://kgfbharat.org/enroll/ai-fundamentals-b3',
				'status'          => 'Upcoming',
				'max_seats'       => 30,
				'seats_remaining' => 30,
			),
		);

		$count = 0;
		foreach ( $batches as $batch ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $batch['title'],
				'post_content' => '',
				'post_type'    => 'kgf_batch',
				'post_status'  => 'publish',
			) );

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, 'kgf_course_id', $batch['course_id'] );
			update_post_meta( $post_id, 'kgf_batch_number', $batch['batch_number'] );
			update_post_meta( $post_id, 'kgf_start_date', $batch['start_date'] );
			update_post_meta( $post_id, 'kgf_end_date', $batch['end_date'] );
			update_post_meta( $post_id, 'kgf_format', $batch['format'] );
			update_post_meta( $post_id, 'kgf_location', $batch['location'] );
			update_post_meta( $post_id, 'kgf_price', $batch['price'] );
			update_post_meta( $post_id, 'kgf_enrollment_url', $batch['enrollment_url'] );
			update_post_meta( $post_id, 'kgf_batch_status', $batch['status'] );
			update_post_meta( $post_id, 'kgf_max_seats', $batch['max_seats'] );
			update_post_meta( $post_id, 'kgf_seats_remaining', $batch['seats_remaining'] );

			$count++;
		}

		return $count;
	}

	/**
	 * Import sample events.
	 *
	 * @return int Number of events created.
	 */
	public function import_events() {
		$events = array(
			array(
				'title'            => 'Dharmalankaran 2025 - National Awards Ceremony',
				'slug'             => 'dharmalankaran-2025',
				'description'      => 'The prestigious Dharmalankaran Awards recognize individuals and organizations that have made outstanding contributions to the preservation and promotion of Dharmic values through technology, education, and social impact.',
				'start_date'       => '2025-12-14',
				'end_date'         => '',
				'time'             => '10:00 AM - 6:00 PM IST',
				'location'         => 'India International Centre, New Delhi',
				'event_type'       => 'past',
				'event_status'     => 'awards',
				'registration_url' => '',
				'highlights'       => array(
					'Keynote address by Sandeep Deo, Founder of KGF Bharat',
					'Panel discussion on AI and Dharmic ethics',
					'Awards in 5 categories - Education, Technology, Social Impact, Youth Leadership, Lifetime Achievement',
					'Cultural performances celebrating Bharatiya traditions',
					'Networking dinner with 200+ leaders and scholars',
				),
			),
			array(
				'title'            => 'AI for Bharat - National Workshop Series',
				'slug'             => 'ai-for-bharat-workshop',
				'description'      => 'A hands-on workshop series designed to introduce AI tools and productivity techniques to professionals, students, and entrepreneurs across Bharat. Learn prompt engineering, automation, and content creation with AI.',
				'start_date'       => '2026-04-05',
				'end_date'         => '2026-04-06',
				'time'             => '9:00 AM - 5:00 PM IST',
				'location'         => 'IIT Bombay, Mumbai',
				'event_type'       => 'upcoming',
				'event_status'     => 'workshop',
				'registration_url' => 'https://kgfbharat.org/register/ai-bharat-workshop',
				'highlights'       => array(),
			),
			array(
				'title'            => 'Sanatana Tech Summit 2026',
				'slug'             => 'sanatana-tech-summit-2026',
				'description'      => 'A two-day technology summit bringing together thought leaders, engineers, and educators to explore how ancient Indian knowledge systems can inform modern AI development. Topics include ethical AI, Vedic mathematics in machine learning, and Sanskrit NLP.',
				'start_date'       => '2026-05-22',
				'end_date'         => '2026-05-23',
				'time'             => '9:00 AM - 6:00 PM IST',
				'location'         => 'HICC Convention Centre, Hyderabad',
				'event_type'       => 'upcoming',
				'event_status'     => 'conference',
				'registration_url' => 'https://kgfbharat.org/register/sanatana-tech-summit',
				'highlights'       => array(),
			),
			array(
				'title'            => 'Gurukul AI Bootcamp - Bengaluru',
				'slug'             => 'gurukul-ai-bootcamp',
				'description'      => 'An intensive weekend bootcamp where participants learn to build AI-powered applications from scratch. From prompt engineering to RAG systems, this bootcamp covers the full spectrum of practical AI skills.',
				'start_date'       => '2026-03-29',
				'end_date'         => '2026-03-30',
				'time'             => '8:30 AM - 6:00 PM IST',
				'location'         => 'KGF Bharat HQ, Bengaluru',
				'event_type'       => 'upcoming',
				'event_status'     => 'workshop',
				'registration_url' => 'https://kgfbharat.org/register/gurukul-bootcamp',
				'highlights'       => array(),
			),
			array(
				'title'            => 'Bharat AI Conclave 2025',
				'slug'             => 'bharat-ai-conclave-2025',
				'description'      => 'The inaugural Bharat AI Conclave brought together 500+ participants from across the nation to discuss the future of AI education in India. Featured keynotes from industry leaders and live demonstrations of AI tools.',
				'start_date'       => '2025-09-20',
				'end_date'         => '',
				'time'             => '10:00 AM - 5:00 PM IST',
				'location'         => 'Bengaluru International Exhibition Centre',
				'event_type'       => 'past',
				'event_status'     => 'conference',
				'registration_url' => '',
				'highlights'       => array(),
			),
			array(
				'title'            => 'Vedic Computing Seminar',
				'slug'             => 'vedic-computing-seminar',
				'description'      => 'An academic seminar exploring the intersection of Vedic mathematics, Sanskrit computational linguistics, and modern artificial intelligence. Researchers presented papers on applications of ancient Indian mathematical concepts in machine learning.',
				'start_date'       => '2025-11-08',
				'end_date'         => '',
				'time'             => '2:00 PM - 7:00 PM IST',
				'location'         => 'JNU Convention Centre, New Delhi',
				'event_type'       => 'past',
				'event_status'     => 'seminar',
				'registration_url' => '',
				'highlights'       => array(),
			),
		);

		$count = 0;
		foreach ( $events as $event ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $event['title'],
				'post_content' => $event['description'],
				'post_type'    => 'kgf_event',
				'post_status'  => 'publish',
			) );

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, 'kgf_slug', $event['slug'] );
			update_post_meta( $post_id, 'kgf_event_type', $event['event_type'] );
			update_post_meta( $post_id, 'kgf_start_date', $event['start_date'] );
			update_post_meta( $post_id, 'kgf_end_date', $event['end_date'] );
			update_post_meta( $post_id, 'kgf_time', $event['time'] );
			update_post_meta( $post_id, 'kgf_location', $event['location'] );
			update_post_meta( $post_id, 'kgf_venue', '' );
			update_post_meta( $post_id, 'kgf_registration_url', $event['registration_url'] );
			update_post_meta( $post_id, 'kgf_event_status', $event['event_status'] );
			update_post_meta( $post_id, 'kgf_highlights', wp_json_encode( $event['highlights'] ) );

			$count++;
		}

		return $count;
	}

	/**
	 * Import sample gallery items.
	 *
	 * @return int Number of gallery items created.
	 */
	public function import_gallery() {
		$items = array(
			array(
				'title'       => 'Dharmalankaran 2025 Award Ceremony',
				'description' => 'The prestigious awards ceremony honoring outstanding contributors to Dharmic values and technology',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/dharmalankaran-ceremony.jpg',
				'video_url'   => '',
				'category'    => 'Awards',
				'date'        => '2025-12-14',
			),
			array(
				'title'       => 'AI for Bharat Workshop - Mumbai',
				'description' => 'Participants learning prompt engineering and AI automation techniques',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/ai-workshop-mumbai.jpg',
				'video_url'   => '',
				'category'    => 'Workshops',
				'date'        => '2025-11-20',
			),
			array(
				'title'       => 'Bharat AI Conclave 2025 Keynote',
				'description' => 'Founder Sandeep Deo delivering the opening keynote at the inaugural AI Conclave',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/ai-conclave-keynote.jpg',
				'video_url'   => '',
				'category'    => 'Events',
				'date'        => '2025-09-20',
			),
			array(
				'title'       => 'Vedic Computing Seminar Panel',
				'description' => 'Expert panel discussing the intersection of Vedic mathematics and modern AI',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/vedic-seminar-panel.jpg',
				'video_url'   => '',
				'category'    => 'Events',
				'date'        => '2025-11-08',
			),
			array(
				'title'       => 'Gurukul Bootcamp Hands-on Session',
				'description' => 'Students building their first AI-powered applications during the intensive bootcamp',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/bootcamp-handson.jpg',
				'video_url'   => '',
				'category'    => 'Workshops',
				'date'        => '2025-10-15',
			),
			array(
				'title'       => 'Dharmalankaran Lifetime Achievement Award',
				'description' => 'Presentation of the Lifetime Achievement Award at Dharmalankaran 2025',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/lifetime-achievement.jpg',
				'video_url'   => '',
				'category'    => 'Awards',
				'date'        => '2025-12-14',
			),
			array(
				'title'       => 'KGF Bharat Foundation Day Celebrations',
				'description' => 'Cultural performances and celebrations marking the foundation day of KGF Bharat',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/foundation-day.jpg',
				'video_url'   => '',
				'category'    => 'Events',
				'date'        => '2025-08-15',
			),
			array(
				'title'       => 'AI Workshop Demo Day Highlights',
				'description' => 'Students presenting their AI projects during the workshop demo day',
				'media_type'  => 'video',
				'image_url'   => '/images/gallery/demo-day-thumb.jpg',
				'video_url'   => 'https://www.youtube.com/embed/placeholder1',
				'category'    => 'Workshops',
				'date'        => '2025-11-22',
			),
			array(
				'title'       => 'Dharmalankaran Cultural Performance',
				'description' => 'Traditional Bharatiya cultural performance at the Dharmalankaran ceremony',
				'media_type'  => 'video',
				'image_url'   => '/images/gallery/cultural-performance-thumb.jpg',
				'video_url'   => 'https://www.youtube.com/embed/placeholder2',
				'category'    => 'Awards',
				'date'        => '2025-12-14',
			),
			array(
				'title'       => 'Sanatana Tech Summit Networking',
				'description' => 'Leaders and scholars networking at the tech summit reception',
				'media_type'  => 'photo',
				'image_url'   => '/images/gallery/tech-summit-networking.jpg',
				'video_url'   => '',
				'category'    => 'Events',
				'date'        => '2025-09-21',
			),
		);

		$count = 0;
		foreach ( $items as $item ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $item['title'],
				'post_content' => $item['description'],
				'post_type'    => 'kgf_gallery',
				'post_status'  => 'publish',
			) );

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, 'kgf_image_url', $item['image_url'] );
			update_post_meta( $post_id, 'kgf_category', $item['category'] );
			update_post_meta( $post_id, 'kgf_event_name', '' );
			update_post_meta( $post_id, 'kgf_date', $item['date'] );
			update_post_meta( $post_id, 'kgf_media_type', $item['media_type'] );
			update_post_meta( $post_id, 'kgf_video_url', $item['video_url'] );

			$count++;
		}

		return $count;
	}

	/**
	 * Import sample testimonials.
	 *
	 * @return int Number of testimonials created.
	 */
	public function import_testimonials() {
		$testimonials = array(
			array(
				'name'        => 'Rajesh Sharma',
				'role'        => 'Senior Developer',
				'company'     => 'TCS',
				'content'     => 'This course transformed my approach to daily development tasks. I now automate repetitive work with AI and my productivity has genuinely tripled. The prompt engineering module alone was worth the entire investment.',
				'course_slug' => 'ai-fundamentals-productivity',
				'course_name' => 'AI Fundamentals for 10X Productivity',
				'rating'      => 5,
			),
			array(
				'name'        => 'Priya Patel',
				'role'        => 'Content Creator',
				'company'     => 'Freelance',
				'content'     => 'As a creator, I was skeptical about AI replacing creativity. Instead, it supercharged it. I now produce scripts, thumbnails, and social posts in half the time. Kumar sir\'s teaching style makes complex concepts feel simple.',
				'course_slug' => 'ai-fundamentals-productivity',
				'course_name' => 'AI Fundamentals for 10X Productivity',
				'rating'      => 5,
			),
			array(
				'name'        => 'Amit Verma',
				'role'        => 'Database Administrator',
				'company'     => 'Infosys',
				'content'     => 'The practical, hands-on approach sets this course apart. Every session had real-world exercises that I could apply immediately at work. My team noticed the difference within the first week.',
				'course_slug' => 'ai-fundamentals-productivity',
				'course_name' => 'AI Fundamentals for 10X Productivity',
				'rating'      => 4,
			),
			array(
				'name'        => 'Neha Gupta',
				'role'        => 'Marketing Manager',
				'company'     => 'Flipkart',
				'content'     => 'From writing campaign copy to analyzing customer data, AI has become my daily co-pilot. This course gave me the confidence and skills to integrate AI tools into every part of our marketing workflow.',
				'course_slug' => 'ai-fundamentals-productivity',
				'course_name' => 'AI Fundamentals for 10X Productivity',
				'rating'      => 5,
			),
		);

		$count = 0;
		foreach ( $testimonials as $testimonial ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $testimonial['name'] . ' - ' . $testimonial['course_name'],
				'post_content' => $testimonial['content'],
				'post_type'    => 'kgf_testimonial',
				'post_status'  => 'publish',
			) );

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, 'kgf_student_name', $testimonial['name'] );
			update_post_meta( $post_id, 'kgf_course_name', $testimonial['course_name'] );
			update_post_meta( $post_id, 'kgf_course_slug', $testimonial['course_slug'] );
			update_post_meta( $post_id, 'kgf_rating', $testimonial['rating'] );
			update_post_meta( $post_id, 'kgf_testimonial_text', $testimonial['content'] );
			update_post_meta( $post_id, 'kgf_designation', $testimonial['role'] );
			update_post_meta( $post_id, 'kgf_company', $testimonial['company'] );

			$count++;
		}

		return $count;
	}
}

new KGF_Sample_Data_Importer();
