const nowPLaying = document.getElementsByClassName("playing")[0],
	mp3Player = document.getElementById("player"),
	playlist = document.getElementById("playlist"),
	playButton = document.getElementById("play-button"),
	pauseButton = document.getElementById("pause-button"),
	currentTime = document.getElementById("current-time"),
	totalTime = document.getElementById("total-time"),
	seekSlider = document.getElementById("seek-slider"),
	volMuteButton = document.getElementById("vol-mute-btn"),
	volMutedButton = document.getElementById("vol-muted-btn"),
	volumeSlider = document.getElementById("volume-slider"),
	svgRepeat = document.getElementsByClassName('dashicons-controls-repeat')[0]

let elems

if (playlist && playlist.length !== 0) {
	elems = playlist.getElementsByClassName('track')
}

if (localStorage.getItem('repeat') === 'true' && svgRepeat) {
	svgRepeat.classList.add('on')
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
