import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import getPasswordStrength from 'password-strength';
import './password-strength.scss';

getPasswordStrength.min = 6;

const scoreNames = {
  simple: 'weak',
  medium: 'average',
  strong: 'strong',
};

export default class PasswordStrength extends Component {
  static propTypes = {
    password: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    password: '',
  };

  render() {
    const { className, password } = this.props;
    const score = scoreNames[getPasswordStrength(password).strength];
    const containerClasses = cx('PasswordStrength', className);
    const barClasses = cx(
      'PasswordStrength-bar',
      score ? 'PasswordStrength-bar--' + score : null,
    );

    return (
      <div className={containerClasses}>
        <div className="PasswordStrength-text">Strength: <span className="PasswordStrength-textScore">{score}</span></div>
        <div className={barClasses}>
          <div className="PasswordStrength-barUnit PasswordStrength-barUnit--1"></div>
          <div className="PasswordStrength-barUnit PasswordStrength-barUnit--2"></div>
          <div className="PasswordStrength-barUnit PasswordStrength-barUnit--3"></div>
        </div>
      </div>
    );
  }
}
