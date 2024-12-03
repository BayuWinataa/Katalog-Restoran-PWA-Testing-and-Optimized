import RestaurantApiSource from '../../data/RestaurantApiSource';
import { TemplateCreator } from '../templates/template-creator';

const home = {
  async render() {
    return `
        <section class="jumbotron">
        <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
       <img class="lazyload" src="./images/heros/hero-image_4.jpg" 
       alt="Hero image">
        </picture>
        </section>
        <h1>Explore Restaurant</h1>
        <loader-element></loader-element>
        <div id="restaurant-list"></div>
    `;
  },
  async afterRender() {
    const restaurantList = await RestaurantApiSource.getRestaurantList();
    const restaurantListContainer = document.querySelector('#restaurant-list');
    const loaderElement = document.querySelector('loader-element');

    loaderElement.classList.add('hidden');

    restaurantList.forEach((restaurant) => {
      restaurantListContainer.innerHTML += TemplateCreator.RestaurantItem(restaurant);
    });
  },
};

export default home;
