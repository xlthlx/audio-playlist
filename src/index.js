import { registerBlockType } from '@wordpress/blocks'
import metadata from './block.json'
import './style.scss'
import edit from './edit'
import save from './save'

registerBlockType(metadata.name, {
	example: {
		'innerBlocks': [{
			'name': 'core/image',
			'attributes': {
				'url': MP3_PLUGIN.url + '/assets/img/cover.jpg',
				'align': 'center',
				'style': {
					'border': {
						'radius': '5px'
					}
				}
			}
		},
			{
				'name': 'core/heading',
				'attributes': {
					'level': '3',
					'content': 'Album Title',
					'textAlign': 'center'
				}
			}]
	},
	/**
	 * @see ./edit.js
	 */
	edit: edit,

	/**
	 * @see ./save.js
	 */
	save,
})
