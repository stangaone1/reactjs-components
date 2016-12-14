import React, {Component} from 'react';
import ProfilePhoto from 'views/components/profile-photo';

export default class ProfilePhotoContainer extends Component {
  render() {
    return (
      <div>
        <ProfilePhoto section="users" imageURI="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?dpr=2&fit=crop&fm=jpg&h=975&ixlib=rb-0.3.5&q=50&w=1925"/>
      </div>
    );
  }
}
