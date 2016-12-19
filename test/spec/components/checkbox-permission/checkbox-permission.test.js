import React from 'react';
import CheckboxPermission from 'views/components/checkbox-permission';
import Checkbox from 'views/components/checkbox';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

const label = 'Test label';

describe('CheckboxPermission', () => {
  describe('display', () => {
    it('renders label', () => {
      const options = [
        {name: 'From registered users only', checked: true},
        {name: 'Comments must be approved first', checked: false},
      ];

      const component = shallow(
        <CheckboxPermission
          options={options}
          label={label}
        />);

      expect(component.find(Checkbox).first().props().label).to.contain(label);
    });

    it('should render children', () => {
      const options = [
        {name: 'From registered users only', checked: true},
        {name: 'Comments must be approved first', checked: false},
      ];

      const component = mount(
        <CheckboxPermission
          options={options}
          label={label}
      />);

      expect(component.find('.Dropdown-menuItem').first().children().props().label).to.equal(options[0].name);
      expect(component.find('.Dropdown-menuItem').last().children().props().label).to.equal(options[1].name);
    });

    it('should disable checkboxes if the permission is not checked', () => {
      const options = [
        {name: 'From registered users only', checked: true},
        {name: 'Comments must be approved first', checked: false},
      ];

      const component = mount(
        <CheckboxPermission
          options={options}
          checked={false}
          label={label}
        />
      );

      expect(component.find('.Dropdown-menuItem').first().children().props().disabled).to.be.true;
      expect(component.find('.Dropdown-menuItem').last().children().props().disabled).to.be.true;
    });
  });
});
