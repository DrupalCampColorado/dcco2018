/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(3);

	__webpack_require__(5);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $skipLinkHolder = (0, _jquery2.default)('#skip-to-content'),
	    $skipLink = $skipLinkHolder.find('.skip-to-content-link'); /**
	                                                                * @file
	                                                                * Skip link for accessibility
	                                                                */


	$skipLink.on('click', function (e) {
	  e.preventDefault();
	  var $target = (0, _jquery2.default)((0, _jquery2.default)(this).attr('href'));
	  $target.attr('tabindex', '-1');
	  $target.focus();
	  $target.on('blur focusout', function () {
	    (0, _jquery2.default)(this).removeAttr('tabindex');
	  });
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = jQuery;

	var vidLoaded = false;
	var $vidWrapper = $(".paragraph--type--compound-banner .video-container");
	var opts = {
	  videoUrl: 'https://www.youtube.com/watch?v=M-aytlS3gwQ',
	  videoType: 'youtube',
	  aspectRatio: 1.33333, // 16:9
	  autoplay: 1,
	  loop: 1,
	  controls: 0,
	  backgroundSize: 'cover', // Same as css background-size: cover;
	  verticalAlign: 'middle'
	};

	$(window).on('load', function () {
	  if (window.matchMedia("(min-width: 640px)").matches) {
	    vidLoaded = true;
	    var bgVideo = new _jquery2.default($vidWrapper, opts);
	  }
	});

	$(window).on('resize', function () {
	  if (!vidLoaded && window.matchMedia("(min-width: 639px)").matches) {
	    vidLoaded = true;
	    var bgVideo = new _jquery2.default($vidWrapper, opts);
	  }
	});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var $ = jQuery;

	var VidKit = function () {
	  function VidKit($el, opts) {
	    _classCallCheck(this, VidKit);

	    if (!opts.videoUrl || !opts.videoType) {
	      return;
	    }
	    this.init(opts, $el);
	  }

	  _createClass(VidKit, [{
	    key: 'init',
	    value: function init(settings, $base) {
	      this.opts = $.extend({
	        videoUrl: '',
	        videoType: 'youtube',
	        elementId: 'bg-video',
	        loop: 1,
	        autoplay: 1,
	        controls: 0,
	        aspectRatio: 1.3333333,
	        verticalAlign: 'middle',
	        backgroundSize: 'cover'
	      }, settings);

	      this.$base = $($base);
	      this.$parent = this.$base.parent();

	      this.opts.videoId = this.getVideoId();
	      this.playerReady = false;
	      this.state = -1;
	      this.player = '';

	      // Autoplay isn't supported on many mobile devices so we
	      // shouldn't even bother with a background video.
	      if (typeof Modernizr !== 'undefined' && Modernizr.touchevents) {
	        return;
	      }

	      if (this.opts.videoType === "youtube") {
	        this.initYT();
	      } else if (this.opts.videoType === "vimeo") {
	        this.initVimeo();
	      } else {
	        throw new Error('The video type is not supported.');
	      }

	      this.setFluidContainer();
	    }
	  }, {
	    key: 'initYT',
	    value: function initYT() {
	      var player = void 0;
	      var inst = this;
	      // This code loads the IFrame Player API code asynchronously.
	      var tag = document.createElement('script');

	      tag.src = "https://www.youtube.com/iframe_api";
	      var firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      // Create container element since YT API can only select elements by id.
	      this.$base.prepend('<div id="' + this.opts.elementId + '" />');

	      // This function creates an <iframe> (and YouTube player)
	      //    after the API code downloads.
	      window.onYouTubeIframeAPIReady = function () {
	        player = new YT.Player(inst.opts.elementId, {
	          width: '100%',
	          height: '100%',
	          videoId: inst.opts.videoId,
	          playerVars: {
	            'autoplay': inst.opts.autoplay,
	            'controls': inst.opts.controls,
	            'showinfo': 0,
	            'rel': 0,
	            'modestbranding': 1,
	            'wmode': 'transparent',
	            'relatedvideos': 0
	          },
	          events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	          }
	        });
	      };

	      // The API will call this function when the video player is ready.
	      window.onPlayerReady = function (event) {
	        inst.player = event.target;

	        if (inst.opts.autoplay === 1) {
	          event.target.playVideo();
	          inst.$base.trigger('vidKit.playing');
	        } else {
	          inst.$base.addClass('loaded');
	        }

	        player.setVolume(0);

	        var $vidKit = $(player.getIframe());
	        var styles = {
	          position: 'absolute',
	          left: '0',
	          top: '0'
	        };

	        if (player.getPlayerState(0)) {
	          $vidKit.css(styles);
	        }
	        $vidKit.attr('tabindex', '-1');
	        inst.playerReady = true;
	        inst.$base.trigger('vidKit.ready');
	      };

	      window.onPlayerStateChange = function (state) {
	        inst.state = state.data;
	        if (state.data === 0) {
	          // ended
	          player.seekTo(0); // restart
	          inst.$base.trigger('vidKit.ended');
	        } else if (state.data === 1) {
	          // playing
	          inst.$base.trigger('vidKit.playing');
	          inst.$base.addClass('loaded');
	        }
	      };
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.playerReady) {
	        this.player.playVideo();
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.playerReady && this.state === 1) {
	        this.player.pauseVideo();
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.playerReady) {
	        this.player.stopVideo();
	      }
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(seconds) {
	      if (this.playerReady) {
	        seconds = seconds || 0;
	        this.player.seekTo(seconds);
	      }
	    }
	  }, {
	    key: 'initVimeo',
	    value: function initVimeo() {
	      var player = void 0,
	          tag = void 0,
	          firstScriptTag = void 0,
	          $iframe = void 0;
	      var inst = this;
	      var width = Math.ceil(inst.$parent.width());
	      var height = Math.ceil(width / inst.opts.aspectRatio);
	      var src = '//player.vimeo.com/video/' + inst.opts.videoId + '?';
	      var params = {
	        api: 1,
	        title: 0,
	        byline: 0,
	        width: width,
	        height: height,
	        loop: inst.opts.loop,
	        autoplay: inst.opts.autoplay,
	        badge: 0
	      };

	      $.each(params, function (key, val) {
	        src = src + key + '=' + val + '&amp;';
	      });

	      // Remove last ampersand.
	      src = src.slice(0, src.lastIndexOf('&amp;'));

	      $iframe = $('<iframe />', {
	        src: src,
	        frameborder: 0,
	        width: '100%',
	        height: '100%'
	      });

	      tag = document.createElement('script');
	      tag.setAttribute('id', 'froogaloop2');

	      tag.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
	      firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      inst.$base.prepend($iframe);

	      $('#froogaloop2').load(function () {
	        player = $f($iframe[0]);

	        player.addEvent('ready', function () {
	          player.api('setVolume', 0);
	        });
	      });
	    }
	  }, {
	    key: 'setFluidContainer',
	    value: function setFluidContainer() {
	      var inst = this;
	      var $video = inst.$base;
	      var $parent = inst.$parent;
	      var styles = {
	        left: '50%',
	        transform: 'translateX(-50%)'
	      };

	      if (inst.opts.verticalAlign === 'middle') {
	        styles.top = '50%';
	        styles.transform += ' translateY(-50%)';
	      } else if (inst.opts.verticalAlign === 'bottom') {
	        styles.bottom = '0';
	      } else {
	        styles.top = '0';
	      }

	      $video.css(styles);

	      $(window).resize(function () {
	        var elWidth = $parent.outerWidth();
	        var elHeight = $parent.outerHeight();

	        if (inst.opts.backgroundSize === 'cover') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);

	          if ($video.height() <= elHeight) {
	            setHeight($video, elHeight, inst.opts.aspectRatio);
	          }
	        } else if (inst.opts.backgroundSize === 'contain') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);

	          if ($video.height() >= elHeight) {
	            setHeight($video, elHeight, inst.opts.aspectRatio);
	          }
	        } else if (inst.opts.backgroundSize === '100%') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);
	        } else {
	          console.log('Please specify a valid backgroundSize option.');
	        }
	      }).trigger('resize');
	    }
	  }, {
	    key: 'getVideoId',
	    value: function getVideoId() {
	      var index = void 0,
	          id = void 0;
	      var url = this.opts.videoUrl;

	      // Remove trailing slash if one exists.
	      if (url.charAt(url.length - 1) === '/') url.slice(0, -1);

	      // Save the url globally now that we cleaned it up.
	      this.opts.videoUrl = url;

	      if (this.opts.videoType === 'youtube') {
	        index = url.indexOf('v=');
	        if (index > -1) {
	          id = url.slice(index + 2);
	        } else {
	          id = url.slice(url.lastIndexOf('/'));
	        }
	      } else if (this.opts.videoType === 'vimeo') {
	        id = url.slice(url.lastIndexOf('/') + 1);
	      }
	      return id;
	    }
	  }]);

	  return VidKit;
	}();

	exports.default = VidKit;


	function setWidth($el, width, ratio) {
	  $el.width(Math.ceil(width));
	  $el.height(Math.ceil(width / ratio));
	}

	function setHeight($el, height, ratio) {
	  $el.height(Math.ceil(height));
	  $el.width(Math.ceil(height * ratio));
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)('.mobile-menu').click(function (e) {
	  (0, _jquery2.default)(this).toggleClass('open cross');
	  (0, _jquery2.default)('.menu--main').toggleClass('open');
	  (0, _jquery2.default)('.layout-container').toggleClass('fixed');
	});

	(0, _jquery2.default)('#block-useraccountmenu').clone().addClass('cloned').appendTo('#block-themekit-main-menu');

/***/ })
/******/ ]);
//# sourceMappingURL=themekit.js.map