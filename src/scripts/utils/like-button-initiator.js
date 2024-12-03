import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { TemplateCreator } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = TemplateCreator.createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderButton();
      });
    } else {
      console.error('Like button element not found!');
    }
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = TemplateCreator.createLikedButtonTemplate();

    const unlikeButton = document.querySelector('#unlikeButton');
    if (unlikeButton) {
      unlikeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
        this._renderButton();
      });
    } else {
      console.error('Unlike button element not found!');
    }
  },
};

export default LikeButtonInitiator;
