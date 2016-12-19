import React from 'react';
import CheckboxList from 'views/components/checkbox-list';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('CheckboxList', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<CheckboxList />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class CheckboxList', () => {
      const component = shallow(<CheckboxList />);
      expect(component.hasClass('CheckboxList')).to.be.true;
    });

    it('should render give class CustomCheckboxList', () => {
      const component = shallow(<CheckboxList className="CustomCheckboxList"/>);
      expect(component.hasClass('CustomCheckboxList')).to.be.true;
    });

    it('should only render all options', () => {
      const component = mount(
        <CheckboxList
          options={[{
            label: 'option 1',
            value: 1,
          }, {
            label: 'option 2',
            value: 2,
          }]}
        />
      );
      expect(component.find('.Checkbox')).to.have.length(2);
    });

    it('should render checkbox-item with custom class', () => {
      const component = mount(
        <CheckboxList
          options={[{
            label: 'option 1',
            value: 1,
            className: 'MyCustomClass',
          }]}
        />
      );
      expect(component.find('.MyCustomClass')).to.have.length(1);
    });

    it('should only render checkbox as checked if the value in value list', () => {
      const component = mount(
        <CheckboxList
          value={[1]}
          options={[{
            label: 'option 1',
            value: 1,
          }, {
            label: 'option 2',
            value: 2,
          }]}
        />
      );
      expect(component.find('.Checkbox--checked')).to.have.length(1);
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<CheckboxList onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });

    it('should trigger on change when selecting an option', () => {
      const handleChange = spy();
      const component = mount(
        <CheckboxList
          options={[{
            label: 'option',
            value: 'opt',
          }]}
          onChange={handleChange}
        />
      );
      expect(handleChange.called).to.be.false;
      component.simulate('click');
      component.find('.Checkbox-input').simulate('change');
      expect(handleChange.calledWith(['opt'])).to.be.true;
    });

    it('should trigger onChange adding the new values', () => {
      const handleChange = spy(console.log);
      const component = mount(
        <CheckboxList
          value={[2]}
          options={[{
            label: 'option',
            value: 1,
          }, {
            label: 'option',
            value: 2,
          }]}
          onChange={handleChange}
        />
      );
      expect(handleChange.called).to.be.false;
      component.simulate('click');
      component.find('.Checkbox-input').at(0).simulate('change');

      expect(handleChange.calledWith([2, 1])).to.be.true;
    });

    it('should trigger onChange removing the clicked value', () => {
      const handleChange = spy(console.log);
      const component = mount(
        <CheckboxList
          value={[1, 2]}
          options={[{
            label: 'option',
            value: 1,
          }, {
            label: 'option',
            value: 2,
          }]}
          onChange={handleChange}
        />
      );
      expect(handleChange.called).to.be.false;
      component.simulate('click');
      component.find('.Checkbox-input').at(0).simulate('change');

      expect(handleChange.calledWith([2])).to.be.true;
    });
  });
});
