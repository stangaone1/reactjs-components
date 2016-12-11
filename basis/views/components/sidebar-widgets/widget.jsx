import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import Icon from 'views/components/icon/icon';
import WidgetConfig from './widget-config-builder';
import {debounce, isArray, find, isObject} from 'lodash';

const widgetSize = (widgetFields) => {
  return widgetFields
    .filter(field => field.name === 'widgetSize')
    .map(field => field.value)
    .shift();
};

import './widget.scss';

export default class extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    children: PropTypes.node,
    previews: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    label: '',
    fields: [],
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.toggleConfig = this.onToggleConfig.bind(this);
    this.handleConfigChange = this.onConfigChange.bind(this);
    this.handleConfigSave = this.onSaveConfig.bind(this);
    this.handleOnFocus = this.onFocus.bind(this);
    this.handleOnBlur = debounce(this.onBlur.bind(this), 200);
    this.state = {
      configuring: false,
      focused: false,
      fields: null,
    };
  }

  componentWillMount() {
    this.setState({fields: this.props.fields});
  }

  onFocus() {
    this.handleOnBlur.cancel();
    this.setState({
      focused: true,
    });
  }

  onBlur() {
    this.setState({
      focused: false,
    });
  }

  onToggleConfig(evt) {
    evt.preventDefault();
    this.setState({configuring: !this.state.configuring});
  }

  onConfigChange(fields) {
    this.setState({fields});
    this.props.onChange(fields);
  }

  onSaveConfig() {
    this.props.onChange(this.state.fields);
  }

  renderPreview() {
    const {previews} = this.props;

    if (isArray(previews)) {
      const size = widgetSize(this.state.fields);
      if (size) {
        const preview = find(previews, (preview) => preview.size === size);
        if (preview && preview.url) {
          return ( <img className="WidgetPreview-image" src={preview.url}/> );
        }
      }
    } else if (isObject(previews) && previews.url) {
      return ( <img className="WidgetPreview-image" src={previews.url}/> );
    }
  }

  render() {
    const wrapperClasses = cx('PublishingPlatformWidget', this.props.className, {
      'PublishingPlatformWidget--configure': this.state.configuring,
      'PublishingPlatformWidget--focused': this.state.focused,
    });
    const configClasses = cx('WidgetConfig', {
      'WidgetConfig--opened': this.state.configuring,
    });

    return (
      <div className={wrapperClasses}
           tabIndex="0"
           onFocus={this.handleOnFocus}
           onBlur={this.handleOnBlur}
      >
        <div className="WidgetHeader">
          <a onClick={this.toggleConfig} className="ConfigureWidget" href="#">
            <Icon name="widget-cog"/>
          </a>
          <span className="WidgetLabel">{this.props.label}</span>
          <a className="RemoveWidget" onClick={this.props.onRemove}>
            <Icon name="close"/>
          </a>
        </div>

        <div className={configClasses}>
          <div className="ConfigForm">
            <WidgetConfig
              fields={this.props.fields}
              onChange={this.handleConfigChange}
            />
          </div>
        </div>

        <div className="WidgetPreview">
          {this.renderPreview()}
        </div>
      </div>
    );
  }
}
