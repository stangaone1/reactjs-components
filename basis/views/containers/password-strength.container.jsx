import React, {Component} from 'react';
import PasswordStrength from 'views/components/password-strength';

export default class PasswordStrengthContainer extends Component {
  render() {
    const containerStyle = {
      width: 400,
      padding: '20px',
      background: 'white',
      boxShadow: '2px 2px 8px -3px gray',
      borderRadius: '10px',
    };

    return (
      <div style={containerStyle}>
        <PasswordStrength password="fdf" />
        <PasswordStrength password="qewer##@3123123" />
        <PasswordStrength password="123456" />
      </div>
    );
  }
}
