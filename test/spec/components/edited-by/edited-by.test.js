import React from 'react';
import EditedBy from 'views/components/edited-by';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

const users = [{
  user: {
    id: 1,
    name: 'gigel',
  },
}, {
  user: {
    id: 2,
    name: 'ionel',
  },
}];

describe('EditedBy', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<EditedBy />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class EditedBy', () => {
      const component = shallow(<EditedBy />);
      expect(component.hasClass('EditedBy')).to.be.true;
    });

    it('should render give class CustomEditedBy', () => {
      const component = shallow(<EditedBy className="CustomEditedBy"/>);
      expect(component.hasClass('CustomEditedBy')).to.be.true;
    });

    it('should render text none when no users are given', () => {
      const component = shallow(<EditedBy />);
      expect(component.text()).to.equal('none');
    });

    it('should render one user by default', () => {
      const component = mount(
        <EditedBy editedBy={users}/>
      );
      expect(component.props('display').display).to.equal('one');
      expect(component.find('.UserName')).to.have.length(1);
      expect(component.find('.Dropdown-button').text()).to.equal('1 others');
    });

    it('should render all user when display=all', () => {
      const component = mount(
        <EditedBy display="all" editedBy={users} />
      );

      expect(component.find('.EditedBy-counter').text()).to.equal('2 users');
      expect(component.find('.UserName')).to.have.length(2);
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<EditedBy onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
