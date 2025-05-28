import IMask from 'imask';

const rootSelector = '[data-js-input-mask]';

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement;

    this.init();
  }

  init() {
    const isIMaskReady = typeof IMask !== 'undefined';

    if (isIMaskReady) {
      IMask(this.rootElement, {
        mask: this.rootElement.dataset.jsInputMask,
      });
    } else {
      console.error('IMask library not connected');
    }
  }
}

class InputMaskCollection {
  constructor() {
    this.init();
  }

  init() {
    document
      .querySelectorAll(rootSelector)
      .forEach(element => new InputMask(element));
  }
}

export default InputMaskCollection;
