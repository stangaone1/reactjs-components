import React, {Component} from 'react';
import {SectionCard, SectionCardBody, SectionCardHeader, SectionCardFooter} from 'views/components/section-card';
import CountTracker from 'views/components/count-tracker';

export default class SectionCardContainer extends Component {
  _onCardAction(ev) {
    console.log('TRIGGER SOME ACTION', ev);
  }
  render() {
    const notificationsData = [{title: 'CREW.', content: 17}, {title: 'MGT.', content: '2'}];
    const notificationsData1 = [{iconName: 'arrow', content: 17}, {iconName: 'arrow', content: '2'}];
    const notificationsData2 = [{title: 'CREW.', content: <CountTracker current={1} max={5}/>}, {title: 'MGT.', content: <CountTracker current={0} max={5}/>}];
    return (
        <div>
          <SectionCard>
            <SectionCardHeader iconName="arrow" title="Events"/>
            <SectionCardBody
                notifications={notificationsData}
                content="contentcontentcontentcontentcontentcontentcontentcontent"/>
            <SectionCardFooter onCardAction={this._onCardAction} buttonTitle="hasButton" content="FooterContent"/>
          </SectionCard>
          <SectionCard>
            <SectionCardHeader iconName="arrow" title="Events"/>
            <SectionCardBody
              notifications={notificationsData1}
              content="contentcontentcontentcontentcontentcontentcontentcontent"/>
            <SectionCardFooter onCardAction={this._onCardAction} buttonTitle="hasButton" content="FooterFooterContentFooterContentFooterContentFooterContentFooterContentContent"/>
          </SectionCard>
          <SectionCard>
            <SectionCardHeader iconName="arrow" title="Events"/>
            <SectionCardBody
              notifications={notificationsData2}
              content="contentcontentcontentcontentcontentcontentcontentcontent"/>
            <SectionCardFooter onCardAction={this._onCardAction} buttonTitle="hasButton"/>
          </SectionCard>
        </div>
    );
  }
}
