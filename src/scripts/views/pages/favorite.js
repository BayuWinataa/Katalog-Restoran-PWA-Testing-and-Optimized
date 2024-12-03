import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { TemplateCreator } from '../../views/templates/template-creator';

const Favorite = {
	async render() {
		return `
        <section class="jumbotron">
        <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
       <img class="lazyload" src="./images/heros/hero-image_4.jpg" 
       alt="Hero image">
        </picture>

        </section>
        <h1>Favorite Restaurant</h1>
        <div id="restaurant-list"></div>
  `;
	},

	async afterRender() {
		const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
		const restaurantContainer = document.querySelector('#restaurant-list');

		restaurants.forEach((restaurant) => {
			restaurantContainer.innerHTML += TemplateCreator.RestaurantItem(restaurant);
		});
	},
};

export default Favorite;
