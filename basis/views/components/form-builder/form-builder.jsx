import React from 'react';
import FormElement from './form-element';

class FormBuilder {
  constructor() {
    this.elements = [];
    this.globalCallbacks = {};
  }

  createTopLevelCallback(callbacks) {
    const attachedMethods = {};

    const globalCallbacks = this.globalCallbacks;

    if (!Object.keys(globalCallbacks).length) {
      return callbacks;
    }

    // here we check to see if the element has the defined callbacks
    // for example if the input field has onChange. If it does then
    // we create an attached method that will execute both local
    // callbacks and the global ones. Thea attached method only executes
    // the glocal and local callbacks, binding is also done to pass down
    // any extra arguments

    Object.keys(globalCallbacks).forEach((key) => {
      if (callbacks && callbacks.hasOwnProperty(key)) {
        attachedMethods[key] = (...args) => {
          callbacks[key].bind(this, ...args)();
          globalCallbacks[key].bind(this, ...args)();
        };
      } else {
        attachedMethods[key] = globalCallbacks[key];
      }
    });

    return attachedMethods;
  }

  generateForm() {
    return this.elements.map((item, key) => {
      item.callbacks = this.createTopLevelCallback(item.callbacks);
      return (<FormElement key={'formElement_' + key} {...item} />);
    });
  }

  add(element, props, callbacks) {
    this.elements.push({element: element, props: props, callbacks: callbacks});
  }

  render() {
    return (this.generateForm());
  }
}

export default FormBuilder;
