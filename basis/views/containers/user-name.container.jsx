import React, {Component} from 'react';
import UserName from 'views/components/user-name';

export default class UserNameContainer extends Component {
  render() {
    const user = {id: 1, name: 'Ford Nitzsche'};
    return (
      <div>
        <UserName user={user}/>
      </div>
    );
  }
}
