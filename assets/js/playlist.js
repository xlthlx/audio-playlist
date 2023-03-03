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
