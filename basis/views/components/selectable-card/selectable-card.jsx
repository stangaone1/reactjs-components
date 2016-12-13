import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './selectable-card.scss';

export default class SelectableCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    card: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    card: '',
    selected: false,
    disabled: false,
  };

  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onSelect() {
    const {onSelect, selected} = this.props;
    if (onSelect) {
      onSelect(!selected);
    }
  }

  render() {
    const {className, card, selected, disabled, children, ...props} = this.props;
    const componentClasses = cx('SelectableCard', {
      'SelectableCard--selected': selected && !disabled,
      'SelectableCard--disabled': disabled,
    }, className);

    return (
      <div className={componentClasses} {...props}>
        <img className="SelectableCard-image"
             src={card}
             onClick={this.onSelect} />
        {children}
      </div>
    );
  }
}

