class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerBtn: '[data-js-header-burger-btn]',
  };

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement.querySelector(
      this.selectors.overlay
    );
    this.burgerBtnEleent = this.rootElement.querySelector(
      this.selectors.burgerBtn
    );
    this.bindEvents();
  }

  // methods
  bindEvents() {
    this.burgerBtnEleent.addEventListener('click', this.onBurgerBtnClick);
  }

  onBurgerBtnClick = () => {
    this.burgerBtnEleent.classList.toggle(this.stateClasses.isActive);
    this.overlayElement.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };
}

export default Header;
