class BaseComponent {
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error(
        'Unable to create an instance of the abstract class BaseComponent. Use extends BaseComponent'
      );
    }
  }
  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, newValue) => {
        let oldValue = target[prop];

        target[prop] = newValue;

        if (newValue !== oldValue) {
          this.updateUI();
        }

        return true;
      },
    });
  }
  // updates the UI in response to state updates
  updateUI() {
    throw new Error('Need to implement the method updateUI()');
  }
}

export default BaseComponent;
