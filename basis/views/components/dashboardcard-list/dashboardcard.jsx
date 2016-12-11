// deps
import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import { Button } from 'views/components/buttons';

// style
import './dashboardcard.scss';

export default class DashboardCard extends Component {
  static propTypes = {
    cardText: PropTypes.string,
    disabled: PropTypes.bool,
    backgroundImageSrc: PropTypes.string,
    onBackgroundClick: PropTypes.func,
    onOptionClick: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'edit',
    cardText: 'This is where the card text goes',
    disabled: false,
    onOptionClick: () => {},
  };

  constructor(props) {
    super(props);
    /* option button visibility only applies to this component, is toggled on
       mouse over/out. It should not be set by a parent component.
       It will be kept in component state. Only for edit type.*/
    this.state = {
      optionButtonsHidden: true,
    };
  }

  getCardDetails() {
    const { backgroundImageSrc, onOptionClick } = this.props;

    const buttons = (
      <div className="DashboardCard-controls">
        <Button onClick={onOptionClick.bind(this, 0)}>Change</Button>
        <Button onClick={onOptionClick.bind(this, 1)}>Edit</Button>
        <Button onClick={onOptionClick.bind(this, 2)}>Delete</Button>
      </div>
    );

    const background = <img src={backgroundImageSrc} alt="card"/>;

    const hoverActions = {
      onMouseOver: () => this.setState({ optionButtonsHidden: false }),
      onMouseOut: () => this.setState({ optionButtonsHidden: true }),
    };

    return {
      buttons: buttons,
      background: background,
      hoverActions: hoverActions,
    };
  }

  render() {
    const { cardText, backgroundImageSrc, onOptionClick, className, disabled, onBackgroundClick, ...otherProps } = this.props;
    const { buttons, background, hoverActions } = this.getCardDetails();

    const dashboardClass = cx(
      'DashboardCard',
      className,
    );

    const bgLink = onBackgroundClick ?
      (
        <a
          className="DashboardCard-hitArea"
          onClick={onBackgroundClick.bind(this, 3)}
        />
      )
      :
      null;

    const dashboardOptionsClass = cx(
      'DashboardCard-options',
      {'DashboardCard-options--hidden': this.state.optionButtonsHidden}
    );

    return (
      <div className={dashboardClass} {...otherProps} {...hoverActions}>
        {background}
        <div className={dashboardOptionsClass}>
          {bgLink}
          {buttons}
        </div>
      </div>
    );
  }
}
