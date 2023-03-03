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
				<audio key={index} className="player" onEnded="onEndTRack()"
							 onTimeUpdate="timeUpdate(event)" onLoadedMetadata="loadMetaData(event)">
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
		<div className="player-container">
			<div {...useBlockProps.save()}>
				<InnerBlocks.Content/>
			</div>
			{audioPlayer}
			{nowPlaying}
			<div className="volume-container">

				<div className="volume-show">
					<label htmlFor="volume-slider" hidden>Volume</label>
					<input onMouseMove="changeVolume(event)" className="volume-slider" type="range" min="0" max="1" value="1"
								 step="0.1" autoComplete="off" role="slider" aria-label="Volume"/>

					<button title="Mute volume" onClick="clickMuteButton()" className="vol-mute-btn" aria-labelledby="vol-mute-label">
						<span className="dashicons dashicons-controls-volumeon"></span>
						<span id="vol-mute-label" hidden>Mute volume</span>
					</button>

					<button title="Unmute volume" className="vol-muted-btn display-none" onClick="clickUnMuteButton()" aria-labelledby="vol-muted-label">
						<span className="dashicons dashicons-controls-volumeoff"></span>
						<span id="vol-muted-label" hidden>Unmute volume</span>
					</button>
				</div>

				<button onClick="clickRepeatButton()" title="Repeat all" className="repeat" aria-labelledby="vol-repeat-label">
					<span className="dashicons dashicons-controls-repeat"></span>
					<span id="vol-repeat-label" hidden>Repeat all</span>
				</button>

			</div>

			<div className="seek-container left">
				<label htmlFor="seek-slider" hidden>Seek</label>
				<input onChange="onChangeSlider(event)" className="seek-slider" type="range" min="0" step="0.01"
							 autoComplete="off" role="slider" aria-label="Seek"/>
			</div>

			<div className="right"><span className="current-time"></span> / <span className="total-time"></span></div>

			<div className="play-pause-container">

				<button onClick="clickPrevButton()" title="Previous track" aria-labelledby="prev-label" type="button">
					<span className="dashicons dashicons-controls-back"></span>
					<span id="prev-label" hidden>Previous track</span>
				</button>

				<button onClick="clickPlayButton()" title="Play" className="play-button" aria-labelledby="play-label"
								type="button">
					<span className="dashicons dashicons-controls-play"></span>
					<span id="play-label" hidden>Play</span>
				</button>

				<button onClick="clickPauseButton()" title="Pause" className="pause-button display-none"
								aria-labelledby="pause-label" type="button">
					<span className="dashicons dashicons-controls-pause"></span>
					<span id="pause-label" hidden>Pause</span>
				</button>

				<button onClick="clickNextButton()" title="Next track" aria-labelledby="next-label" type="button">
					<span className="dashicons dashicons-controls-forward"></span>
					<span id="next-label" hidden>Next track</span>
				</button>

			</div>
			<ol className="playlist">
				{trackItems}
			</ol>
		</div>
	)
}
