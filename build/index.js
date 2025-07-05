/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"xlthlx/audio-playlist","version":"0.1.0","title":"Audio Playlist","category":"media","icon":"playlist-audio","description":"Create and show your audio playlist with player.","keywords":["mp3","playlist","list","album","cover"],"supports":{"html":true,"className":true,"multiple":true},"textdomain":"audio-playlist","attributes":{"tracks":{"type":"array","default":[]},"playerId":{"type":"string","default":""}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);





function edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    tracks
  } = attributes;
  const PLAYLIST_TEMPLATE = [['core/image', {
    align: 'center',
    style: {
      border: {
        radius: '5px'
      }
    }
  }], ['core/heading', {
    placeholder: 'Playlist title',
    textAlign: 'center',
    level: 3
  }]];
  const pID = attributes.playerId;
  const prepZero = number => {
    if (number <= 9) {
      return '0' + number;
    }
    return number;
  };
  const getElems = () => {
    const playlist = document.getElementById(pID).querySelector('.playlist');
    if (playlist && playlist.length !== 0) {
      return document.getElementById(pID).getElementsByClassName('track');
    }
  };
  const getRepeat = event => {
    if (localStorage.getItem('repeat-' + pID) === 'true') {
      event.target.classList.add('on');
    }
  };
  const onTracksUpload = media => {
    const updatedTracks = [...tracks];
    for (let index = 0; index < media.length; index++) {
      const num = tracks.length + index;
      updatedTracks[num] = {
        url: media[index].url,
        title: media[index].title,
        artist: media[index].meta.artist,
        duration: media[index].fileLength,
        trackid: media[index].id
      };
    }
    setAttributes({
      tracks: updatedTracks
    });
    setAttributes({
      playerId: clientId
    });
  };
  const onTrackChange = (index, media) => {
    const updatedTracks = [...tracks];
    updatedTracks[index] = {
      url: media.url,
      title: media.title,
      artist: media.meta.artist,
      duration: media.fileLength,
      trackid: media.id
    };
    setAttributes({
      tracks: updatedTracks
    });
  };
  const onDeleteTrack = index => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setAttributes({
      tracks: updatedTracks
    });
  };
  const convertElapsedTime = inputSeconds => {
    let seconds = Math.floor(inputSeconds % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    const minutes = Math.floor(inputSeconds / 60);
    return minutes + ':' + seconds;
  };
  const setSource = i => {
    const elems = getElems();
    if (0 !== elems.length) {
      const playerCont = document.getElementById(pID);
      const thisPLayer = playerCont.querySelector('.player');
      thisPLayer.src = elems[i].children[0].getAttribute('href');
      thisPLayer.load();
      playerCont.querySelector('.play-button').click();
    }
  };
  const setNowPlaying = item => {
    const num = item.dataset.num;
    const title = item.dataset.title;
    document.getElementById(pID).querySelector('.playing').textContent = num + ' - ' + title;
  };
  const setFirstTrack = elems => {
    if (localStorage.getItem('repeat-' + pID) === 'true') {
      elems[0].classList.add('active');
      setSource(0);
      setNowPlaying(elems[0].children[0]);
    } else {
      elems[elems.length - 1].classList.add('active');
      clickPauseButton();
    }
  };
  const setLastTrack = elems => {
    if (localStorage.getItem('repeat-' + pID) === 'true') {
      elems[elems.length - 1].classList.add('active');
      setSource(elems.length - 1);
      setNowPlaying(elems[elems.length - 1].children[0]);
    } else {
      elems[0].classList.add('active');
      clickPauseButton();
    }
  };
  const setNextTrack = (i, elems) => {
    if (i < elems.length) {
      elems[i].classList.add('active');
      setSource(i);
      setNowPlaying(elems[i].children[0]);
    } else {
      setFirstTrack(elems);
    }
  };
  const setPrevTrack = (i, elems) => {
    if (i < elems.length) {
      elems[i].classList.add('active');
      setSource(i);
      setNowPlaying(elems[i].children[0]);
    } else {
      setLastTrack(elems);
    }
  };
  const changeTrack = direction => {
    const elems = getElems();
    if (elems.length !== 0) {
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].classList.contains('active')) {
          elems[i].classList.remove('active');
          if (direction === 'next') {
            i++;
            setNextTrack(i, elems);
          } else {
            i > 0 ? i-- : i = elems.length + 1;
            setPrevTrack(i, elems);
          }
        }
      }
    }
  };
  const setPause = () => {
    document.getElementById(pID).querySelector('.play-button').classList.remove('display-none');
    document.getElementById(pID).querySelector('.pause-button').classList.add('display-none');
  };
  const setPlay = () => {
    document.getElementById(pID).querySelector('.play-button').classList.add('display-none');
    document.getElementById(pID).querySelector('.pause-button').classList.remove('display-none');
  };
  const toggleMuteUnmute = () => {
    document.getElementById(pID).querySelector('.vol-muted-btn').classList.toggle('display-none');
    document.getElementById(pID).querySelector('.vol-mute-btn').classList.toggle('display-none');
  };
  const setVolumeSlider = () => {
    document.getElementById(pID).querySelector('.volume-slider').value = document.getElementById(pID).querySelector('.player').volume;
  };
  const clickMuteButton = () => {
    document.getElementById(pID).querySelector('.player').muted = true;
    document.getElementById(pID).querySelector('.player').volume = 0;
    setVolumeSlider();
    toggleMuteUnmute();
    document.getElementById(pID).querySelector('.volume-slider').style.backgroundSize = '0% 100%';
  };
  const clickUnMuteButton = () => {
    document.getElementById(pID).querySelector('.player').muted = false;
    document.getElementById(pID).querySelector('.player').volume = 1;
    setVolumeSlider();
    toggleMuteUnmute();
    document.getElementById(pID).querySelector('.volume-slider').style.backgroundSize = '100% 100%';
  };
  const clickPlayButton = () => {
    const elems = getElems();
    if (0 !== elems.length) {
      document.getElementById(pID).querySelector('.player').play();
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].classList.contains('active')) {
          setNowPlaying(elems[i].children[0]);
        }
      }
      setPlay();
    }
  };
  const clickPauseButton = () => {
    document.getElementById(pID).querySelector('.player').pause();
    setPause();
  };
  const onEndTRack = () => {
    changeTrack('next');
  };
  const clickNextButton = () => {
    changeTrack('next');
  };
  const clickPrevButton = () => {
    changeTrack('prev');
  };
  const loadMetaData = event => {
    const elems = getElems();
    if (elems) {
      document.getElementById(pID).querySelector('.total-time').innerHTML = convertElapsedTime(event.target.duration);
      document.getElementById(pID).querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime);
      document.getElementById(pID).querySelector('.time-sep').innerHTML = ' / ';
      const seekSlider = document.getElementById(pID).querySelector('.seek-slider');
      seekSlider.max = event.target.duration;
      seekSlider.setAttribute('value', event.target.currentTime);
    }
  };
  const timeUpdate = event => {
    document.getElementById(pID).querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime);
    const seekSlider = document.getElementById(pID).querySelector('.seek-slider');
    seekSlider.setAttribute('value', event.target.currentTime);
    seekSlider.value = event.target.currentTime;
    const min = seekSlider.min;
    const max = seekSlider.max;
    const val = seekSlider.value;
    seekSlider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  };
  const onChangeSlider = event => {
    document.getElementById(pID).querySelector('.player').currentTime = event.target.value;
  };
  const changeVolume = event => {
    const mp3Player = document.getElementById(pID).querySelector('.player');
    if (mp3Player) {
      mp3Player.volume = event.target.value;
    }
    const min = event.target.min;
    const max = event.target.max;
    const val = event.target.value;
    event.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  };
  const clickRepeatButton = event => {
    event.target.classList.toggle('on');
    localStorage.removeItem('repeat-' + pID);
    if (event.target.classList.contains('on')) {
      localStorage.setItem('repeat-' + pID, 'true');
    }
  };
  const onClickTrack = event => {
    event.preventDefault();
    document.getElementById(pID).querySelector('.player').src = event.target.href;
    document.getElementById(pID).querySelector('.player').load();
    clickPlayButton();
    setNowPlaying(event.target);
    const elems = getElems();
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].classList.contains('active')) {
        elems[i].classList.remove('active');
      }
    }
    event.target.parentElement.classList.add('active');
  };
  const audioPlayer = tracks.map((track, index) => {
    if (index === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("audio", {
        className: "player",
        onEnded: () => onEndTRack(),
        onTimeUpdate: event => timeUpdate(event),
        onLoadedMetadata: event => loadMetaData(event),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
          src: track.url,
          type: "audio/mpeg"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
          children: ["Your browser does not support HTML audio, but you can still", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: track.url,
            children: "download the music"
          }), "."]
        })]
      }, index);
    }
  });
  const nowPlaying = tracks.map((track, index) => {
    if (index === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
        className: "playing",
        children: ["01 - ", track.title]
      }, index);
    }
  });
  const trackItems = tracks.map((track, index) => {
    const number = prepZero(index + 1);
    const classActive = number === '01' ? 'track active' : 'track';
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("li", {
      className: classActive,
      children: [track.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
        href: track.url,
        className: "item",
        onClick: event => onClickTrack(event),
        "data-id": track.trackid,
        "data-num": number,
        "data-length": track.duration,
        "data-title": track.title,
        children: [number, " - ", track.title, " - ", track.artist, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "right",
          children: track.duration
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
          onSelect: media => onTrackChange(index, media),
          allowedTypes: ['audio'],
          value: track,
          render: ({
            open
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            title: "Edit",
            className: "action",
            onClick: open,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-edit"
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        title: "Remove",
        className: "action",
        isDestructive: true,
        onClick: () => onDeleteTrack(index),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "dashicons dashicons-trash"
        })
      })]
    }, track.trackid);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "player-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks, {
        template: PLAYLIST_TEMPLATE,
        templateLock: "insert"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        id: pID,
        children: [audioPlayer, nowPlaying, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "volume-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "volume-show",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "volume-slider",
              hidden: true,
              children: "Volume"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              onChange: event => changeVolume(event),
              className: "volume-slider",
              type: "range",
              min: "0",
              max: "1",
              step: "0.1",
              autoComplete: "off",
              role: "slider",
              "aria-label": "Volume"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
              title: "Mute volume",
              onClick: () => clickMuteButton(),
              className: "vol-mute-btn",
              "aria-labelledby": "vol-mute-label",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "dashicons dashicons-controls-volumeon"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                id: "vol-mute-label",
                hidden: true,
                children: "Mute volume"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
              title: "Unmute volume",
              className: "vol-muted-btn display-none",
              onClick: () => clickUnMuteButton(),
              "aria-labelledby": "vol-muted-label",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "dashicons dashicons-controls-volumeoff"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                id: "vol-muted-label",
                hidden: true,
                children: "Unmute volume"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            onMouseOver: event => getRepeat(event),
            onClick: event => clickRepeatButton(event),
            title: "Repeat all",
            className: "repeat",
            "aria-labelledby": "vol-repeat-label",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-controls-repeat"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              id: "vol-repeat-label",
              hidden: true,
              children: "Repeat all"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "seek-container left",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
            htmlFor: "seek-slider",
            hidden: true,
            children: "Seek"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
            onChange: event => onChangeSlider(event),
            className: "seek-slider",
            type: "range",
            min: "0",
            step: "0.01",
            value: "0",
            autoComplete: "off",
            role: "slider",
            "aria-label": "Seek"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "right",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "current-time"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "time-sep"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "total-time"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "play-pause-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            onClick: () => clickPrevButton(),
            title: "Previous track",
            "aria-labelledby": "prev-label",
            type: "button",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-controls-back"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              id: "prev-label",
              hidden: true,
              children: "Previous track"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            onClick: () => clickPlayButton(),
            title: "Play",
            className: "play-button",
            "aria-labelledby": "play-label",
            type: "button",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-controls-play"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              id: "play-label",
              hidden: true,
              children: "Play"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            onClick: () => clickPauseButton(),
            title: "Pause",
            "aria-labelledby": "pause-label",
            className: "pause-button display-none",
            type: "button",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-controls-pause"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              id: "pause-label",
              hidden: true,
              children: "Pause"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            onClick: () => clickNextButton(),
            title: "Next track",
            "aria-labelledby": "next-label",
            type: "button",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "dashicons dashicons-controls-forward"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              id: "next-label",
              hidden: true,
              children: "Next track"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ol", {
          className: "playlist",
          children: trackItems
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
            onSelect: media => onTracksUpload(media),
            allowedTypes: ['audio'],
            multiple: true,
            title: 'Select or Upload audio',
            value: tracks.map(media => media.url),
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "is-primary right",
              onClick: open,
              children: "Add tracks"
            })
          })
        })]
      })]
    })
  });
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save() {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
  });
}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkaudio_playlist"] = globalThis["webpackChunkaudio_playlist"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map