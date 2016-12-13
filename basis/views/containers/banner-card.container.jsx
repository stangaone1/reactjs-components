import React, {Component} from 'react';
import BannerCard from 'views/components/bannercard/bannercard';

export default class BannerCardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BannerCard
        onButtonClick={() => { console.log('Click button action'); }}
        onPreviewClick={() => { console.log('Click button action'); }}
        title="My favorite banner"
        sizes={{
          small: 'http://s3.wallippo.com/thumbs/300x250/honda-cbr-600-f4i-3d5baeebc0ab7f6cbb4a17ac692ea197.jpeg',
        }}
        publishButtonLabel="Do something button"
        availability={{start: 'Mon Mar 14 2016 12:37:10 GMT+0200 (EET)', end: new Date()}}
      />
    );
  }
}
