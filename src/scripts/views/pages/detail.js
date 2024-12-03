import RestaurantApiSource from '../../data/RestaurantApiSource';
import UrlParser from '../../routes/url-parser';
import { TemplateCreator } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const detail = {
  async render() {
    return `
        <div id="restaurant"></div>
		<div id="likeButtonContainer"></div>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantApiSource.getRestaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = TemplateCreator.RestaurantDetail(restaurant);


    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: url.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
  },
};

export default detail;
