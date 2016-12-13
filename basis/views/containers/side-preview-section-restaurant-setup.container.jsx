import React, {Component} from 'react';
import SidePreviewSectionRestaurantSetup from 'views/components/side-preview-section-restaurant-setup';

const sectionList = {
  'general-info': {
    'id': 'general-info',
    'name': 'General Info',
    'overview': [
      {
        'id': 0,
        'name': 'Mrs. Taylor Funk',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Helga Quigley',
        'completed': false,
      },
      {
        'id': 2,
        'name': 'Miss Devonte Oberbrunner',
        'completed': true,
      },
      {
        'id': 3,
        'name': 'Macy Koepp',
        'completed': true,
      },
      {
        'id': 4,
        'name': 'Grace Brakus',
        'completed': false,
      },
      {
        'id': 5,
        'name': 'Kathryne McLaughlin',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Elmore Dietrich',
        'completed': true,
      },
      {
        'id': 7,
        'name': 'Carolanne Schumm',
        'completed': true,
      },
      {
        'id': 8,
        'name': 'Grover Gleichner',
        'completed': true,
      },
    ],
  },
  'operating-hours': {
    'id': 'operating-hours',
    'name': 'Operating Hours',
    'overview': [
      {
        'id': 0,
        'name': 'Zackary Yost',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Sheldon Bins',
        'completed': true,
      },
      {
        'id': 2,
        'name': 'Shea Watsica',
        'completed': false,
      },
      {
        'id': 3,
        'name': 'Charley Kuphal',
        'completed': true,
      },
      {
        'id': 4,
        'name': 'Joanny VonRueden',
        'completed': true,
      },
      {
        'id': 5,
        'name': 'Waino Sipes',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Miles VonRueden',
        'completed': true,
      },
      {
        'id': 7,
        'name': 'Grover Welch',
        'completed': true,
      },
      {
        'id': 8,
        'name': 'Mrs. Emilio Feest',
        'completed': true,
      },
      {
        'id': 9,
        'name': 'Mrs. Barrett Kuhic',
        'completed': true,
      },
    ],
  },
  'job-settings': {
    'id': 'job-settings',
    'name': 'Job Settings',
    'overview': [
      {
        'id': 0,
        'name': 'Bette Rempel Ms.',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Devon Koepp',
        'completed': true,
      },
      {
        'id': 2,
        'name': 'Coleman Bergstrom',
        'completed': true,
      },
      {
        'id': 3,
        'name': 'Ted Kertzmann',
        'completed': true,
      },
      {
        'id': 4,
        'name': 'Mustafa Glover Dr.',
        'completed': true,
      },
      {
        'id': 5,
        'name': 'Etha Kozey',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Tristin Considine',
        'completed': true,
      },
      {
        'id': 7,
        'name': 'Mrs. Jerel Streich',
        'completed': true,
      },
      {
        'id': 8,
        'name': 'Linnea Rodriguez',
        'completed': true,
      },
      {
        'id': 9,
        'name': 'Virgil Kemmer',
        'completed': true,
      },
      {
        'id': 10,
        'name': 'Miss Astrid Fay',
        'completed': true,
      },
    ],
  },
  'community-engagement': {
    'id': 'community-engagement',
    'name': 'Community Engagement',
    'overview': [
      {
        'id': 0,
        'name': 'Alda Gislason Miss',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Chanel Ritchie',
        'completed': true,
      },
      {
        'id': 2,
        'name': 'Jason Luettgen',
        'completed': true,
      },
      {
        'id': 3,
        'name': 'Bessie Funk',
        'completed': true,
      },
      {
        'id': 4,
        'name': 'Sasha Stracke Miss',
        'completed': true,
      },
      {
        'id': 5,
        'name': 'Dorcas Bergstrom',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Irwin Will',
        'completed': true,
      },
      {
        'id': 7,
        'name': 'Efrain Hackett Miss',
        'completed': true,
      },
      {
        'id': 8,
        'name': 'Teagan Williamson',
        'completed': true,
      },
    ],
  },
  'miscellaneous': {
    'id': 'miscellaneous',
    'name': 'Miscellaneous',
    'overview': [
      {
        'id': 0,
        'name': 'Marcelina Krajcik',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Ms. Rocio Skiles',
        'completed': true,
      },
      {
        'id': 2,
        'name': 'Anastasia Murazik',
        'completed': true,
      },
      {
        'id': 3,
        'name': 'Helena Klein',
        'completed': true,
      },
      {
        'id': 4,
        'name': 'Jamal Weissnat',
        'completed': true,
      },
      {
        'id': 5,
        'name': 'Rhea Simonis',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Loyce Lowe',
        'completed': true,
      },
      {
        'id': 7,
        'name': 'Paris Leuschke',
        'completed': true,
      },
      {
        'id': 8,
        'name': 'Jodie Schaden',
        'completed': true,
      },
      {
        'id': 9,
        'name': 'Julia Turcotte',
        'completed': true,
      },
    ],
  },
  'legal': {
    'id': 'legal',
    'name': 'Legal',
    'overview': [
      {
        'id': 0,
        'name': 'Neha Huel',
        'completed': true,
      },
      {
        'id': 1,
        'name': 'Helene Brekke Dr.',
        'completed': true,
      },
      {
        'id': 2,
        'name': 'Lucas Gutkowski',
        'completed': true,
      },
      {
        'id': 3,
        'name': 'Elsie Douglas',
        'completed': false,
      },
      {
        'id': 4,
        'name': 'Otho Ferry',
        'completed': true,
      },
      {
        'id': 5,
        'name': 'Calista Monahan',
        'completed': true,
      },
      {
        'id': 6,
        'name': 'Caitlyn Glover',
        'completed': false,
      },
      {
        'id': 7,
        'name': 'Hudson Considine',
        'completed': true,
      },
    ],
  },
};

export default class SidePreviewSectionRestaurantSetupContainer extends Component {
  render() {
    return (
      <div>
        <SidePreviewSectionRestaurantSetup sectionList={sectionList} />
      </div>
    );
  }
}
