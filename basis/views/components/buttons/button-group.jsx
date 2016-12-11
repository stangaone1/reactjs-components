import React, {PropTypes, Component, Children, cloneElement} from 'react';
import cx from 'classnames';
import {findDOMNode} from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import {max, map} from 'lodash';

import './button-group.scss';

export default class ButtonGroup extends Component {

  static displayName = 'ButtonGroup';
  static propTypes = {
    buttonsType: PropTypes.oneOf(['dropdown']),
    buttonsSize: PropTypes.oneOf(['small']),
    block: PropTypes.bool,
    centered: PropTypes.bool,
    disabled: PropTypes.bool,
    selectedIndex: PropTypes.number,
    onIndexChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: React.PropTypes.string,
  };
  static defaultProps = {
    selectedIndex: -1,
    onIndexChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: null, // used foe equlizing button widths
    };
  }

  // assure that all children have equal widths
  componentDidMount() {
    this.updateMaxWidth();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  updateMaxWidth() {
    const node = findDOMNode(this);
    const children = node.childNodes;
    if (!this.props.block) {
      // if not block, get width of longest, and make rest same width
      const maxButtonWidth = max(map(children, button => button.offsetWidth));
      this.setState({buttonWidth: maxButtonWidth});
    } else {
      // if block, take total width, divide it by no. of children and get width of each child
      const totalWidth = node.offsetWidth;
      this.setState({buttonWidth: Math.floor(totalWidth / children.length)});
    }
  }

  // validate selected index: check if number and if between children array bounds => set selectedIndex on state
  validateSelectedIndex(selectedIndex) {
    return (isNaN(selectedIndex) ||
    selectedIndex < 0 ||
    selectedIndex >= this.props.children.length)
      ? -1
      : selectedIndex;
  }

  render() {
    const {
      buttonsType,
      buttonsSize,
      block,
      centered,
      disabled,
      className,
      selectedIndex,
      onIndexChange,
      ...otherProps,
    } = {...this.props};

    const buttonGroupClasses = cx(
      className,
      'ButtonGroup',
      {'ButtonGroup--centered': centered},
      {'ButtonGroup--block': block}); // for full row width button groups

    const theSelectedIndex = (!disabled) ? this.validateSelectedIndex(selectedIndex) : -1;

    return (
      <div
        className={buttonGroupClasses}
        {...otherProps}
      >
        {Children.map(this.props.children, (button, index) => {
          const selected = theSelectedIndex === index;
          const {style, className, children, ...props} = button.props;
          let maxWidth = style && style.maxWidth;
          if (!block && block !== undefined && children && children.length) {
            maxWidth = (100 / children.length) + '%';
          }
          let newStyle = Object.assign({}, style, {
            width: this.state.buttonWidth,
          });

          if (maxWidth) {
            newStyle = Object.assign({}, newStyle, {maxWidth: maxWidth});
          }
          return cloneElement(button, {
            ...props,
            style: newStyle,
            className: cx(
              'ButtonGroup-item',
              {'ButtonGroup-item--selected': selected},
              className),
            key: index,
            size: buttonsSize,  // equalize button size (in case of inconsistent button types)
            type: buttonsType,  // equalize button type
            selected: (buttonsType !== 'dropdown') ? theSelectedIndex === index : null, // make selection
            opened: (buttonsType === 'dropdown') ? theSelectedIndex === index : null, // open
            disabled: disabled || button.props.disabled, // all disabled or the current one
            block: null, // no block buttons
            centered: null, // no centered buttons
            onClick: !disabled ? onIndexChange.bind(this, index) : () => {
            }, // do nothing if disabled or no indexchanged is provided
          });
        })}
      </div>);
  }
}
