/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");





function edit(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    tracks
  } = attributes;
  const ALBUM_TEMPLATE = [['core/image', {
    align: 'center',
    style: {
      'border': {
        'radius': '5px'
      }
    }
  }], ['core/heading', {
    placeholder: 'Album title',
    textAlign: 'center',
    level: 3
  }]];
  const prepZero = number => {
    if (number < 9) return '0' + number;else return number;
  };
  let elems;
  let playlist = document.querySelector('.playlist');
  if (playlist && playlist.length !== 0) {
    elems = playlist.getElementsByClassName('track');
  }
  let svgRepeat = document.querySelector('.dashicons-controls-repeat');
  if (localStorage.getItem('repeat') === 'true' && svgRepeat) {
    svgRepeat.classList.add('on');
  }
  const onTrackChange = (index, media) => {
    const updatedTracks = [...tracks];
    updatedTracks[index] = {
      url: media.url,
      title: media.title,
      artist: media.artist,
      duration: media.fileLength
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
    let minutes = Math.floor(inputSeconds / 60);
    return minutes + ':' + seconds;
  };
  const setSource = i => {
    if (0 !== elems.length) {
      document.querySelector('.player').src = elems[i].children[0].getAttribute('href');
      document.querySelector('.player').load();
      document.querySelector('.play-button').click();
    }
  };
  const setNowPlaying = item => {
    let num = item.dataset.num;
    let title = item.dataset.title;
    document.querySelector('.playing').textContent = num + ' - ' + title;
  };
  const setFirstTrack = elems => {
    if (localStorage.getItem('repeat') === 'true') {
      elems[0].classList.add('active');
      setSource(0);
      setNowPlaying(elems[0].children[0]);
    } else {
      elems[elems.length - 1].classList.add('active');
      clickPauseButton();
    }
  };
  const setLastTrack = elems => {
    if (localStorage.getItem('repeat') === 'true') {
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
    document.querySelector('.play-button').classList.remove('display-none');
    document.querySelector('.pause-button').classList.add('display-none');
  };
  const setPlay = () => {
    document.querySelector('.play-button').classList.add('display-none');
    document.querySelector('.pause-button').classList.remove('display-none');
  };
  const toggleMuteUnmute = () => {
    document.querySelector('.vol-muted-btn').classList.toggle('display-none');
    document.querySelector('.vol-mute-btn').classList.toggle('display-none');
  };
  const setVolumeSlider = () => {
    document.querySelector('.volume-slider').value = document.querySelector('.player').volume;
  };
  const clickMuteButton = () => {
    document.querySelector('.player').muted = true;
    document.querySelector('.player').volume = 0;
    setVolumeSlider();
    toggleMuteUnmute();
    document.querySelector('.volume-slider').style.backgroundSize = '0% 100%';
  };
  const clickUnMuteButton = () => {
    document.querySelector('.player').muted = false;
    document.querySelector('.player').volume = 1;
    setVolumeSlider();
    toggleMuteUnmute();
    document.querySelector('.volume-slider').style.backgroundSize = '100% 100%';
  };
  const clickPlayButton = () => {
    if (0 !== elems.length) {
      document.querySelector('.player').play();
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].classList.contains('active')) {
          setNowPlaying(elems[i].children[0]);
        }
      }
      setPlay();
    }
  };
  const clickPauseButton = () => {
    document.querySelector('.player').pause();
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
    document.querySelector('.total-time').innerHTML = convertElapsedTime(event.target.duration);
    document.querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime);
    let seekSlider = document.querySelector('.seek-slider');
    seekSlider.max = event.target.duration;
    seekSlider.setAttribute('value', event.target.currentTime);
  };
  const timeUpdate = event => {
    document.querySelector('.current-time').innerHTML = convertElapsedTime(event.target.currentTime);
    let seekSlider = document.querySelector('.seek-slider');
    seekSlider.setAttribute('value', event.target.currentTime);
    seekSlider.value = event.target.currentTime;
    const min = seekSlider.min;
    const max = seekSlider.max;
    const val = seekSlider.value;
    seekSlider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  };
  const onChangeSlider = event => {
    document.querySelector('.player').currentTime = event.target.value;
  };
  const changeVolume = event => {
    document.querySelector('.player').volume = event.target.value;
    const min = event.target.min;
    const max = event.target.max;
    const val = event.target.value;
    event.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  };
  const clickRepeatButton = () => {
    svgRepeat.classList.toggle('on');
    localStorage.setItem('repeat', '');
    if (svgRepeat.classList.contains('on')) {
      localStorage.setItem('repeat', 'true');
    }
  };
  const onClickTrack = event => {
    event.preventDefault();
    document.querySelector('.player').src = event.target.href;
    document.querySelector('.player').load();
    clickPlayButton();
    setNowPlaying(event.target);
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].classList.contains('active')) {
        elems[i].classList.remove('active');
      }
    }
    event.target.parentElement.classList.add('active');
  };
  const audioPlayer = tracks.map((track, index) => {
    if (index === 0) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("audio", {
      key: index,
      className: "player",
      onEnded: () => onEndTRack(),
      onTimeUpdate: event => timeUpdate(event),
      onLoadedMetadata: event => loadMetaData(event)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
      src: track.url,
      type: "audio/mpeg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Your browser does not support HTML audio, but you can still", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: track.url
    }, "download the music"), "."));
  });
  const nowPlaying = tracks.map((track, index) => {
    if (index === 0) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "playing"
    }, "01 - ", track.title);
  });
  const trackItems = tracks.map((track, index) => {
    let number = prepZero(index + 1);
    let classActive = number === '01' ? 'track active' : 'track';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: index,
      className: classActive
    }, track.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: track.url,
      className: "item",
      onClick: event => onClickTrack(event),
      "data-num": number,
      "data-length": track.duration,
      "data-title": track.title
    }, number, " - ", track.title, " - ", track.artist, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "right"
    }, track.duration)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
      onSelect: media => onTrackChange(index, media),
      allowedTypes: ['audio/mpeg'],
      value: track,
      render: _ref2 => {
        let {
          open
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          title: "Edit",
          className: "action",
          isSmall: true,
          onClick: open
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "dashicons dashicons-edit"
        }));
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      title: "Remove",
      className: "action",
      isDestructive: true,
      isSmall: true,
      onClick: () => onDeleteTrack(index)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dashicons dashicons-trash"
    })));
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "player-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
    template: ALBUM_TEMPLATE,
    templateLock: "insert"
  }), audioPlayer, nowPlaying, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-show"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "volume-slider",
    hidden: true
  }, "Volume"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    onChange: event => changeVolume(event),
    className: "volume-slider",
    type: "range",
    min: "0",
    max: "1",
    step: "0.1",
    autoComplete: "off",
    role: "slider",
    "aria-label": "Volume"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    title: "Mute volume",
    onClick: () => clickMuteButton(),
    className: "vol-mute-btn",
    "aria-labelledby": "vol-mute-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-volumeon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-mute-label",
    hidden: true
  }, "Mute volume")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    title: "Unmute volume",
    className: "vol-muted-btn display-none",
    onClick: () => clickUnMuteButton(),
    "aria-labelledby": "vol-muted-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-volumeoff"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-muted-label",
    hidden: true
  }, "Unmute volume"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => clickRepeatButton(),
    title: "Repeat all",
    className: "repeat",
    "aria-labelledby": "vol-repeat-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-repeat"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-repeat-label",
    hidden: true
  }, "Repeat all"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "seek-container left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "seek-slider",
    hidden: true
  }, "Seek"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    onChange: event => onChangeSlider(event),
    className: "seek-slider",
    type: "range",
    min: "0",
    step: "0.01",
    autoComplete: "off",
    role: "slider",
    "aria-label": "Seek"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "current-time"
  }), " / ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "total-time"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-pause-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => clickPrevButton(),
    title: "Previous track",
    "aria-labelledby": "prev-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-back"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "prev-label",
    hidden: true
  }, "Previous track")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => clickPlayButton(),
    title: "Play",
    className: "play-button",
    "aria-labelledby": "play-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-play"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "play-label",
    hidden: true
  }, "Play")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => clickPauseButton(),
    title: "Pause",
    "aria-labelledby": "pause-label",
    className: "pause-button display-none",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-pause"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "pause-label",
    hidden: true
  }, "Pause")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => clickNextButton(),
    title: "Next track",
    "aria-labelledby": "next-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-forward"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "next-label",
    hidden: true
  }, "Next track"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
    className: "playlist"
  }, trackItems, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: media => onTrackChange(tracks.length, media),
    allowedTypes: ['audio/mpeg'],
    render: _ref3 => {
      let {
        open
      } = _ref3;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: "is-primary right",
        onClick: open
      }, "Add track");
    }
  }))))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save(_ref) {
  let {
    attributes
  } = _ref;
  const {
    tracks
  } = attributes;
  const prepZero = number => {
    if (number < 9) return '0' + number;else return number;
  };
  const trackItems = tracks.map((track, index) => {
    let number = prepZero(index + 1);
    let classActive = number === '01' ? 'track active' : 'track';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: index,
      className: classActive
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: track.url,
      className: "item",
      onClick: "onClickTrack(event)",
      "data-num": number,
      "data-length": track.duration,
      "data-title": track.title
    }, number, " - ", track.title, " - ", track.artist, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "right"
    }, track.duration)));
  });
  const audioPlayer = tracks.map((track, index) => {
    if (index === 0) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("audio", {
      key: index,
      className: "player",
      onEnded: "onEndTRack()",
      onTimeUpdate: "timeUpdate(event)",
      onLoadedMetadata: "loadMetaData(event)"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
      src: track.url,
      type: "audio/mpeg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Your browser does not support HTML audio, but you can still", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: track.url
    }, "download the music"), "."));
  });
  const nowPlaying = tracks.map((track, index) => {
    if (index === 0) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "playing"
    }, "01 - ", track.title);
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "player-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)), audioPlayer, nowPlaying, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-show"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "volume-slider",
    hidden: true
  }, "Volume"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    onMouseMove: "changeVolume(event)",
    className: "volume-slider",
    type: "range",
    min: "0",
    max: "1",
    value: "1",
    step: "0.1",
    autoComplete: "off",
    role: "slider",
    "aria-label": "Volume"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    title: "Mute volume",
    onClick: "clickMuteButton()",
    className: "vol-mute-btn",
    "aria-labelledby": "vol-mute-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-volumeon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-mute-label",
    hidden: true
  }, "Mute volume")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    title: "Unmute volume",
    className: "vol-muted-btn display-none",
    onClick: "clickUnMuteButton()",
    "aria-labelledby": "vol-muted-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-volumeoff"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-muted-label",
    hidden: true
  }, "Unmute volume"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: "clickRepeatButton()",
    title: "Repeat all",
    className: "repeat",
    "aria-labelledby": "vol-repeat-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-repeat"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "vol-repeat-label",
    hidden: true
  }, "Repeat all"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "seek-container left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "seek-slider",
    hidden: true
  }, "Seek"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    onChange: "onChangeSlider(event)",
    className: "seek-slider",
    type: "range",
    min: "0",
    step: "0.01",
    autoComplete: "off",
    role: "slider",
    "aria-label": "Seek"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "current-time"
  }), " / ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "total-time"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-pause-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: "clickPrevButton()",
    title: "Previous track",
    "aria-labelledby": "prev-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-back"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "prev-label",
    hidden: true
  }, "Previous track")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: "clickPlayButton()",
    title: "Play",
    className: "play-button",
    "aria-labelledby": "play-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-play"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "play-label",
    hidden: true
  }, "Play")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: "clickPauseButton()",
    title: "Pause",
    className: "pause-button display-none",
    "aria-labelledby": "pause-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-pause"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "pause-label",
    hidden: true
  }, "Pause")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: "clickNextButton()",
    title: "Next track",
    "aria-labelledby": "next-label",
    type: "button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-controls-forward"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "next-label",
    hidden: true
  }, "Next track"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
    className: "playlist"
  }, trackItems));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"xlthlx/mp3-album","version":"0.1.0","title":"Mp3 Album","category":"media","icon":"playlist-audio","description":"Create and show your album with mp3 list.","keywords":["mp3","playlist","list","album","cover"],"supports":{"html":true,"className":true,"multiple":false,"color":{"text":true,"background":true,"link":true},"example":{}},"textdomain":"mp3-album","attributes":{"tracks":{"selector":"li","type":"array","default":[]}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkmp3_album"] = self["webpackChunkmp3_album"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map