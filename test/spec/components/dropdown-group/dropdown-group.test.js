import React from 'react';
import DropdownGroup from 'views/components/dropdown-group/dropdown-group';
import Dropdown from 'views/components/dropdown';
import DropdownMenu from 'views/components/dropdown-menu/dropdown-menu';
import * as utils from '../../../utils/utils';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {spy} from 'sinon';

const data = [
  {value: '0', label: 'Edit'},
  {value: '1', label: 'Delete'},
  {value: '2', label: 'Select'},
  {type: 'header', label: 'header'},
  {value: '3', label: 'Link'},
];

const dropdownGroup = (
  <DropdownGroup>
    <Dropdown label="Label1">
      <DropdownMenu items={data}/>
    </Dropdown>
    <Dropdown label="Label2">
      <DropdownMenu items={data}/>
    </Dropdown>
    <Dropdown label="Label3">
      <DropdownMenu items={data}/>
    </Dropdown>
  </DropdownGroup>
);
let dropdownGroupComponent;

describe('DropdownGroup', () => {
  describe('display', () => {
    beforeEach(()=> {
      dropdownGroupComponent = utils.shallowlyRenderedOutput(dropdownGroup);
    });

    it('should render three dropdown components that are not opened', ()=> {
      expect(dropdownGroupComponent.props.children.length).to.equal(3);
      const children = dropdownGroupComponent.props.children;
      children.forEach((child) => {
        expect(child.props.open).to.be.false;
      });
    });
    it('should render two  dropdowns opened', ()=> {
      const dropdownGroup = (
        <DropdownGroup>
          <Dropdown label="Label1" open>
            <DropdownMenu items={data}/>
          </Dropdown>
          <Dropdown label="Label2" open>
            <DropdownMenu items={data}/>
          </Dropdown>
        </DropdownGroup>
      );
      const dropdownGroupComponent = utils.shallowlyRenderedOutput(dropdownGroup);
      expect(dropdownGroupComponent.props.children[0].props.open).to.be.ok;
      expect(dropdownGroupComponent.props.children[1].props.open).to.be.ok;
    });

    it('should render two  dropdowns one closed and another opened', ()=> {
      const dropdownGroup = (
        <DropdownGroup>
          <Dropdown label="Label1" open={false}>
            <DropdownMenu items={data}/>
          </Dropdown>
          <Dropdown label="Label2" open>
            <DropdownMenu items={data}/>
          </Dropdown>
        </DropdownGroup>
      );
      const dropdownGroupComponent = utils.shallowlyRenderedOutput(dropdownGroup);
      expect(dropdownGroupComponent.props.children[0].props.open).to.be.false;
      expect(dropdownGroupComponent.props.children[1].props.open).to.be.ok;
    });


    it('should not be visible until we calculate the container width', ()=> {
      const dropdownGroup = (
        <DropdownGroup>
          <Dropdown label="Label1" open={false}>
            <DropdownMenu items={data}/>
          </Dropdown>
        </DropdownGroup>
      );
      const dropdownGroupComponent = utils.shallowlyRenderedOutput(dropdownGroup);
      expect(dropdownGroupComponent.props.style.width).to.equal(0);
      expect(dropdownGroupComponent.props.className).to.contain(' Dropdown-group--hidden');
    });

    it('should calculate the largest dropdown', ()=> {
      const dropdownGroup = (
        <DropdownGroup>
          <Dropdown label="Label1Label1Label1Label1Label1" open={false}>
            <DropdownMenu items={data}/>
          </Dropdown>
          <Dropdown label="Label2" open={false}>
            <DropdownMenu items={data}/>
          </Dropdown>
        </DropdownGroup>
      );

      const dropdownGroupComponent = TestUtils.renderIntoDocument(dropdownGroup);
      const findLargestSpy = spy(dropdownGroupComponent._findlargestDropdown);
      expect(findLargestSpy).to.have.been.called;
    });

    afterEach(()=> {
      dropdownGroupComponent = null;
    });
  });
});
