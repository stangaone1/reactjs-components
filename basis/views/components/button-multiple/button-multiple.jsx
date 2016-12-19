import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './button-multiple.scss';

export default class ButtonMultiple extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOnToggle = this.onToggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickOutside() {
    this.setState({
      open: false,
    });
  }

  onToggle() {
    this.setState({open: !this.state.open});
  }

  renderDropdown(ButtonList) {
    if (ButtonList.length) {
      return (
        <div className="ButtonMultiple-container">
         <div className="ButtonMultiple-arrowContainer" onClick={this.handleOnToggle} >
           <div className="ButtonMultiple-arrow" >
             <span className="ButtonMultiple-arrowButton">&nbsp;</span>
           </div>
         </div>
          <ul className="ButtonMultiple-dropdown">
            {ButtonList.map((but, index)=> {
              return (
                <li key={but.key || index}>{but}</li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  render() {
    const {className, children, ...props} = this.props;
    const ButtonList = React.Children.toArray(children);

    const mainBut = ButtonList.shift();
    const componentClasses = cx('ButtonMultiple', {
      'ButtonMultiple--open': this.state.open,
      'ButtonMultiple--twoButtons': ButtonList.length === 1,
      'ButtonMultiple--multipleButtons': ButtonList.length > 0,
    }, className);

    return (
      <div className={componentClasses} {...props}>
        <div className="ButtonMultiple-main">{mainBut}</div>
        {this.renderDropdown(ButtonList)}
      </div>
    );
  }
}

