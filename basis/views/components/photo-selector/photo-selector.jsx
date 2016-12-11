import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import ChoosePhoto from 'views/components/choose-photo';
import RecentHeaderPhotos from './recent-header-photos';
import DefaultPhotos from 'views/components/choose-photo/default-photos';
import NewPhoto from 'views/components/choose-photo/new-photo';

const choosePhotoTabs = {
  newPhoto: {
    visible: true,
    label: 'Add a new photo',
    component: NewPhoto,
  },
  default: {
    visible: true,
    label: 'Default gallery',
    component: DefaultPhotos,
  },
  recent: {
    visible: true,
    label: 'Select a photo you have used before',
    component: RecentHeaderPhotos,
  },
};

export default class PhotoSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {className, ...props} = this.props;
    const componentClasses = cx('PhotoSelector', className);
    return (
      <ChoosePhoto
        tabs={choosePhotoTabs}
        className={componentClasses}
        {...props}
      />
    );
  }
}
