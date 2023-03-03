import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { Button } from '@wordpress/components'
import './editor.scss'

export default function edit ({ attributes, setAttributes }) {
	const { tracks } = attributes
	const ALBUM_TEMPLATE = [
		['core/image', { align: 'center', style: { 'border': { 'radius': '5px' } } }],
		['core/heading', { placeholder: 'Album title', textAlign: 'center', level: 3 }]
	]

	const prepZero = (number) => {
		if (number < 9)
			return '0' + number
		else
			return number
	}

	let elems

	let playlist = document.querySelector('.playlist')
	if (playlist && playlist.length !== 0) {
		elems = playlist.getElementsByClassName('track')
	}

	let svgRepeat = document.querySelector('.dashicons-controls-repeat')

	if (localStorage.getItem('repeat') === 'true' && svgRepeat) {
		svgRepeat.classList.add('on')
	}

	const onTrackChange = (index, media) => {
		const updatedTracks = [...tracks]
		updatedTracks[index] = {
			url: media.url,
			title: media.title,
			artist: media.artist,
			duration: media.fileLength,
		}
		setAttributes({ tracks: updatedTracks })
	}

	const onDeleteTrack = (index) => {
		const updatedTracks = [...tracks]
		updatedTracks.splice(index, 1)
		setAttributes({ tracks: updatedTracks })
	}

	const convertElapsedTime = (inputSeconds) => {
		let seconds = Math.floor(inputSeconds % 60)
		if (seconds < 10) {
			seconds = '0' + seconds
		}
		let minutes = Math.floor(inputSeconds / 60)
		return minutes + ':' + seconds
	}

	const setSource = (i) => {
		if (0 !== elems.length) {
			document.querySelector('.player').src = elems[i].children[0].getAttribute('href')
			document.querySelector('.player').load()
			document.querySelector('.play-button').click()
		}
	}

	const setNowPlaying = (item) => {
		let num = item.dataset.num
		let title = item.dataset.title
		document.querySelector('.playing').textContent = num + ' - ' + title
	}

	const setFirstTrack = (elems) => {
		if (localStorage.getItem('repeat') === 'true') {
			elems[0].classList.add('active')
			setSource(0)
			setNowPlaying(elems[0].children[0])
		} else {
			elems[elems.length - 1].classList.add('active')
			clickPauseButton()
		}
	}

	const setLastTrack = (elems) => {
		if (localStorage.getItem('repeat') === 'true') {
			elems[elems.length - 1].classList.add('active')
			setSource(elems.length - 1)
			setNowPlaying(elems[elems.length - 1].children[0])
		} else {
			elems[0].classList.add('active')
			clickPauseButton()
		}
	}

	const setNextTrack = (i, elems) => {
		if (i < elems.length) {
			elems[i].classList.add('active')
			setSource(i)
			setNowPlaying(elems[i].children[0])
		} else {
			setFirstTrack(elems)
		}
	}

	const setPrevTrack = (i, elems) => {
		if (i < elems.length) {
			elems[i].classList.add('active')
			setSource(i)
			setNowPlaying(elems[i].children[0])
		} else {
			setLastTrack(elems)
		}
	}

	const changeTrack = (direction) => {

		if (elems.length !== 0) {
			for (let i = 0; i < elems.length; i++) {
				if (elems[i].classList.contains('active')) {
					elems[i].classList.remove('active')
					if (direction === 'next') {
						i++
						setNextTrack(i, elems)
					} else {
						(i > 0) ? i-- : i = elems.length + 1
						setPrevTrack(i, elems)
					}
				}
			}
		}

	}

	const setPause = () => {
		document.querySelector('.play-button').classList.remove('display-none')
		document.querySelector('.pause-button').classList.add('display-none')
	}

	const setPlay = () => {
		document.querySelector('.play-button').classList.add('display-none')
		document.querySelector('.pause-button').classList.remove('display-none')
	}

	const toggleMuteUnmute = () => {
		document.querySelector('.vol-muted-btn').classList.toggle('display-none')
		document.querySelector('.vol-mute-btn').classList.toggle('display-none')
	}

	const setVolumeSlider = () => {
		document.querySelector('.volume-slider').value = document.querySelector('.player').volume
	}

	const clickMuteButton = () => {
		document.querySelector('.player').muted = true
		document.querySelector('.player').volume = 0
		setVolumeSlider()
		toggleMuteUnmute()
		document.querySelector('.volume-slider').style.backgroundSize = '0% 100%'
	}

	const clickUnMuteButton = () => {
		document.querySelector('.player').muted = false
		document.querySelector('.player').volume = 1
		setVolumeSlider()
		toggleMuteUnmute()
		document.querySelector('.volume-slider').style.backgroundSize = '100% 100%'
	}

	const clickPlayButton = () => {
		if (0 !== elems.length) {
			document.querySelector('.player').play()
			for (let i = 0; i < elems.length; i++) {
				if (elems[i].classList.contains('active')) {
					setNowPlaying(elems[i].children[0])
				}
			}
			setPlay()
		}
	}
	const clickPauseButton = () => {
		document.querySelector('.player').pause()
		setPause()
	}

	const onEndTRack = () => {
		changeTrack('next')
	}

	const clickNextButton = () => {
		changeTrack('next')
	}

	const clickPrevButton = () => {
		changeTrack('prev')
	}

	const loadMetaData = (event) => {
		document.querySelector('.total-time').innerHTML = convertElapsedTime(event.target.duration)
		document.querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime)
		let seekSlider = document.querySelector('.seek-slider')
		seekSlider.max = event.target.duration
		seekSlider.setAttribute('value', event.target.currentTime)
	}

	const timeUpdate = (event) => {
		document.querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime)
		let seekSlider = document.querySelector('.seek-slider')
		seekSlider.setAttribute('value', event.target.currentTime)
		seekSlider.value = event.target.currentTime

		const min = seekSlider.min
		const max = seekSlider.max
		const val = seekSlider.value

		seekSlider.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
	}

	const onChangeSlider = (event) => {
		document.querySelector('.player').currentTime = event.target.value
	}

	const changeVolume = (event) => {
		document.querySelector('.player').volume = event.target.value

		const min = event.target.min
		const max = event.target.max
		const val = event.target.value

		event.target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
	}

	const clickRepeatButton = () => {
		svgRepeat.classList.toggle('on')
		localStorage.setItem('repeat', '')

		if (svgRepeat.classList.contains('on')) {
			localStorage.setItem('repeat', 'true')
		}
	}

	const onClickTrack = (event) => {
		event.preventDefault()

		document.querySelector('.player').src = event.target.href
		document.querySelector('.player').load()

		clickPlayButton()
		setNowPlaying(event.target)

		for (let i = 0; i < elems.length; i++) {
			if (elems[i].classList.contains('active')) {
				elems[i].classList.remove('active')
			}
		}
		event.target.parentElement.classList.add('active')
	}

	const audioPlayer = tracks.map((track, index) => {
		if (index === 0)
			return (
				<audio key={index} className="player" onEnded={() => onEndTRack()} onTimeUpdate={event => timeUpdate(event)}
							 onLoadedMetadata={event => loadMetaData(event)}>
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

	const trackItems = tracks.map((track, index) => {
		let number = prepZero(index + 1)
		let classActive = number === '01' ? 'track active' : 'track'
		return (
			<li key={index} className={classActive}>
				{track.url && (
					<a href={track.url} className="item" onClick={event => onClickTrack(event)}
						 data-num={number} data-length={track.duration} data-title={track.title}>
						{number} - {track.title} - {track.artist}<span className="right">{track.duration}</span>
					</a>
				)}
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => onTrackChange(index, media)}
						allowedTypes={['audio/mpeg']}
						value={track}
						render={({ open }) => (
							<Button title="Edit" className="action" isSmall onClick={open}>
								<span className="dashicons dashicons-edit"></span>
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<Button title="Remove" className="action" isDestructive isSmall onClick={() => onDeleteTrack(index)}>
					<span className="dashicons dashicons-trash"></span>
				</Button>
			</li>
		)
	})

	return (
		<div {...useBlockProps()}>
			<div className="player-container">
				<InnerBlocks
					template={ALBUM_TEMPLATE}
					templateLock="insert"
				/>
				{audioPlayer}
				{nowPlaying}
				<div className="volume-container">

					<div className="volume-show">
						<label htmlFor="volume-slider" hidden>Volume</label>
						<input onChange={event => changeVolume(event)} className="volume-slider" type="range" min="0" max="1"
									 step="0.1"
									 autoComplete="off" role="slider" aria-label="Volume"/>

						<button title="Mute volume" onClick={() => clickMuteButton()}
										className="vol-mute-btn" aria-labelledby="vol-mute-label">
							<span className="dashicons dashicons-controls-volumeon"></span>
							<span id="vol-mute-label" hidden>Mute volume</span>
						</button>

						<button title="Unmute volume" className="vol-muted-btn display-none" onClick={() => clickUnMuteButton()}
										aria-labelledby="vol-muted-label">
							<span className="dashicons dashicons-controls-volumeoff"></span>
							<span id="vol-muted-label" hidden>Unmute volume</span>
						</button>
					</div>

					<button onClick={() => clickRepeatButton()} title="Repeat all" className="repeat"
									aria-labelledby="vol-repeat-label">
						<span className="dashicons dashicons-controls-repeat"></span>
						<span id="vol-repeat-label" hidden>Repeat all</span>
					</button>

				</div>

				<div className="seek-container left">
					<label htmlFor="seek-slider" hidden>Seek</label>
					<input onChange={event => onChangeSlider(event)} className="seek-slider" type="range" min="0" step="0.01"
								 autoComplete="off" role="slider" aria-label="Seek"/>
				</div>

				<div className="right"><span className="current-time"></span> / <span className="total-time"></span></div>

				<div className="play-pause-container">

					<button onClick={() => clickPrevButton()} title="Previous track" aria-labelledby="prev-label" type="button">
						<span className="dashicons dashicons-controls-back"></span>
						<span id="prev-label" hidden>Previous track</span>
					</button>

					<button onClick={() => clickPlayButton()} title="Play" className="play-button" aria-labelledby="play-label"
									type="button">
						<span className="dashicons dashicons-controls-play"></span>
						<span id="play-label" hidden>Play</span>
					</button>

					<button onClick={() => clickPauseButton()} title="Pause" aria-labelledby="pause-label"
									className="pause-button display-none" type="button">
						<span className="dashicons dashicons-controls-pause"></span>
						<span id="pause-label" hidden>Pause</span>
					</button>

					<button onClick={() => clickNextButton()} title="Next track" aria-labelledby="next-label" type="button">
						<span className="dashicons dashicons-controls-forward"></span>
						<span id="next-label" hidden>Next track</span>
					</button>

				</div>
				<ol className="playlist">
					{trackItems}
					<li>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => onTrackChange(tracks.length, media)}
								allowedTypes={['audio/mpeg']}
								render={({ open }) =>
									<Button className="is-primary right" onClick={open}>
										Add track
									</Button>
								}
							/>
						</MediaUploadCheck>
					</li>
				</ol>
			</div>
		</div>
	)
}
