<?php
/**
 * In-place updates for KGF Headless.
 *
 * WordPress "Add Plugin" uploads refuse to replace an existing folder.
 * This lets an admin upload a new kgf-headless ZIP over the installed copy.
 *
 * @package KGF_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Allow a kgf-headless ZIP uploaded via Plugins → Add New to replace the installed copy.
 *
 * @param array $options Upgrader options.
 * @return array
 */
function kgf_allow_headless_overwrite( $options ) {
	$package = isset( $options['package'] ) ? strtolower( (string) $options['package'] ) : '';
	if ( false === strpos( $package, 'kgf-headless' ) ) {
		return $options;
	}

	$options['clear_destination']           = true;
	$options['abort_if_destination_exists'] = false;
	return $options;
}
add_filter( 'upgrader_package_options', 'kgf_allow_headless_overwrite' );

/**
 * Tools → KGF Plugin Update.
 */
function kgf_register_plugin_update_page() {
	add_management_page(
		__( 'KGF Plugin Update', 'kgf-headless' ),
		__( 'KGF Plugin Update', 'kgf-headless' ),
		'update_plugins',
		'kgf-plugin-update',
		'kgf_render_plugin_update_page'
	);
}
add_action( 'admin_menu', 'kgf_register_plugin_update_page' );

/**
 * Handle ZIP upload and overwrite the installed plugin.
 */
function kgf_handle_plugin_update_upload() {
	if ( ! current_user_can( 'update_plugins' ) ) {
		wp_die( esc_html__( 'You do not have permission to update plugins.', 'kgf-headless' ) );
	}

	check_admin_referer( 'kgf_plugin_update' );

	if ( empty( $_FILES['kgf_plugin_zip']['tmp_name'] ) ) {
		wp_safe_redirect( add_query_arg( 'kgf_update', 'missing', admin_url( 'tools.php?page=kgf-plugin-update' ) ) );
		exit;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

	$uploaded = wp_handle_upload(
		$_FILES['kgf_plugin_zip'],
		array(
			'test_form' => false,
			'mimes'     => array( 'zip' => 'application/zip' ),
		)
	);

	if ( isset( $uploaded['error'] ) ) {
		wp_safe_redirect( add_query_arg( 'kgf_update', 'upload_error', admin_url( 'tools.php?page=kgf-plugin-update' ) ) );
		exit;
	}

	$zip_path = $uploaded['file'];
	$zip      = new ZipArchive();
	if ( true !== $zip->open( $zip_path ) ) {
		wp_delete_file( $zip_path );
		wp_safe_redirect( add_query_arg( 'kgf_update', 'bad_zip', admin_url( 'tools.php?page=kgf-plugin-update' ) ) );
		exit;
	}

	$found_plugin = false;
	for ( $i = 0; $i < $zip->numFiles; $i++ ) {
		$name = $zip->getNameIndex( $i );
		if ( $name && preg_match( '#kgf-headless\\.php$#', str_replace( '\\', '/', $name ) ) ) {
			$found_plugin = true;
			break;
		}
	}
	$zip->close();

	if ( ! $found_plugin ) {
		wp_delete_file( $zip_path );
		wp_safe_redirect( add_query_arg( 'kgf_update', 'wrong_plugin', admin_url( 'tools.php?page=kgf-plugin-update' ) ) );
		exit;
	}

	$skin     = new Automatic_Upgrader_Skin();
	$upgrader = new Plugin_Upgrader( $skin );
	$result   = $upgrader->install(
		$zip_path,
		array(
			'overwrite_package' => true,
		)
	);

	wp_delete_file( $zip_path );

	$status = is_wp_error( $result ) || false === $result ? 'failed' : 'success';
	wp_safe_redirect( add_query_arg( 'kgf_update', $status, admin_url( 'tools.php?page=kgf-plugin-update' ) ) );
	exit;
}
add_action( 'admin_post_kgf_plugin_update', 'kgf_handle_plugin_update_upload' );

/**
 * Render the update form.
 */
function kgf_render_plugin_update_page() {
	if ( ! current_user_can( 'update_plugins' ) ) {
		return;
	}

	$status = isset( $_GET['kgf_update'] ) ? sanitize_key( wp_unslash( $_GET['kgf_update'] ) ) : '';
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Update KGF Headless Plugin', 'kgf-headless' ); ?></h1>
		<p><?php esc_html_e( 'Upload a new kgf-headless ZIP. This replaces the plugin files in place. Courses, events, and other content stay in the database.', 'kgf-headless' ); ?></p>
		<p>
			<?php
			echo esc_html(
				sprintf(
					/* translators: %s: current plugin version */
					__( 'Installed version: %s', 'kgf-headless' ),
					KGF_HEADLESS_VERSION
				)
			);
			?>
		</p>

		<?php if ( 'success' === $status ) : ?>
			<div class="notice notice-success"><p><?php esc_html_e( 'Plugin files were replaced. Reload this page to confirm the new version number.', 'kgf-headless' ); ?></p></div>
		<?php elseif ( $status ) : ?>
			<div class="notice notice-error"><p><?php esc_html_e( 'Update failed. Use a ZIP whose top folder is kgf-headless/ and includes kgf-headless.php.', 'kgf-headless' ); ?></p></div>
		<?php endif; ?>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" enctype="multipart/form-data">
			<?php wp_nonce_field( 'kgf_plugin_update' ); ?>
			<input type="hidden" name="action" value="kgf_plugin_update" />
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="kgf_plugin_zip"><?php esc_html_e( 'Plugin ZIP', 'kgf-headless' ); ?></label></th>
					<td><input type="file" id="kgf_plugin_zip" name="kgf_plugin_zip" accept=".zip" required /></td>
				</tr>
			</table>
			<?php submit_button( __( 'Replace installed plugin', 'kgf-headless' ) ); ?>
		</form>
	</div>
	<?php
}
