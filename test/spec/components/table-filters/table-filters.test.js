import React from 'react';
import TableFilters from 'views/components/table-filters';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';
import defaultColumns from './table-columns';

describe('TableFilters', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);
      expect(component.find('.TableFilters').is('div')).to.be.true;
    });

    it('should render with class TableFilters', () => {
      const component = shallow(<TableFilters columns={defaultColumns}/>);
      expect(component.hasClass('TableFilters')).to.be.true;
    });

    it('should render give class CustomTableFilters', () => {
      const component = shallow(<TableFilters columns={defaultColumns} className="CustomTableFilters"/>);
      expect(component.hasClass('CustomTableFilters')).to.be.true;
    });

    it('should not render sort dropdown if no sortable columns given', () => {
      const component = mount(
        <TableFilters columns={[{name: 'name', row: 'name'}]}/>
      );
      expect(component.find('.TableFilters-sort')).to.have.length(0);
    });

    it('should not render filter dropdown if no filter was given', () => {
      const component = mount(
        <TableFilters columns={defaultColumns}/>
      );
      expect(component.find('.TableFilters-filter')).to.have.length(0);
    });

    it('should render 3 dropdowns when it has columns, sortable columns and filters', () => {
      const component = mount(
        <TableFilters columns={defaultColumns}>
          filters here
        </TableFilters>
      );
      expect(component.find('.Dropdown')).to.have.length(3);
    });

    it('should render columns with alwaysVisible=true as disabled', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);

      component.setState({open: 'columns'});

      expect(component.find('.Checkbox--disabled')).to.have.length(3);
    });

    it('should render columns with sortable=true in sort dropdown', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);
      const sortableCount = defaultColumns.filter(col => col.sortable).length;
      component.setState({open: 'sort'});

      expect(component.find('.TableFilters-list').find('.Radio')).to.have.length(sortableCount);
    });

    it('should render sort ASC and DESC radio inputs', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);
      component.setState({open: 'sort'});

      expect(component.find('.TableFilters-list').at(1).find('.Radio')).to.have.length(2);
    });

    it('should render given children in filter section', () => {
      const component = mount(
        <TableFilters columns={defaultColumns}>
          <div className="CustomFilters"></div>
        </TableFilters>
      );

      component.setState({open: 'filter'});

      expect(component.find('.CustomFilters')).to.have.length(1);
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<TableFilters columns={defaultColumns} onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });

    it('should open column filter when view dropdown is clicked', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);

      component.find('.TableFilters-view').find('.Dropdown-button').simulate('click');

      expect(component.state('open')).to.equal('columns');
      expect(component.find('.TableFilters-view').find('.Dropdown-body')).to.have.length(1);
    });

    it('should open column sort when sort dropdown is clicked', () => {
      const component = mount(<TableFilters columns={defaultColumns}/>);

      component.find('.TableFilters-sort').find('.Dropdown-button').simulate('click');
      console.log('component.statecomponent.state', component.state)
      expect(component.state('open')).to.equal('sort');
      expect(component.find('.TableFilters-sort').find('.Dropdown-body')).to.have.length(1);
    });

    it('should open column filter when filter dropdown is clicked', () => {
      const component = mount(
        <TableFilters columns={defaultColumns}>
          filters here
        </TableFilters>
      );

      component.find('.TableFilters-filter').find('.Dropdown-button').simulate('click');

      expect(component.state('open')).to.equal('filter');
      expect(component.find('.TableFilters-filter').find('.Dropdown-body')).to.have.length(1);
    });

    it('should trigger onColumnChange when changing visible columns', () => {
      const handleColumnChange = spy();
      const component = mount(<TableFilters onViewChange={handleColumnChange} columns={defaultColumns}/>);

      component.setState({open: 'columns'});
      component.find('.Checkbox-input').at(4).simulate('change');

      expect(handleColumnChange.called).to.be.true;
    });

    it('should trigger onSortChange when changing sorted key ', () => {
      const onSortChange = spy();
      const component = mount(<TableFilters onSortChange={onSortChange} columns={defaultColumns}/>);

      component.setState({open: 'sort'});
      component.find('.TableFilters-list').at(0).find('.Radio-input').at(1).simulate('change');

      expect(onSortChange.called).to.be.true;
    });

    it('should trigger onSortChange when changing sorted value ', () => {
      const onSortChange = spy();
      const component = mount(<TableFilters onSortChange={onSortChange} columns={defaultColumns}/>);

      component.setState({open: 'sort'});
      component.find('.TableFilters-list').at(1).find('.Radio-input').at(1).simulate('change');

      expect(onSortChange.called).to.be.true;
    });
  });
});
