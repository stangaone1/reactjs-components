import React, {Component, PropTypes} from 'react';
import {find} from 'lodash';

// components
import InputField from 'views/components/inputfield';
import {SelectLabel} from 'views/components/select';
import {UploadBox} from 'views/components/upload-box';

const ElementMapper = {
  'dropdown': {
    component: SelectLabel,
    displayName: 'SelectLabel',
    propsMap: {
      'options': 'options',
      'value': 'value',
      'label': 'label',
    },
    callbacksMap: {
      'onChange': 'onChange',
    },
    value: {
      key: 0,
    },
  },
  'input_text': {
    component: InputField,
    displayName: 'InputField',
    propsMap: {
      'label': 'label',
      'value': 'value',
    },
    callbacksMap: {
      'onChange': 'onChange',
    },
    value: {
      key: 0,
    },
  },
  'input_file': {
    component: UploadBox,
    displayName: 'UploadBox',
    propsMap: {
      'label': 'label',
      'value': 'value',
    },
    callbacksMap: {
      'onChange': 'onFileAdd',
    },
    value: {
      key: {value: 'file', file: 'binaryFile'},
    },
  },
};

/*
'',
'dropdown',
'checkbox',
'radio'
*/

class FormElement extends Component {

  getElementProps(elementDisplayName, props, callbacks) {
    const mappedElement = find(ElementMapper, {'displayName': elementDisplayName});
    const finalProps = {};

    if (!mappedElement) {
      return null;
    }

    // register defined props from api and apply them to our map
    Object.keys(props).forEach((keys) => {
      if (mappedElement.propsMap.hasOwnProperty(keys)) {
        finalProps[mappedElement.propsMap[keys]] = props[keys];
      } else {
        finalProps[keys] = props[keys];
      }
    });

    // register defined callbacks from api and apply them to our map
    Object.keys(callbacks).forEach((keys) => {
      if (mappedElement.callbacksMap.hasOwnProperty(keys)) {
        finalProps[mappedElement.callbacksMap[keys]] = callbacks[keys];
      } else {
        finalProps[keys] = callbacks[keys];
      }
    });

    return finalProps;
  }

  getElement(element, props, callbacks) {
    let renderElement = null;

    if (typeof element === 'string' && ElementMapper.hasOwnProperty(element)) {
      renderElement = React.createElement(
                        ElementMapper[element].component,
                        this.getElementProps(
                          ElementMapper[element].displayName,
                          props,
                          callbacks)
                      );
    }

    return (renderElement);
  }

  render() {
    const {element, props, callbacks} = this.props;
    return (this.getElement(element, props, callbacks));
  }
}

FormElement.displayName = 'FormElement';

FormElement.propTypes = {
  element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(InputField),
    PropTypes.instanceOf(UploadBox),
  ]).isRequired,
  props: PropTypes.object.isRequired,
  callbacks: PropTypes.object,
};

FormElement.defaultProps = {
  callbacks: {},
};

export default FormElement;

export function getValueForElement(type, ...args) {
  if (ElementMapper.hasOwnProperty(type)) {
    let key;

    switch (typeof ElementMapper[type].value.key) {
    case 'number':
      key = ElementMapper[type].value.key;
      return {value: args[key]} || null;

    case 'object':
      const returnedObject = {};
      key = ElementMapper[type].value.key;
      Object.keys(key).forEach(item => {
        returnedObject[item] = args[0][key[item]];
      });
      return returnedObject;

    default:
      return args;
    }
  }
  return null;
}
