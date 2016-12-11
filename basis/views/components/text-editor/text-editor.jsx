import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import ReactQuill from 'react-quill';

import 'quill/dist/quill.snow.css';
import './text-editor.scss';

export default class TextEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultItems: PropTypes.array,
    editorFormats: PropTypes.array,
    error: PropTypes.string,
    touched: PropTypes.bool,
  };

  static defaultProps = {
    editorFormats: [
      'bold',
      'italic',
      'align',
    ],
    defaultItems: [
      {
        label: 'Text', type: 'group', items: [
          {type: 'bold', label: 'Bold'},
          {type: 'separator'},
          {type: 'italic', label: 'Italic'},
        ],
      },
      {
        label: 'Blocks', type: 'group', items: [
          {
            type: 'separator',
          },
          {
            label: 'Alignment', type: 'align', items: [
              {label: '', value: 'left'},
              {type: 'separator'},
              {label: '', value: 'center'},
              {type: 'separator'},
              {label: '', value: 'right'},
            ],
          },
        ],
      },
    ],
  };

  constructor() {
    super();
    this.onTextChange = this.onTextChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onTextChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (this.props.onBlur) {
      this.props.onBlur(value);
    }
  }

  render() {
    const {className, children, value, editorFormats, defaultItems, error, touched, ...props} = this.props;
    const componentClasses = cx('TextEditor', {
      'TextEditor--error': error && touched,
    }, className);

    if (value === undefined) {
      return (<div />);
    }
    return (
      <div className={componentClasses}>
        <ReactQuill
          {...props}
          formats={editorFormats}
          theme="snow"
          toolbar={defaultItems}
          value={value}
          onChange={this.onTextChange}
        />
        {error && touched && <p className="TextEditor-Error">{error}</p>}
        {children}
      </div>
    );
  }
}
