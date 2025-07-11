import {
  require_patterns,
  require_utils
} from "./chunk-OPSXMCP6.js";
import {
  init_memoize_one_esm,
  memoize_one_esm_exports,
  require_react_fast_compare
} from "./chunk-FZ2GTO7S.js";
import {
  require_prop_types
} from "./chunk-RZVJAJWH.js";
import {
  require_cjs
} from "./chunk-VJ56LFBU.js";
import {
  require_react
} from "./chunk-D2KY6O3O.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-V4OQ3NZ2.js";

// node_modules/react-player/lib/players/index.js
var require_players = __commonJS({
  "node_modules/react-player/lib/players/index.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var players_exports = {};
    __export(players_exports, {
      default: () => players_default
    });
    module.exports = __toCommonJS2(players_exports);
    var import_utils = require_utils();
    var import_patterns = require_patterns();
    var players_default = [
      {
        key: "youtube",
        name: "YouTube",
        canPlay: import_patterns.canPlay.youtube,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerYouTube' */
          "./YouTube-CRMUOBJL.js"
        ))
      },
      {
        key: "soundcloud",
        name: "SoundCloud",
        canPlay: import_patterns.canPlay.soundcloud,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerSoundCloud' */
          "./SoundCloud-A4PCWJPR.js"
        ))
      },
      {
        key: "vimeo",
        name: "Vimeo",
        canPlay: import_patterns.canPlay.vimeo,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerVimeo' */
          "./Vimeo-53OQTNLP.js"
        ))
      },
      {
        key: "mux",
        name: "Mux",
        canPlay: import_patterns.canPlay.mux,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerMux' */
          "./Mux-YUGIAEIC.js"
        ))
      },
      {
        key: "facebook",
        name: "Facebook",
        canPlay: import_patterns.canPlay.facebook,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerFacebook' */
          "./Facebook-XMVNF3DN.js"
        ))
      },
      {
        key: "streamable",
        name: "Streamable",
        canPlay: import_patterns.canPlay.streamable,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerStreamable' */
          "./Streamable-NPLNT4XD.js"
        ))
      },
      {
        key: "wistia",
        name: "Wistia",
        canPlay: import_patterns.canPlay.wistia,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerWistia' */
          "./Wistia-QMOJ66IX.js"
        ))
      },
      {
        key: "twitch",
        name: "Twitch",
        canPlay: import_patterns.canPlay.twitch,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerTwitch' */
          "./Twitch-Z2XZM34T.js"
        ))
      },
      {
        key: "dailymotion",
        name: "DailyMotion",
        canPlay: import_patterns.canPlay.dailymotion,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerDailyMotion' */
          "./DailyMotion-TCN23ZWF.js"
        ))
      },
      {
        key: "mixcloud",
        name: "Mixcloud",
        canPlay: import_patterns.canPlay.mixcloud,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerMixcloud' */
          "./Mixcloud-XOT6WJHS.js"
        ))
      },
      {
        key: "vidyard",
        name: "Vidyard",
        canPlay: import_patterns.canPlay.vidyard,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerVidyard' */
          "./Vidyard-QFHEGI3S.js"
        ))
      },
      {
        key: "kaltura",
        name: "Kaltura",
        canPlay: import_patterns.canPlay.kaltura,
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerKaltura' */
          "./Kaltura-PNPN5SAC.js"
        ))
      },
      {
        key: "file",
        name: "FilePlayer",
        canPlay: import_patterns.canPlay.file,
        canEnablePIP: (url) => {
          return import_patterns.canPlay.file(url) && (document.pictureInPictureEnabled || (0, import_utils.supportsWebKitPresentationMode)()) && !import_patterns.AUDIO_EXTENSIONS.test(url);
        },
        lazyPlayer: (0, import_utils.lazy)(() => import(
          /* webpackChunkName: 'reactPlayerFilePlayer' */
          "./FilePlayer-U2UR2635.js"
        ))
      }
    ];
  }
});

// node_modules/react-player/lib/props.js
var require_props = __commonJS({
  "node_modules/react-player/lib/props.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var props_exports = {};
    __export(props_exports, {
      defaultProps: () => defaultProps,
      propTypes: () => propTypes
    });
    module.exports = __toCommonJS2(props_exports);
    var import_prop_types = __toESM(require_prop_types());
    var { string, bool, number, array, oneOfType, shape, object, func, node } = import_prop_types.default;
    var propTypes = {
      url: oneOfType([string, array, object]),
      playing: bool,
      loop: bool,
      controls: bool,
      volume: number,
      muted: bool,
      playbackRate: number,
      width: oneOfType([string, number]),
      height: oneOfType([string, number]),
      style: object,
      progressInterval: number,
      playsinline: bool,
      pip: bool,
      stopOnUnmount: bool,
      light: oneOfType([bool, string, object]),
      playIcon: node,
      previewTabIndex: number,
      previewAriaLabel: string,
      fallback: node,
      oEmbedUrl: string,
      wrapper: oneOfType([
        string,
        func,
        shape({ render: func.isRequired })
      ]),
      config: shape({
        soundcloud: shape({
          options: object
        }),
        youtube: shape({
          playerVars: object,
          embedOptions: object,
          onUnstarted: func
        }),
        facebook: shape({
          appId: string,
          version: string,
          playerId: string,
          attributes: object
        }),
        dailymotion: shape({
          params: object
        }),
        vimeo: shape({
          playerOptions: object,
          title: string
        }),
        mux: shape({
          attributes: object,
          version: string
        }),
        file: shape({
          attributes: object,
          tracks: array,
          forceVideo: bool,
          forceAudio: bool,
          forceHLS: bool,
          forceSafariHLS: bool,
          forceDisableHls: bool,
          forceDASH: bool,
          forceFLV: bool,
          hlsOptions: object,
          hlsVersion: string,
          dashVersion: string,
          flvVersion: string
        }),
        wistia: shape({
          options: object,
          playerId: string,
          customControls: array
        }),
        mixcloud: shape({
          options: object
        }),
        twitch: shape({
          options: object,
          playerId: string
        }),
        vidyard: shape({
          options: object
        })
      }),
      onReady: func,
      onStart: func,
      onPlay: func,
      onPause: func,
      onBuffer: func,
      onBufferEnd: func,
      onEnded: func,
      onError: func,
      onDuration: func,
      onSeek: func,
      onPlaybackRateChange: func,
      onPlaybackQualityChange: func,
      onProgress: func,
      onClickPreview: func,
      onEnablePIP: func,
      onDisablePIP: func
    };
    var noop = () => {
    };
    var defaultProps = {
      playing: false,
      loop: false,
      controls: false,
      volume: null,
      muted: false,
      playbackRate: 1,
      width: "640px",
      height: "360px",
      style: {},
      progressInterval: 1e3,
      playsinline: false,
      pip: false,
      stopOnUnmount: true,
      light: false,
      fallback: null,
      wrapper: "div",
      previewTabIndex: 0,
      previewAriaLabel: "",
      oEmbedUrl: "https://noembed.com/embed?url={url}",
      config: {
        soundcloud: {
          options: {
            visual: true,
            // Undocumented, but makes player fill container and look better
            buying: false,
            liking: false,
            download: false,
            sharing: false,
            show_comments: false,
            show_playcount: false
          }
        },
        youtube: {
          playerVars: {
            playsinline: 1,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1
          },
          embedOptions: {},
          onUnstarted: noop
        },
        facebook: {
          appId: "1309697205772819",
          version: "v3.3",
          playerId: null,
          attributes: {}
        },
        dailymotion: {
          params: {
            api: 1,
            "endscreen-enable": false
          }
        },
        vimeo: {
          playerOptions: {
            autopause: false,
            byline: false,
            portrait: false,
            title: false
          },
          title: null
        },
        mux: {
          attributes: {},
          version: "2"
        },
        file: {
          attributes: {},
          tracks: [],
          forceVideo: false,
          forceAudio: false,
          forceHLS: false,
          forceDASH: false,
          forceFLV: false,
          hlsOptions: {},
          hlsVersion: "1.1.4",
          dashVersion: "3.1.3",
          flvVersion: "1.5.0",
          forceDisableHls: false
        },
        wistia: {
          options: {},
          playerId: null,
          customControls: null
        },
        mixcloud: {
          options: {
            hide_cover: 1
          }
        },
        twitch: {
          options: {},
          playerId: null
        },
        vidyard: {
          options: {}
        }
      },
      onReady: noop,
      onStart: noop,
      onPlay: noop,
      onPause: noop,
      onBuffer: noop,
      onBufferEnd: noop,
      onEnded: noop,
      onError: noop,
      onDuration: noop,
      onSeek: noop,
      onPlaybackRateChange: noop,
      onPlaybackQualityChange: noop,
      onProgress: noop,
      onClickPreview: noop,
      onEnablePIP: noop,
      onDisablePIP: noop
    };
  }
});

// node_modules/react-player/lib/Player.js
var require_Player = __commonJS({
  "node_modules/react-player/lib/Player.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    var Player_exports = {};
    __export(Player_exports, {
      default: () => Player
    });
    module.exports = __toCommonJS2(Player_exports);
    var import_react = __toESM(require_react());
    var import_react_fast_compare = __toESM(require_react_fast_compare());
    var import_props = require_props();
    var import_utils = require_utils();
    var SEEK_ON_PLAY_EXPIRY = 5e3;
    var Player = class extends import_react.Component {
      constructor() {
        super(...arguments);
        __publicField(this, "mounted", false);
        __publicField(this, "isReady", false);
        __publicField(this, "isPlaying", false);
        __publicField(this, "isLoading", true);
        __publicField(this, "loadOnReady", null);
        __publicField(this, "startOnPlay", true);
        __publicField(this, "seekOnPlay", null);
        __publicField(this, "onDurationCalled", false);
        __publicField(this, "handlePlayerMount", (player) => {
          if (this.player) {
            this.progress();
            return;
          }
          this.player = player;
          this.player.load(this.props.url);
          this.progress();
        });
        __publicField(this, "getInternalPlayer", (key) => {
          if (!this.player)
            return null;
          return this.player[key];
        });
        __publicField(this, "progress", () => {
          if (this.props.url && this.player && this.isReady) {
            const playedSeconds = this.getCurrentTime() || 0;
            const loadedSeconds = this.getSecondsLoaded();
            const duration = this.getDuration();
            if (duration) {
              const progress = {
                playedSeconds,
                played: playedSeconds / duration
              };
              if (loadedSeconds !== null) {
                progress.loadedSeconds = loadedSeconds;
                progress.loaded = loadedSeconds / duration;
              }
              if (progress.playedSeconds !== this.prevPlayed || progress.loadedSeconds !== this.prevLoaded) {
                this.props.onProgress(progress);
              }
              this.prevPlayed = progress.playedSeconds;
              this.prevLoaded = progress.loadedSeconds;
            }
          }
          this.progressTimeout = setTimeout(this.progress, this.props.progressFrequency || this.props.progressInterval);
        });
        __publicField(this, "handleReady", () => {
          if (!this.mounted)
            return;
          this.isReady = true;
          this.isLoading = false;
          const { onReady, playing, volume, muted } = this.props;
          onReady();
          if (!muted && volume !== null) {
            this.player.setVolume(volume);
          }
          if (this.loadOnReady) {
            this.player.load(this.loadOnReady, true);
            this.loadOnReady = null;
          } else if (playing) {
            this.player.play();
          }
          this.handleDurationCheck();
        });
        __publicField(this, "handlePlay", () => {
          this.isPlaying = true;
          this.isLoading = false;
          const { onStart, onPlay, playbackRate } = this.props;
          if (this.startOnPlay) {
            if (this.player.setPlaybackRate && playbackRate !== 1) {
              this.player.setPlaybackRate(playbackRate);
            }
            onStart();
            this.startOnPlay = false;
          }
          onPlay();
          if (this.seekOnPlay) {
            this.seekTo(this.seekOnPlay);
            this.seekOnPlay = null;
          }
          this.handleDurationCheck();
        });
        __publicField(this, "handlePause", (e) => {
          this.isPlaying = false;
          if (!this.isLoading) {
            this.props.onPause(e);
          }
        });
        __publicField(this, "handleEnded", () => {
          const { activePlayer, loop, onEnded } = this.props;
          if (activePlayer.loopOnEnded && loop) {
            this.seekTo(0);
          }
          if (!loop) {
            this.isPlaying = false;
            onEnded();
          }
        });
        __publicField(this, "handleError", (...args) => {
          this.isLoading = false;
          this.props.onError(...args);
        });
        __publicField(this, "handleDurationCheck", () => {
          clearTimeout(this.durationCheckTimeout);
          const duration = this.getDuration();
          if (duration) {
            if (!this.onDurationCalled) {
              this.props.onDuration(duration);
              this.onDurationCalled = true;
            }
          } else {
            this.durationCheckTimeout = setTimeout(this.handleDurationCheck, 100);
          }
        });
        __publicField(this, "handleLoaded", () => {
          this.isLoading = false;
        });
      }
      componentDidMount() {
        this.mounted = true;
      }
      componentWillUnmount() {
        clearTimeout(this.progressTimeout);
        clearTimeout(this.durationCheckTimeout);
        if (this.isReady && this.props.stopOnUnmount) {
          this.player.stop();
          if (this.player.disablePIP) {
            this.player.disablePIP();
          }
        }
        this.mounted = false;
      }
      componentDidUpdate(prevProps) {
        if (!this.player) {
          return;
        }
        const { url, playing, volume, muted, playbackRate, pip, loop, activePlayer, disableDeferredLoading } = this.props;
        if (!(0, import_react_fast_compare.default)(prevProps.url, url)) {
          if (this.isLoading && !activePlayer.forceLoad && !disableDeferredLoading && !(0, import_utils.isMediaStream)(url)) {
            console.warn(`ReactPlayer: the attempt to load ${url} is being deferred until the player has loaded`);
            this.loadOnReady = url;
            return;
          }
          this.isLoading = true;
          this.startOnPlay = true;
          this.onDurationCalled = false;
          this.player.load(url, this.isReady);
        }
        if (!prevProps.playing && playing && !this.isPlaying) {
          this.player.play();
        }
        if (prevProps.playing && !playing && this.isPlaying) {
          this.player.pause();
        }
        if (!prevProps.pip && pip && this.player.enablePIP) {
          this.player.enablePIP();
        }
        if (prevProps.pip && !pip && this.player.disablePIP) {
          this.player.disablePIP();
        }
        if (prevProps.volume !== volume && volume !== null) {
          this.player.setVolume(volume);
        }
        if (prevProps.muted !== muted) {
          if (muted) {
            this.player.mute();
          } else {
            this.player.unmute();
            if (volume !== null) {
              setTimeout(() => this.player.setVolume(volume));
            }
          }
        }
        if (prevProps.playbackRate !== playbackRate && this.player.setPlaybackRate) {
          this.player.setPlaybackRate(playbackRate);
        }
        if (prevProps.loop !== loop && this.player.setLoop) {
          this.player.setLoop(loop);
        }
      }
      getDuration() {
        if (!this.isReady)
          return null;
        return this.player.getDuration();
      }
      getCurrentTime() {
        if (!this.isReady)
          return null;
        return this.player.getCurrentTime();
      }
      getSecondsLoaded() {
        if (!this.isReady)
          return null;
        return this.player.getSecondsLoaded();
      }
      seekTo(amount, type, keepPlaying) {
        if (!this.isReady) {
          if (amount !== 0) {
            this.seekOnPlay = amount;
            setTimeout(() => {
              this.seekOnPlay = null;
            }, SEEK_ON_PLAY_EXPIRY);
          }
          return;
        }
        const isFraction = !type ? amount > 0 && amount < 1 : type === "fraction";
        if (isFraction) {
          const duration = this.player.getDuration();
          if (!duration) {
            console.warn("ReactPlayer: could not seek using fraction – duration not yet available");
            return;
          }
          this.player.seekTo(duration * amount, keepPlaying);
          return;
        }
        this.player.seekTo(amount, keepPlaying);
      }
      render() {
        const Player2 = this.props.activePlayer;
        if (!Player2) {
          return null;
        }
        return import_react.default.createElement(
          Player2,
          {
            ...this.props,
            onMount: this.handlePlayerMount,
            onReady: this.handleReady,
            onPlay: this.handlePlay,
            onPause: this.handlePause,
            onEnded: this.handleEnded,
            onLoaded: this.handleLoaded,
            onError: this.handleError
          }
        );
      }
    };
    __publicField(Player, "displayName", "Player");
    __publicField(Player, "propTypes", import_props.propTypes);
    __publicField(Player, "defaultProps", import_props.defaultProps);
  }
});

// node_modules/react-player/lib/ReactPlayer.js
var require_ReactPlayer = __commonJS({
  "node_modules/react-player/lib/ReactPlayer.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    var ReactPlayer_exports = {};
    __export(ReactPlayer_exports, {
      createReactPlayer: () => createReactPlayer
    });
    module.exports = __toCommonJS2(ReactPlayer_exports);
    var import_react = __toESM(require_react());
    var import_deepmerge = __toESM(require_cjs());
    var import_memoize_one = __toESM((init_memoize_one_esm(), __toCommonJS(memoize_one_esm_exports)));
    var import_react_fast_compare = __toESM(require_react_fast_compare());
    var import_props = require_props();
    var import_utils = require_utils();
    var import_Player = __toESM(require_Player());
    var Preview = (0, import_utils.lazy)(() => import(
      /* webpackChunkName: 'reactPlayerPreview' */
      "./Preview-FXDAX3RZ.js"
    ));
    var IS_BROWSER = typeof window !== "undefined" && window.document && typeof document !== "undefined";
    var IS_GLOBAL = typeof global !== "undefined" && global.window && global.window.document;
    var SUPPORTED_PROPS = Object.keys(import_props.propTypes);
    var UniversalSuspense = IS_BROWSER || IS_GLOBAL ? import_react.Suspense : () => null;
    var customPlayers = [];
    var createReactPlayer = (players, fallback) => {
      var _a;
      return _a = class extends import_react.Component {
        constructor() {
          super(...arguments);
          __publicField(this, "state", {
            showPreview: !!this.props.light
          });
          __publicField(this, "references", {
            wrapper: (wrapper) => {
              this.wrapper = wrapper;
            },
            player: (player) => {
              this.player = player;
            }
          });
          __publicField(this, "handleClickPreview", (e) => {
            this.setState({ showPreview: false });
            this.props.onClickPreview(e);
          });
          __publicField(this, "showPreview", () => {
            this.setState({ showPreview: true });
          });
          __publicField(this, "getDuration", () => {
            if (!this.player)
              return null;
            return this.player.getDuration();
          });
          __publicField(this, "getCurrentTime", () => {
            if (!this.player)
              return null;
            return this.player.getCurrentTime();
          });
          __publicField(this, "getSecondsLoaded", () => {
            if (!this.player)
              return null;
            return this.player.getSecondsLoaded();
          });
          __publicField(this, "getInternalPlayer", (key = "player") => {
            if (!this.player)
              return null;
            return this.player.getInternalPlayer(key);
          });
          __publicField(this, "seekTo", (fraction, type, keepPlaying) => {
            if (!this.player)
              return null;
            this.player.seekTo(fraction, type, keepPlaying);
          });
          __publicField(this, "handleReady", () => {
            this.props.onReady(this);
          });
          __publicField(this, "getActivePlayer", (0, import_memoize_one.default)((url) => {
            for (const player of [...customPlayers, ...players]) {
              if (player.canPlay(url)) {
                return player;
              }
            }
            if (fallback) {
              return fallback;
            }
            return null;
          }));
          __publicField(this, "getConfig", (0, import_memoize_one.default)((url, key) => {
            const { config } = this.props;
            return import_deepmerge.default.all([
              import_props.defaultProps.config,
              import_props.defaultProps.config[key] || {},
              config,
              config[key] || {}
            ]);
          }));
          __publicField(this, "getAttributes", (0, import_memoize_one.default)((url) => {
            return (0, import_utils.omit)(this.props, SUPPORTED_PROPS);
          }));
          __publicField(this, "renderActivePlayer", (url) => {
            if (!url)
              return null;
            const player = this.getActivePlayer(url);
            if (!player)
              return null;
            const config = this.getConfig(url, player.key);
            return import_react.default.createElement(
              import_Player.default,
              {
                ...this.props,
                key: player.key,
                ref: this.references.player,
                config,
                activePlayer: player.lazyPlayer || player,
                onReady: this.handleReady
              }
            );
          });
        }
        shouldComponentUpdate(nextProps, nextState) {
          return !(0, import_react_fast_compare.default)(this.props, nextProps) || !(0, import_react_fast_compare.default)(this.state, nextState);
        }
        componentDidUpdate(prevProps) {
          const { light } = this.props;
          if (!prevProps.light && light) {
            this.setState({ showPreview: true });
          }
          if (prevProps.light && !light) {
            this.setState({ showPreview: false });
          }
        }
        renderPreview(url) {
          if (!url)
            return null;
          const { light, playIcon, previewTabIndex, oEmbedUrl, previewAriaLabel } = this.props;
          return import_react.default.createElement(
            Preview,
            {
              url,
              light,
              playIcon,
              previewTabIndex,
              previewAriaLabel,
              oEmbedUrl,
              onClick: this.handleClickPreview
            }
          );
        }
        render() {
          const { url, style, width, height, fallback: fallback2, wrapper: Wrapper } = this.props;
          const { showPreview } = this.state;
          const attributes = this.getAttributes(url);
          const wrapperRef = typeof Wrapper === "string" ? this.references.wrapper : void 0;
          return import_react.default.createElement(Wrapper, { ref: wrapperRef, style: { ...style, width, height }, ...attributes }, import_react.default.createElement(UniversalSuspense, { fallback: fallback2 }, showPreview ? this.renderPreview(url) : this.renderActivePlayer(url)));
        }
      }, __publicField(_a, "displayName", "ReactPlayer"), __publicField(_a, "propTypes", import_props.propTypes), __publicField(_a, "defaultProps", import_props.defaultProps), __publicField(_a, "addCustomPlayer", (player) => {
        customPlayers.push(player);
      }), __publicField(_a, "removeCustomPlayers", () => {
        customPlayers.length = 0;
      }), __publicField(_a, "canPlay", (url) => {
        for (const Player2 of [...customPlayers, ...players]) {
          if (Player2.canPlay(url)) {
            return true;
          }
        }
        return false;
      }), __publicField(_a, "canEnablePIP", (url) => {
        for (const Player2 of [...customPlayers, ...players]) {
          if (Player2.canEnablePIP && Player2.canEnablePIP(url)) {
            return true;
          }
        }
        return false;
      }), _a;
    };
  }
});

// node_modules/react-player/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-player/lib/index.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      default: () => src_default
    });
    module.exports = __toCommonJS2(src_exports);
    var import_players = __toESM(require_players());
    var import_ReactPlayer = require_ReactPlayer();
    var fallback = import_players.default[import_players.default.length - 1];
    var src_default = (0, import_ReactPlayer.createReactPlayer)(import_players.default, fallback);
  }
});
export default require_lib();
//# sourceMappingURL=react-player.js.map
