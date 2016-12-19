/* eslint-env mocha */
import React from 'react';
import NotificationBubble from 'views/components/notification-bubble';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';

describe('NotificationBubble', () => {
  let notificationBubleComponent = null;
  let notificationNumber;

  describe('render', () => {
    it('should have a <div> as container and should have a class of .NotificationBubble', () => {
      notificationBubleComponent = utils.shallowlyRenderedOutput(<NotificationBubble />);
      expect(notificationBubleComponent.type).to.equal('div');
      expect(notificationBubleComponent.props.className).to.equal('NotificationBubble');
    });
    it('should render the provided notification number', () => {
      notificationNumber = 10;
      notificationBubleComponent = utils.shallowlyRenderedOutput(
        <NotificationBubble>
          {notificationNumber}
        </NotificationBubble>);
      expect(notificationBubleComponent.props.children).is.equal(10);
    });
    it('should hide if a non-numerical value is provided', () => {
      notificationBubleComponent = utils.shallowlyRenderedOutput(
        <NotificationBubble>
          non numerical value
        </NotificationBubble>);
      expect(notificationBubleComponent.props.children).is.null;
    });
    it('should hide if the hidden flag is present', () => {
      notificationBubleComponent = utils.shallowlyRenderedOutput(
        <NotificationBubble hidden>
          10
        </NotificationBubble>);
      expect(notificationBubleComponent.props.className).to.equal('NotificationBubble NotificationBubble--hidden');
    });
  });
});
