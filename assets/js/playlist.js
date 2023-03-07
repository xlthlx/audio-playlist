let elems

let playlist = document.querySelector('.playlist')
if (playlist && playlist.length !== 0) {
	elems = playlist.getElementsByClassName('track')
}

let svgRepeat = document.querySelector('.dashicons-controls-repeat')

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
		document.querySelector('.pause-button').click()
	}
}

const setLastTrack = (elems) => {
	if (localStorage.getItem('repeat') === 'true') {
		elems[elems.length - 1].classList.add('active')
		setSource(elems.length - 1)
		setNowPlaying(elems[elems.length - 1].children[0])
	} else {
		elems[0].classList.add('active')
		document.querySelector('.pause-button').click()
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
document.querySelector('.vol-mute-btn').addEventListener('click', function () {
	document.querySelector('.player').muted = true
	document.querySelector('.player').volume = 0
	setVolumeSlider()
	toggleMuteUnmute()
	document.querySelector('.volume-slider').style.backgroundSize = '0% 100%'
})

document.querySelector('.vol-muted-btn').addEventListener('click', function () {
	document.querySelector('.player').muted = false
	document.querySelector('.player').volume = 1
	setVolumeSlider()
	toggleMuteUnmute()
	document.querySelector('.volume-slider').style.backgroundSize = '100% 100%'
})

document.querySelector('.play-button').addEventListener('click', function () {
	if (0 !== elems.length) {
		document.querySelector('.player').play()
		for (let i = 0; i < elems.length; i++) {
			if (elems[i].classList.contains('active')) {
				setNowPlaying(elems[i].children[0])
			}
		}
		setPlay()
	}
})
document.querySelector('.pause-button').addEventListener('click', function () {
	document.querySelector('.player').pause()
	setPause()
})
document.querySelector('.next-button').addEventListener('click', function () {
	changeTrack('next')
})
document.querySelector('.prev-button').addEventListener('click', function () {
	changeTrack('prev')
})

const audio_player = document.querySelector('.player')

audio_player.addEventListener('loadedmetadata', function () {
	document.querySelector('.total-time').innerHTML = convertElapsedTime(audio_player.duration)
	document.querySelector('.current-time').innerHTML = convertElapsedTime(audio_player.currentTime)
	document.querySelector('.time-sep').innerHTML = ' / '
	let seekSlider = document.querySelector('.seek-slider')
	seekSlider.max = audio_player.duration
	seekSlider.setAttribute('value', audio_player.currentTime)
})

audio_player.addEventListener('timeupdate', function () {
	document.querySelector('.current-time').innerHTML = convertElapsedTime(audio_player.currentTime)
	let seekSlider = document.querySelector('.seek-slider')
	seekSlider.setAttribute('value', audio_player.currentTime)
	seekSlider.value = audio_player.currentTime

	const min = seekSlider.min
	const max = seekSlider.max
	const val = seekSlider.value

	seekSlider.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
})

audio_player.addEventListener('ended', function () {
	changeTrack('next')
})
document.querySelector('.seek-slider').addEventListener('input', function () {
	audio_player.currentTime = document.querySelector('.seek-slider').value
})

const volSlider = document.querySelector('.volume-slider')
volSlider.addEventListener('mousemove', function () {
	audio_player.volume = volSlider.value

	const min = volSlider.min
	const max = volSlider.max
	const val = volSlider.value

	volSlider.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
})

document.querySelector('.repeat').addEventListener('click', function () {
	svgRepeat.classList.toggle('on')
	localStorage.setItem('repeat', '')

	if (svgRepeat.classList.contains('on')) {
		localStorage.setItem('repeat', 'true')
	}
})

document.querySelectorAll('.item').forEach((item) => {
	item.addEventListener('click', (event) => {
		event.preventDefault()

		document.querySelector('.player').src = item.href
		document.querySelector('.player').load()
		document.querySelector('.play-button').click()
		setNowPlaying(item)
		for (let i = 0; i < elems.length; i++) {
			if (elems[i].classList.contains('active')) {
				elems[i].classList.remove('active')
			}
		}
		item.parentElement.classList.add('active')
	})
})

for (let i = 0; i < elems.length; i++) {
	elems[i].addEventListener('click', function () {
		elems[i].children[0].click()
	})
}
