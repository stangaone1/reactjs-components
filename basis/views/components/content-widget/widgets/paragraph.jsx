import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import WidgetHeader from '../widget-header.jsx';
import WidgetContent from '../widget-content.jsx';
import TextEditor from 'views/components/text-editor';

import '../content-widget.scss';


export default class Paragraph extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    editorFormats: PropTypes.array,
    textEditorConfig: PropTypes.array,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    toolbar: PropTypes.array,
  };

  static defaultProps = {
    value: '',
    editorFormats: [
      // 'bold',
      // 'italic',
      // 'underline',
      'link',
      'bullet',
      'list',
    ],
    textEditorConfig: [
      // {type: 'bold', label: 'Bold'},
      // {type: 'separator'},
      // {type: 'italic', label: 'Italic'},
      // {type: 'separator'},
      // {type: 'underline', label: 'Underline'},
      // {type: 'separator'},
      {type: 'link', label: 'Link'},
      {type: 'separator'},
      {type: 'bullet', label: 'Bullet'},
      {type: 'separator'},
      {type: 'list', label: 'List'},
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
    this.handleTextChange = this.onTextChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onTextChange(value) {
    this.setState({
      text: value,
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      className,
      children,
      onChange,
      onRemove,
      defaultValue,
      editorFormats,
      textEditorConfig,
      value,
      ...props,
    } = this.props;
    const componentClasses = cx('PublishingPlatformWidget-paragraph', className);

    return (
      <div {...props} className={componentClasses}>
        <WidgetHeader onRemove={onRemove}>
          <label>
            Paragraph
          </label>
        </WidgetHeader>
        <WidgetContent>
          <TextEditor
            editorFormats={editorFormats}
            defaultItems={textEditorConfig}
            value={value ? value : defaultValue}
            onChange={this.handleTextChange}
          />
        </WidgetContent>
      </div>
    );
  }
}
