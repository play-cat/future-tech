import BaseComponent from './BaseComponent';

const rootSelector = '[data-js-tabs]';

class Tabs extends BaseComponent {
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  };

  stateClasses = {
    isActive: 'is-active',
  };

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  };

  constructor(rootElement) {
    super();
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(
      this.selectors.button
    );
    this.contentElements = this.rootElement.querySelectorAll(
      this.selectors.content
    );
    this.state = this.getProxyState({
      activeTabindex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    });
    this.limitTabsIndex = this.buttonElements.length - 1;
    this.bindEvents();
  }

  updateUI() {
    const { activeTabindex } = this.state;

    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabindex;
      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(
        this.stateAttributes.ariaSelected,
        isActive.toString()
      );
      buttonElement.setAttribute(
        this.stateAttributes.tabIndex,
        isActive ? '0' : '-1'
      );
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeTabindex;
      contentElement.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  activateTabFromKeyboard(newActiveTabIndex) {
    this.state.activeTabindex = newActiveTabIndex;
    this.buttonElements[newActiveTabIndex].focus();
  }

  previousTab = () => {
    const newActiveTabIndex =
      this.state.activeTabindex === 0
        ? this.limitTabsIndex
        : this.state.activeTabindex - 1;

    this.activateTabFromKeyboard(newActiveTabIndex);
  };

  nextTab = () => {
    const newActiveTabIndex =
      this.state.activeTabindex === this.limitTabsIndex
        ? 0
        : this.state.activeTabindex + 1;

    this.activateTabFromKeyboard(newActiveTabIndex);
  };

  firstTab = () => this.activateTabFromKeyboard(0);

  lastTab = () => this.activateTabFromKeyboard(this.limitTabsIndex);

  onButtonClick(buttonIndex) {
    this.state.activeTabindex = buttonIndex;
  }

  onKeyDown = event => {
    const { code, metaKey } = event;
    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code];

    const isMacHomeKey = metaKey && code === 'ArrowLeft';
    if (isMacHomeKey) {
      this.firstTab();

      return;
    }

    const isMacEndKey = metaKey && code === 'ArrowRight';
    if (isMacEndKey) {
      this.lastTab();

      return;
    }
    action?.(); // optional chaining with function calls
    // if (action) {
    //   action();
    //    this.updateUI();
    // }
  };

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index));
    });
    this.rootElement.addEventListener('keydown', this.onKeyDown);
  }
}

// if page has more than one tabs container
// we collect them in TabsCollection
class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach(element => {
      new Tabs(element);
    });
  }
}

export default TabsCollection;
