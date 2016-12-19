import React from 'react';
import Icon from 'views/components/icon';
import {SectionCard, SectionCardBody, SectionCardHeader, SectionCardFooter} from 'views/components/section-card';
import * as utils from '../../../utils/utils';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {expect} from 'chai';
import {spy} from 'sinon';

let sectionCardComponent;
let sectionHeaderComponent;
let sectionBodyComponent;
let sectionFooterComponent;
const notificationsData = [{iconName: 'arrow', content: 'aaaaa'}, {iconName: 'arrow', content: 'bbbbbb'}];

describe('Section-card', () => {
  describe('render', () => {
    beforeEach(()=> {
      sectionCardComponent = utils.shallowlyRenderedOutput(<SectionCard>
        <SectionCardHeader iconName="arrow" title="HeaderTitle"/>
        <SectionCardBody
            notifications={notificationsData}
            content="BodyContent"/>
        <SectionCardFooter buttonTitle="hasButton" content="FooterContent"/>
      </SectionCard>);
    });
    it('should render a section card', ()=> {
      expect(sectionCardComponent.props.className).to.equal('SectionCard');
      expect(sectionCardComponent.type).to.equal('div');
    });
    it('should contain header body footer components', ()=> {
      const [headerComponent, bodyComponent, footerComponent] = sectionCardComponent.props.children;
      expect(headerComponent.type).to.equal(SectionCardHeader);
      expect(bodyComponent.type).to.equal(SectionCardBody);
      expect(footerComponent.type).to.equal(SectionCardFooter);
    });
    it('should have title and iconName props for header component', ()=> {
      const [headerComponent] = sectionCardComponent.props.children;
      expect(headerComponent.props.iconName).to.equal('arrow');
      expect(headerComponent.props.title).to.equal('HeaderTitle');
    });

    it('should have content and notifications props for body component', ()=> {
      const bodyComponent = sectionCardComponent.props.children[1];
      expect(bodyComponent.props.content).to.equal('BodyContent');
      expect(bodyComponent.props.notifications).to.equal(notificationsData);
    });

    it('should have content and buttonTitle props for footer component', ()=> {
      const footerComponent = sectionCardComponent.props.children[2];
      expect(footerComponent.props.content).to.equal('FooterContent');
      expect(footerComponent.props.buttonTitle).to.equal('hasButton');
    });
    afterEach(()=> {
      sectionCardComponent = null;
    });
  });
});

describe('Section-card-header', () => {
  describe('render', () => {
    it('should render a header component', ()=> {
      sectionHeaderComponent = utils.shallowlyRenderedOutput(
          <SectionCardHeader
              iconName="arrow"
              title="HeaderTitle"/>
      );

      expect(sectionHeaderComponent.props.className).to.equal('SectionCardHeader');
      expect(sectionHeaderComponent.props.children[0].type).to.equal(Icon);
      expect(sectionHeaderComponent.props.children[0].props.name).to.equal('arrow');
      expect(sectionHeaderComponent.props.children[1].type).to.equal('div');
      expect(sectionHeaderComponent.props.children[1].props.className).to.equal('SectionCardHeader-title');
      expect(sectionHeaderComponent.props.children[1].props.children).to.equal('HeaderTitle');
    });
  });
});

describe('Section-card-body', () => {
  describe('render', () => {
    it('should render a header component', ()=> {
      sectionBodyComponent = utils.shallowlyRenderedOutput(
          <SectionCardBody
              notifications={notificationsData}
              content="BodyContent"/>
      );
      expect(sectionBodyComponent.props.className).to.equal('SectionCardBody');
      expect(sectionBodyComponent.props.children[0].type).to.equal('div');
      expect(sectionBodyComponent.props.children[0].props.className).to.equal('SectionCardBody-content');
      expect(sectionBodyComponent.props.children[0].props.children).to.equal('BodyContent');
      expect(sectionBodyComponent.props.children[1].type).to.equal('div');
      expect(sectionBodyComponent.props.children[1].props.children.length).to.equal(notificationsData.length);
      expect(sectionBodyComponent.props.children[1].props.children[0].props.className).to.equal('SectionCardNotification');
    });

    it('should not render notifications if none', ()=> {
      sectionBodyComponent = utils.shallowlyRenderedOutput(<SectionCardBody content="BodyContent"/>);
      expect(sectionBodyComponent.props.children[1]).to.be.undefined;
    });
  });
});


describe('Section-card-footer', () => {
  describe('render', () => {
    it('should render a footer component', ()=> {
      sectionFooterComponent = utils.shallowlyRenderedOutput(
          <SectionCardFooter
              buttonTitle="hasButton"
              content="FooterContent"/>
      );
      expect(sectionFooterComponent.props.className).to.equal('SectionCardFooter');
      expect(sectionFooterComponent.props.children[1].props.children).to.equal('FooterContent');
      expect(sectionFooterComponent.props.children[0].props.className).to.equal('SectionCardFooter-button');
      expect(sectionFooterComponent.props.children[0].props.children).to.equal('hasButton');
    });

    it('should render a footer with no button', ()=> {
      sectionFooterComponent = utils.shallowlyRenderedOutput(<SectionCardFooter content="FooterContent"/>);
      expect(sectionFooterComponent.props.className).to.equal('SectionCardFooter');
      expect(sectionFooterComponent.props.children[0]).to.be.undefined;
      expect(sectionFooterComponent.props.children[1].props.children).to.equal('FooterContent');
    });

    it('should render call a callback on button click', ()=> {
      const _onAction = spy();
      const sectionFooterComponent = renderIntoDocument(
          <div>
            <SectionCardFooter
                onCardAction={_onAction}
                buttonTitle="hasButton"
                content="FooterContent"/>
          </div>
      );
      const button = findDOMNode(sectionFooterComponent).getElementsByClassName('SectionCardFooter-button')[0];
      Simulate.click(button);
      expect(_onAction.called).to.be.true;
    });
  });
});
