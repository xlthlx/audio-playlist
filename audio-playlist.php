<?php
/**
 * Plugin Name:       Audio Playlist
 * Description:       Create and show your audio playlist with player.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            xlthlx
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       audio-playlist
 *
 * @package audio-playlist
 */

/**
 * Callback for dynamic frontend rendering.
 *
 * @param array  $block_attributes The block attributes.
 * @param string $content          The block content.
 *
 * @return string
 */
function xlthlx_audio_playlist_block_render_callback( $block_attributes, $content ) {
	$list      = '<div data-id="'.$block_attributes["playerId"].'" class="wp-block-xlthlx-audio-player player-container">';
	$list_end  = '</ol>';
	$list_end .= '</div>';

	if ( empty( $block_attributes['tracks'] ) ) {
		return $content . '<p>No tracks yet.</p>';
	}

	include_once ABSPATH . 'wp-admin/includes/media.php';

	$tracks = $block_attributes['tracks'];
	$i      = 0;

	foreach ( $tracks as $track ) {
		$i ++;

		$file     = get_attached_file( $track['trackid'] );
		$metadata = wp_read_audio_metadata( $file );

		if ( 1 === $i ) {
			$list .= '<audio class="player">
					<source src="' . $track['url'] . '" type="' . $metadata['mime_type'] . '"/>
					<p>Your browser does not support HTML audio, but you can still
						<a href="' . $track['url'] . '">download the music</a>.
					</p>
				</audio>';
			$list .= file_get_contents( plugin_dir_path( __FILE__ ) . '/audio-playlist-player.php' );
			$list .= '<ol class="playlist">';
		}

		$class = ( 1 === $i ) ? 'track active' : 'track';

		$list .= '<li class="' . $class . '">
					<a href="' . $track['url'] . '" class="item" data-num="' . str_pad( $i, 2, '0', STR_PAD_LEFT ) . '" data-title="' . $track['title'] . '">
		' . str_pad( $i, 2, '0', STR_PAD_LEFT ) . ' - ' . $track['title'] . ' - ' . $track['artist'] . '<span class="right">' . $metadata['length_formatted'] . '</span>
		</a>
		</li>';
	}

	$list .= $list_end;

	return $content . $list;
}

/**
 * Registers the block using the metadata loaded
 * from the `block.json` file and render callback.
 *
 * @return void
 */
function xlthlx_audio_playlist_block_init() {
	register_block_type(
		__DIR__ . '/build',
		array(
			'api_version'     => 2,
			'render_callback' => 'xlthlx_audio_playlist_block_render_callback',
			'example'         => array(
				'innerBlocks' => array(
					array(
						'name'       => 'core/image',
						'attributes' => array(
							'url'   => plugins_url( '/assets/img/cover.jpg', __FILE__ ),
							'align' => 'center',
							'style' => array(
								'border' => array(
									'radius' => '5px',

								),
							),
						),
						array(
							'name'       => 'core/heading',
							'attributes' => array(
								'level'     => '3',
								'content'   => 'Album Title',
								'textAlign' => 'center',
							),
						),
					),
				),
				'attributes' => array(
					'tracks' => array(
						array(
							'url'      => plugins_url( '/assets/audio/example.mp3', __FILE__ ),
							'title'    => 'First Track',
							'artist'   => 'Artist',
							'duration' => '0:20',
						),
					),
				),
			),

		)
	);
}

add_action( 'init', 'xlthlx_audio_playlist_block_init' );

/**
 * Enqueue frontend script.
 *
 * @return void
 */
function xlthlx_audio_playlist_enqueue_scripts() {
	wp_enqueue_script( 'playlist', plugins_url( 'assets/js/playlist.min.js', __FILE__ ), array(), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'xlthlx_audio_playlist_enqueue_scripts' );
