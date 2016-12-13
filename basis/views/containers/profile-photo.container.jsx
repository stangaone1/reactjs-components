import React, {Component} from 'react';
import ProfilePhoto from 'views/components/profile-photo';

export default class ProfilePhotoContainer extends Component {
  render() {
    return (
      <div>
        <ProfilePhoto section="users" />
      </div>
    );
  }
}
