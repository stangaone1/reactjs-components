import restaurantList from './restaurant-list';
import getDetails from './restaurant-details-mock';

export default function getOverview(id) {
  return new Promise((resolve) => {
    setTimeout(() =>{
      resolve(
        Object.assign({}, restaurantList[id], {
          overview: getDetails(),
        })
      );
    }, 1000);
  });
}
