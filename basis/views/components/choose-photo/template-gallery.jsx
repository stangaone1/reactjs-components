import React from 'react';
import Gallery from 'views/components/gallery';

const filters = [
  {
    name: 'category',
    values: ['All categories', 'Jobs', 'Hiring', 'Events', 'Custom'],
  },
  {
    name: 'subcategory',
    values: ['All subcategories', 'Jobs', 'Hiring', 'Events', 'Custom'],
  },
  {
    name: 'format',
    values: ['All formats', 'Special job', 'Standard job'],
  },
];

const photos = [
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
    path: 'http://lorempixel.com/400/208/',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo4',
    path: 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97208&w=400&h=208',
    category: 'Jobs',
    subcategory: 'Jobs',
    format: 'All formats',
  },
  {
    id: 'photo5',
    path: 'http://lorempixel.com/400/208/',
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
];

const TemplateGallery = () => {
  return (
    <Gallery
      photos={photos}
      filters={filters}/>
  );
};

TemplateGallery.displayName = 'TemplateGallery';

export default TemplateGallery;
