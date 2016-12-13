import React, {Component} from 'react';
import EditedBy from 'views/components/edited-by';
const users = [
  {
    time: 1452269984996,
    user: {
      id: 0,
      name: 'Shaylee Bailey',
    },
  },
  {
    time: 1452701984996,
    user: {
      id: 1,
      name: 'Alexandre Conn',
    },
  },
  {
    time: 1452010784996,
    user: {
      id: 2,
      name: 'Myrl Hermann',
    },
  },
  {
    time: 1452442784996,
    user: {
      id: 3,
      name: 'Murphy Abbott',
    },
  },
  {
    time: 1452269984996,
    user: {
      id: 4,
      name: 'Flossie West',
    },
  },
];

export default class EditedByContainer extends Component {
  render() {
    return (
      <div>
        <h2>No users</h2>
        <EditedBy display="all" editedBy={[]}/>
        <h2>only one user given</h2>
        <EditedBy display="all" editedBy={[users[0]]}/>
        <h2> display all</h2>
        <EditedBy display="all" editedBy={users}/>
        <h2>display one</h2>
        <EditedBy display="one" editedBy={users}/>
      </div>
    );
  }
}
