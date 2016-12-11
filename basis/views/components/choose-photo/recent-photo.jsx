import React, {PropTypes} from 'react';
import Gallery from 'views/components/gallery';

const recentPhotosFake = [
  {
    id: 'photo1',
    path: 'http://lorempixel.com/400/208/',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo2',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo3',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo4',
    path: 'http://lorempixel.com/400/208/',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo5',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo6',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo7',
    path: 'http://lorempixel.com/400/208/',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo8',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo9',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
];


const RecentPhotos = (props) => {
  const onSelect = (index) => {
    if (props.onSelect) {
      props.onSelect(recentPhotosFake[index]);
    }
  };
  return (
    <Gallery
      photos={recentPhotosFake}
      hideFilters
      onSelect={onSelect}/>
  );
};

RecentPhotos.displayName = 'RecentPhotos';

RecentPhotos.propTypes = {
  onSelect: PropTypes.func,
};

export default RecentPhotos;
