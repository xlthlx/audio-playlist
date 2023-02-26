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

	const nowPLaying = document.getElementsByClassName('playing')[0],
		mp3Player = document.getElementById('player'),
		playlist = document.getElementById('playlist'),
		playButton = document.getElementById('play-button'),
		pauseButton = document.getElementById('pause-button'),
		currentTime = document.getElementById('current-time'),
		totalTime = document.getElementById('total-time'),
		seekSlider = document.getElementById('seek-slider'),
		volMuteButton = document.getElementById('vol-mute-btn'),
		volMutedButton = document.getElementById('vol-muted-btn'),
		volumeSlider = document.getElementById('volume-slider'),
		svgRepeat = document.getElementsByClassName('dashicons-controls-repeat')[0]

	let elems

	if (playlist && playlist.length !== 0) {
		elems = playlist.getElementsByClassName('track')
	}

	if (localStorage.getItem('repeat') === 'true' && svgRepeat) {
		svgRepeat.classList.add('on')
	}

	const prepZero = (number) => {
		if (number < 9)
			return '0' + number
		else
			return number
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
		if (elems.length !== 0) {
			mp3Player.src = elems[i].children[0].getAttribute('href')
			mp3Player.load()
			playButton.click()
		}
	}

	const setNowPlaying = (item) => {
		let num = item.dataset.num
		let title = item.dataset.title
		nowPLaying.textContent = num + ' - ' + title
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
		playButton.classList.remove('display-none')
		pauseButton.classList.add('display-none')
	}

	const setPlay = () => {
		playButton.classList.add('display-none')
		pauseButton.classList.remove('display-none')
	}

	const toggleMuteUnmute = () => {
		volMutedButton.classList.toggle('display-none')
		volMuteButton.classList.toggle('display-none')
	}

	const setVolumeSlider = () => {
		volumeSlider.value = mp3Player.volume
	}

	const clickMuteButton = () => {
		mp3Player.muted = true
		mp3Player.volume = 0
		setVolumeSlider()
		toggleMuteUnmute()
		volumeSlider.style.backgroundSize = '0% 100%'
	}

	const clickUnMuteButton = () => {
		mp3Player.muted = false
		mp3Player.volume = 1
		setVolumeSlider()
		toggleMuteUnmute()
		volumeSlider.style.backgroundSize = '100% 100%'
	}

	const clickPlayButton = () => {
		if (elems.length !== 0) {
			mp3Player.play()
			for (let i = 0; i < elems.length; i++) {
				if (elems[i].classList.contains('active')) {
					setNowPlaying(elems[i].children[0])
				}
			}
			setPlay()
		}
	}
	const clickPauseButton = () => {
		mp3Player.pause()
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
		totalTime.innerHTML = convertElapsedTime(event.target.duration)
		currentTime.innerHTML = convertElapsedTime(event.target.currentTime)
		seekSlider.max = event.target.duration
		seekSlider.setAttribute('value', event.target.currentTime)
	}

	const timeUpdate = (event) => {
		currentTime.innerHTML = convertElapsedTime(event.target.currentTime)
		seekSlider.setAttribute('value', event.target.currentTime)
		seekSlider.value = event.target.currentTime

		const min = seekSlider.min
		const max = seekSlider.max
		const val = seekSlider.value

		seekSlider.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
	}

	const onChangeSlider = (event) => {
		mp3Player.currentTime = event.target.value
	}

	const changeVolume = (event) => {
		mp3Player.volume = event.target.value

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

		mp3Player.src = event.target.href
		mp3Player.load()

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
				<audio key={index} id="player" onEnded={() => onEndTRack()} onTimeUpdate={event => timeUpdate(event)}
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
					templateLock="all"
				/>
				<div className="mp3__buttons">
					{audioPlayer}
					{nowPlaying}
					<div id="volume-container">

						<label htmlFor="volume-slider" hidden>Volume</label>
						<input onChange={event => changeVolume(event)} id="volume-slider" type="range" min="0" max="1" step="0.1"
									 autoComplete="off" role="slider" aria-label="Volume"/>

						<button title="Mute volume" onClick={() => clickMuteButton()}
										id="vol-mute-btn" aria-labelledby="vol-mute-label">
							<span className="dashicons dashicons-controls-volumeon"></span>
							<span id="vol-mute-label" hidden>Mute volume</span>
						</button>

						<button title="Unmute volume" className="display-none" onClick={() => clickUnMuteButton()}
										id="vol-muted-btn" aria-labelledby="vol-muted-label">
							<span className="dashicons dashicons-controls-volumeoff"></span>
							<span id="vol-muted-label" hidden>Unmute volume</span>
						</button>

					</div>

					<div className="repeat">
						<button onClick={() => clickRepeatButton()} title="Repeat all" aria-labelledby="vol-repeat-label">
							<span className="dashicons dashicons-controls-repeat"></span>
							<span id="vol-repeat-label" hidden>Repeat all</span>
						</button>
					</div>

					<div id="seek-container" className="left">
						<label htmlFor="seek-slider" hidden>Seek</label>
						<input onChange={event => onChangeSlider(event)} id="seek-slider" type="range" min="0" step="0.01"
									 autoComplete="off" role="slider" aria-label="Seek"/>
					</div>

					<div className="right"><span id="current-time"></span> / <span id="total-time"></span></div>

					<div id="play-pause-container">

						<button onClick={() => clickPrevButton()} title="Previous track" aria-labelledby="prev-label" type="button">
							<span className="dashicons dashicons-controls-back"></span>
							<span id="prev-label" hidden>Previous track</span>
						</button>

						<button onClick={() => clickPlayButton()} title="Play" id="play-button" aria-labelledby="play-label"
										type="button">
							<span className="dashicons dashicons-controls-play"></span>
							<span id="play-label" hidden>Play</span>
						</button>

						<button onClick={() => clickPauseButton()} title="Pause" id="pause-button" aria-labelledby="pause-label"
										className="display-none" type="button">
							<span className="dashicons dashicons-controls-pause"></span>
							<span id="pause-label" hidden>Pause</span>
						</button>

						<button onClick={() => clickNextButton()} title="Next track" id="next-button" aria-labelledby="next-label"
										type="button">
							<span className="dashicons dashicons-controls-forward"></span>
							<span id="next-label" hidden>Next track</span>
						</button>

					</div>
				</div>
				<ol id="playlist" className="mp3-album__tracks">
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
