import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'


export default function save ({ attributes }) {
	const { tracks } = attributes

	const prepZero = (number) => {
		if (number < 9)
			return '0' + number
		else
			return number
	}

	const trackItems = tracks.map((track, index) => {
		let number = prepZero(index + 1)
		let classActive = number === '01' ? 'track active' : 'track'
		return (
			<li key={index} className={classActive}>
				<a href={track.url} className="item" onClick="onClickTrack(event)"
					 data-num={number} data-length={track.duration} data-title={track.title}>
					{number} - {track.title} - {track.artist}<span className="right">{track.duration}</span>
				</a>
			</li>
		)
	})

	const audioPlayer = tracks.map((track, index) => {
		if (index === 0)
			return (
				<audio key={index} id="player" onEnded="onEndTRack()" onTimeUpdate="timeUpdate(event)" onLoadedMetadata="loadMetaData(event)">
					<source src={track.url} type="audio/mpeg"/>
					<p>
						Your browser does not support HTML audio, but you can still
						<a href={track.url}>download the music</a>.
					</p>
				</audio>
			)
	})

	const nowPlaying = tracks.map((track, index) => {
		if (index === 0)
			return (
				<p className="playing">01 - {track.title}</p>
			)
	})

	return (
		<div id="player-container">
			<div {...useBlockProps.save()}>
				<InnerBlocks.Content/>
			</div>
			{audioPlayer}
			{nowPlaying}
			<div id="volume-container">

				<label htmlFor="volume-slider" hidden>Volume</label>
				<input onMouseMove="changeVolume(event)" id="volume-slider" type="range" min="0" max="1" step="0.1"
							 autoComplete="off" role="slider" aria-label="Volume"/>

				<button title="Mute volume" onClick="clickMuteButton()"
								id="vol-mute-btn" aria-labelledby="vol-mute-label">
					<span className="dashicons dashicons-controls-volumeon"></span>
					<span id="vol-mute-label" hidden>Mute volume</span>
				</button>

				<button title="Unmute volume" className="display-none" onClick="clickUnMuteButton()"
								id="vol-muted-btn" aria-labelledby="vol-muted-label">
					<span className="dashicons dashicons-controls-volumeoff"></span>
					<span id="vol-muted-label" hidden>Unmute volume</span>
				</button>

			</div>

			<div className="repeat">
				<button onClick="clickRepeatButton()" title="Repeat all" aria-labelledby="vol-repeat-label">
					<span className="dashicons dashicons-controls-repeat"></span>
					<span id="vol-repeat-label" hidden>Repeat all</span>
				</button>
			</div>

			<div id="seek-container" className="left">
				<label htmlFor="seek-slider" hidden>Seek</label>
				<input onChange="onChangeSlider(event)" id="seek-slider" type="range" min="0" step="0.01"
							 autoComplete="off" role="slider" aria-label="Seek"/>
			</div>

			<div className="right"><span id="current-time"></span> / <span id="total-time"></span></div>

			<div id="play-pause-container">

				<button onClick="clickPrevButton()" title="Previous track" aria-labelledby="prev-label" type="button">
					<span className="dashicons dashicons-controls-back"></span>
					<span id="prev-label" hidden>Previous track</span>
				</button>

				<button onClick="clickPlayButton()" title="Play" id="play-button" aria-labelledby="play-label"
								type="button">
					<span className="dashicons dashicons-controls-play"></span>
					<span id="play-label" hidden>Play</span>
				</button>

				<button onClick="clickPauseButton()" title="Pause" id="pause-button" aria-labelledby="pause-label"
								className="display-none" type="button">
					<span className="dashicons dashicons-controls-pause"></span>
					<span id="pause-label" hidden>Pause</span>
				</button>

				<button onClick="clickNextButton()" title="Next track" id="next-button" aria-labelledby="next-label"
								type="button">
					<span className="dashicons dashicons-controls-forward"></span>
					<span id="next-label" hidden>Next track</span>
				</button>

			</div>
			<ol id="playlist" className="mp3-album__tracks">
				{trackItems}
			</ol>
		</div>
	)
}
