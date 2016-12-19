import React from 'react';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import {mount } from 'enzyme';
import Table from 'views/components/table/table';
const rows = [
  {
    'id': 0,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'King Daugherty',
  },
  {
    'id': 1,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'Sedrick Greenfelder',
  },
  {
    'id': 2,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'Roxanne Stoltenberg',
  },
  {
    'id': 3,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'Wendell Heller',
  },
  {
    'id': 4,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'Mandy Ziemann',
  },
  {
    'id': 5,
    'details': {
      'name': 'aaaa',
      'sex': 'aaaa',
      'ocupation': 'aaaa',
    },
    'name': 'Mrs. Ollie Stanton',
  },
];

const columns = [
  {
    selectable: true,
    width: 50,
    row: 'selectable',
    fixed: false,
    visible: true,
  },
  {
    name: 'Name',
    row: 'name',
    visible: true,
    sortable: true,
  },
  {
    name: 'Id',
    row: 'id',
    visible: true,
    sortable: true,
  },
];

let wrapper;

describe('Table Component', () => {
  it('should not render component if no rows provided', () => {
    const component = utils.shallowlyRenderedOutput(<Table />);
    expect(component).to.not.be.ok;
  });

  it('should render rows and columns', () => {
    const component = utils.shallowlyRenderedOutput(<Table columns={columns} rows={rows}/>);
    expect(component).to.be.ok;
    expect(component.props.className).to.equal('Table Table--borderedTop');
    const nrTableRows = component.props.children[1].length;
    const nrTableColumns = component.props.children[0].props.children.length;
    expect(nrTableColumns).to.equal(columns.length);
    expect(nrTableRows).to.equal(rows.length);
  });

  it('should not render columns that are not visible', () => {
    columns.push({
      name: 'Name',
      row: 'name',
      visible: false,
      sortable: true,
    });

    wrapper = mount(<Table columns={columns.filter(colData => colData.visible)} rows={rows}/>);
    expect(wrapper.find('.TableRow').first().children()).to.have.length(columns.length - 1);
  });

  it('should have sortable header buttons', () => {
    wrapper = mount(<Table columns={columns} rows={rows}/>);
    expect(wrapper.find('.Table-headSorter')).to.have.length(columns.filter(colData => colData.sortable).length);
  });

  it('should render normal table if no fixed columns', () => {
    wrapper = mount(<Table columns={columns} rows={rows}/>);
    wrapper.setState({dynamicTable: true});
    expect(wrapper.find('.Table--fixedLeft')).to.have.length(0);
    expect(wrapper.find('.Table--fixedRight')).to.have.length(0);
  });


  it('should render one fixed table to the left', () => {
    columns[0].fixed = true;
    wrapper = mount(<Table maxWidth={1200} columns={columns} rows={rows}/>);
    wrapper.setState({dynamicTable: true});
    expect(wrapper.find('.Table--fixedLeft')).to.have.length(1);
    expect(wrapper.find('.Table--fixedRight')).to.have.length(0);
  });

  it('should render one fixed table to the left and one to the right', () => {
    columns[0].fixed = true;
    columns[columns.length - 1].fixed = true;
    wrapper = mount(<Table maxWidth={1200} columns={columns} rows={rows}/>);
    wrapper.setState({dynamicTable: true});
    expect(wrapper.find('.Table--fixedLeft')).to.have.length(1);
    expect(wrapper.find('.Table--fixedRight')).to.have.length(1);
  });

  afterEach(()=> {
    wrapper = null;
  });
});
