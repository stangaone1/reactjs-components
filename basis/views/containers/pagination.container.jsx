import React, {Component} from 'react';
import Pagination from 'views/components/pagination';

// Normally have this form the API or a higher order component
const totalItems = 155;
const itemsPerPage = 10;

export default class PaginationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1,
      selectedPageCompressed: 8,
    };
  }

  changePage(newPage) {
    this.setState({selectedPage: newPage});
  }

  changePageCompressed(newPage) {
    this.setState({selectedPageCompressed: newPage});
  }

  render() {
    const containerStyle = {
      width: 800,
      margin: '20px 20px 10px',
      padding: '1px 60px 60px 60px',
      background: 'white',
      boxShadow: '2px 2px 8px -3px gray',
      borderRadius: '10px',
    };

    return (
      <div style={containerStyle}>
        <h3>Pagination (normal) - <code>{'<Pagination>'}</code></h3>
        <br />
        <Pagination
          selectedPage={this.state.selectedPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={this.changePage.bind(this)}
          />
        <br />
        <br />
        <h3>Pagination (compressed) - <code>{'<Pagination compressed>'}</code></h3>
        <br />
        <Pagination
          compress
          selectedPage={this.state.selectedPageCompressed}
          maxPrevPages={3}
          maxMidSidePages={1}
          maxNextPages={3}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={this.changePageCompressed.bind(this)}
          />
      </div>
    );
  }
}
