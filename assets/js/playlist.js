document
	.querySelectorAll( '.wp-block-xlthlx-audio-player.player-container' )
	.forEach( ( playlistContainer ) => {
		if ( playlistContainer ) {
			const playerID = playlistContainer.dataset.id;
			let elems;

			const playlist = playlistContainer.querySelector( '.playlist' );
			if ( playlist && playlist.length !== 0 ) {
				elems = playlist.getElementsByClassName( 'track' );
			}

			const svgRepeat = playlistContainer.querySelector(
				'.dashicons-controls-repeat'
			);

			if (
				localStorage.getItem( 'repeat-' + playerID ) === 'true' &&
				svgRepeat
			) {
				svgRepeat.classList.add( 'on' );
			}

			const convertElapsedTime = ( inputSeconds ) => {
				let seconds = Math.floor( inputSeconds % 60 );
				if ( seconds < 10 ) {
					seconds = '0' + seconds;
				}
				const minutes = Math.floor( inputSeconds / 60 );
				return minutes + ':' + seconds;
			};

			const setSource = ( i ) => {
				if ( 0 !== elems.length ) {
					playlistContainer.querySelector( '.player' ).src =
						elems[ i ].children[ 0 ].getAttribute( 'href' );
					playlistContainer.querySelector( '.player' ).load();
					playlistContainer.querySelector( '.play-button' ).click();
				}
			};

			const setNowPlaying = ( item ) => {
				const num = item.dataset.num;
				const title = item.dataset.title;
				playlistContainer.querySelector( '.playing' ).textContent =
					num + ' - ' + title;
			};

			const setFirstTrack = ( elems ) => {
				if ( localStorage.getItem( 'repeat-' + playerID ) === 'true' ) {
					elems[ 0 ].classList.add( 'active' );
					setSource( 0 );
					setNowPlaying( elems[ 0 ].children[ 0 ] );
				} else {
					elems[ elems.length - 1 ].classList.add( 'active' );
					playlistContainer.querySelector( '.pause-button' ).click();
				}
			};

			const setLastTrack = ( elems ) => {
				if ( localStorage.getItem( 'repeat-' + playerID ) === 'true' ) {
					elems[ elems.length - 1 ].classList.add( 'active' );
					setSource( elems.length - 1 );
					setNowPlaying( elems[ elems.length - 1 ].children[ 0 ] );
				} else {
					elems[ 0 ].classList.add( 'active' );
					playlistContainer.querySelector( '.pause-button' ).click();
				}
			};

			const setNextTrack = ( i, elems ) => {
				if ( i < elems.length ) {
					elems[ i ].classList.add( 'active' );
					setSource( i );
					setNowPlaying( elems[ i ].children[ 0 ] );
				} else {
					setFirstTrack( elems );
				}
			};

			const setPrevTrack = ( i, elems ) => {
				if ( i < elems.length ) {
					elems[ i ].classList.add( 'active' );
					setSource( i );
					setNowPlaying( elems[ i ].children[ 0 ] );
				} else {
					setLastTrack( elems );
				}
			};

			const changeTrack = ( direction ) => {
				if ( elems.length !== 0 ) {
					for ( let i = 0; i < elems.length; i++ ) {
						if ( elems[ i ].classList.contains( 'active' ) ) {
							elems[ i ].classList.remove( 'active' );
							if ( direction === 'next' ) {
								i++;
								setNextTrack( i, elems );
							} else {
								i > 0 ? i-- : ( i = elems.length + 1 );
								setPrevTrack( i, elems );
							}
						}
					}
				}
			};

			const setPause = () => {
				playlistContainer
					.querySelector( '.play-button' )
					.classList.remove( 'display-none' );
				playlistContainer
					.querySelector( '.pause-button' )
					.classList.add( 'display-none' );
			};

			const setPlay = () => {
				playlistContainer
					.querySelector( '.play-button' )
					.classList.add( 'display-none' );
				playlistContainer
					.querySelector( '.pause-button' )
					.classList.remove( 'display-none' );
			};

			const toggleMuteUnmute = () => {
				playlistContainer
					.querySelector( '.vol-muted-btn' )
					.classList.toggle( 'display-none' );
				playlistContainer
					.querySelector( '.vol-mute-btn' )
					.classList.toggle( 'display-none' );
			};

			const setVolumeSlider = () => {
				playlistContainer.querySelector( '.volume-slider' ).value =
					playlistContainer.querySelector( '.player' ).volume;
			};

			playlistContainer
				.querySelector( '.vol-mute-btn' )
				.addEventListener( 'click', function () {
					playlistContainer.querySelector( '.player' ).muted = true;
					playlistContainer.querySelector( '.player' ).volume = 0;
					setVolumeSlider();
					toggleMuteUnmute();
					playlistContainer.querySelector(
						'.volume-slider'
					).style.backgroundSize = '0% 100%';
				} );

			playlistContainer
				.querySelector( '.vol-muted-btn' )
				.addEventListener( 'click', function () {
					playlistContainer.querySelector( '.player' ).muted = false;
					playlistContainer.querySelector( '.player' ).volume = 1;
					setVolumeSlider();
					toggleMuteUnmute();
					playlistContainer.querySelector(
						'.volume-slider'
					).style.backgroundSize = '100% 100%';
				} );

			playlistContainer
				.querySelector( '.play-button' )
				.addEventListener( 'click', function () {
					if ( 0 !== elems.length ) {
						playlistContainer.querySelector( '.player' ).play();
						for ( let i = 0; i < elems.length; i++ ) {
							if ( elems[ i ].classList.contains( 'active' ) ) {
								setNowPlaying( elems[ i ].children[ 0 ] );
							}
						}
						setPlay();
					}
				} );
			playlistContainer
				.querySelector( '.pause-button' )
				.addEventListener( 'click', function () {
					playlistContainer.querySelector( '.player' ).pause();
					setPause();
				} );
			playlistContainer
				.querySelector( '.next-button' )
				.addEventListener( 'click', function () {
					changeTrack( 'next' );
				} );
			playlistContainer
				.querySelector( '.prev-button' )
				.addEventListener( 'click', function () {
					changeTrack( 'prev' );
				} );

			const audio_player = playlistContainer.querySelector( '.player' );

			audio_player.addEventListener( 'loadedmetadata', function () {
				if ( elems ) {
					playlistContainer.querySelector( '.total-time' ).innerHTML =
						convertElapsedTime( audio_player.duration );
					playlistContainer.querySelector(
						'.current-time'
					).innerHTML = convertElapsedTime(
						audio_player.currentTime
					);
					playlistContainer.querySelector( '.time-sep' ).innerHTML =
						' / ';
					const seekSlider =
						playlistContainer.querySelector( '.seek-slider' );
					seekSlider.max = audio_player.duration;
					seekSlider.setAttribute(
						'value',
						audio_player.currentTime
					);
				}
			} );

			audio_player.addEventListener( 'timeupdate', function () {
				if ( elems ) {
					playlistContainer.querySelector(
						'.current-time'
					).innerHTML = convertElapsedTime(
						audio_player.currentTime
					);
					const seekSlider =
						playlistContainer.querySelector( '.seek-slider' );
					seekSlider.setAttribute(
						'value',
						audio_player.currentTime
					);
					seekSlider.value = audio_player.currentTime;

					const min = seekSlider.min;
					const max = seekSlider.max;
					const val = seekSlider.value;

					seekSlider.style.backgroundSize =
						( ( val - min ) * 100 ) / ( max - min ) + '% 100%';
				}
			} );

			audio_player.addEventListener( 'ended', function () {
				changeTrack( 'next' );
			} );
			playlistContainer
				.querySelector( '.seek-slider' )
				.addEventListener( 'input', function () {
					audio_player.currentTime =
						playlistContainer.querySelector( '.seek-slider' ).value;
				} );

			const volSlider =
				playlistContainer.querySelector( '.volume-slider' );
			volSlider.addEventListener( 'mousemove', function () {
				audio_player.volume = volSlider.value;

				const min = volSlider.min;
				const max = volSlider.max;
				const val = volSlider.value;

				volSlider.style.backgroundSize =
					( ( val - min ) * 100 ) / ( max - min ) + '% 100%';
			} );

			playlistContainer
				.querySelector( '.repeat' )
				.addEventListener( 'click', function () {
					svgRepeat.classList.toggle( 'on' );
					localStorage.removeItem( 'repeat-' + playerID );

					if ( svgRepeat.classList.contains( 'on' ) ) {
						localStorage.setItem( 'repeat-' + playerID, 'true' );
					}
				} );

			playlistContainer.querySelectorAll( '.item' ).forEach( ( item ) => {
				item.addEventListener( 'click', ( event ) => {
					event.preventDefault();

					playlistContainer.querySelector( '.player' ).src =
						item.href;
					playlistContainer.querySelector( '.player' ).load();
					playlistContainer.querySelector( '.play-button' ).click();
					setNowPlaying( item );
					for ( let i = 0; i < elems.length; i++ ) {
						if ( elems[ i ].classList.contains( 'active' ) ) {
							elems[ i ].classList.remove( 'active' );
						}
					}
					item.parentElement.classList.add( 'active' );
				} );
			} );

			for ( let i = 0; i < elems.length; i++ ) {
				elems[ i ].addEventListener( 'click', function () {
					elems[ i ].children[ 0 ].click();
				} );
			}
		}
	} );
