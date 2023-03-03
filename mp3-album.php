<?php
/**
 * Plugin Name:       Mp3 Album
 * Description:       Create and show your album with mp3 list.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            xlthlx
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mp3-album
 *
 * @package           mp3-album
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_mp3_album_block_init() {
	register_block_type( __DIR__ . '/build');
}
add_action( 'init', 'create_block_mp3_album_block_init' );

function playlist_scripts() {
	wp_enqueue_script( 'playlist-js', plugins_url( 'assets/js/playlist.js', __FILE__ ), array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'playlist_scripts' );
