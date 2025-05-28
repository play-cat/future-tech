const rootSelector = '[data-js-video-player]';

class VideoPlayer {
  selectors = {
    root: rootSelector,
    video: '[data-js-video-player-video]',
    panel: '[data-js-video-player-controls]',
    playBtn: '[data-js-video-player-play-btn]',
  };

  stateClasses = {
    isActive: 'is-active',
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.videoElement = this.rootElement.querySelector(this.selectors.video);
    this.panelElement = this.rootElement.querySelector(this.selectors.panel);
    this.playBtnElement = this.rootElement.querySelector(
      this.selectors.playBtn
    );
    this.bindEvents();
  }

  onPlayBtnClick = () => {
    this.videoElement.play();
    this.videoElement.controls = true;
    this.panelElement.classList.remove(this.stateClasses.isActive);
  };

  onVideoPause = () => {
    this.videoElement.controls = false;
    this.panelElement.classList.add(this.stateClasses.isActive);
  };

  bindEvents() {
    this.playBtnElement.addEventListener('click', this.onPlayBtnClick);
    this.videoElement.addEventListener('pause', this.onVideoPause);
  }
}

class VideoPlayerCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach(element => {
      new VideoPlayer(element);
    });
  }
}

export default VideoPlayerCollection;
