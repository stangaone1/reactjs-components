import React from 'react';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import Cell from 'views/components/table/cell';
import { shallow, spyLifecycle, mount } from 'enzyme';


describe('Table Component', () => {
  describe('Cell', () => {
    it('should contain div tag', () => {
      const component = utils.shallowlyRenderedOutput(<Cell />);
      expect(component.type).to.equal('div');
    });

    it('should render passed value props as a child component', () => {
      const component = utils.shallowlyRenderedOutput(<Cell value="test"/>);
      expect(component.props.children.indexOf('test')).not.to.equal(-1);
    });

    it('should render children if passed', () => {
      const component = utils.shallowlyRenderedOutput(<Cell value="test">childComponent</Cell>);
      expect(component.props.children.indexOf('childComponent')).not.to.equal(-1);
    });

    it('should render value if number', () => {
      const component = shallow(<Cell value={1}>childComponent</Cell>);
      expect(component.text()).not.to.equal('1');
    });

    it('should render a custom rendered component', () => {
      const customRenderer = (cellDataValue)=> {
        return (<div>custom {cellDataValue}</div>);
      };

      const component = shallow(<Cell isCustomRendered customRenderer={customRenderer} value={1}>childComponent</Cell>);
      expect(component.props().children.props.children.indexOf('custom ')).not.to.equal(-1);
      expect(component.props().children.props.children.indexOf(1)).not.to.equal(-1);
    });


    it('should not rerender if nextProps checked value actionsOpened equal prevProps', () => {
      spyLifecycle(Cell);
      const wrapper = mount(<Cell value={1}>childComponent</Cell>);
      expect(Cell.prototype.render.calledTwice).to.equal(false);
      wrapper.setProps({value: 1});
      expect(Cell.prototype.render.calledTwice).to.equal(false);
      wrapper.setProps({actionsOpened: false});
      expect(Cell.prototype.render.calledTwice).to.equal(false);
      wrapper.setProps({checked: false});
      expect(Cell.prototype.render.calledTwice).to.equal(false);
      wrapper.setProps({checked: true});
      expect(Cell.prototype.render.calledTwice).to.equal(true);
    });
  });
});
