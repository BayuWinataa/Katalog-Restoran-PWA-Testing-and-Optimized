import CONFIG from '../../globals/config';

const RestaurantItem = (restaurant) => `
    <a href="/#/detail/${restaurant.id}" class="restaurant-link"> 
      <article class="restaurant-item">
        <img class="lazyload" src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-img" crossorigin="anonymous">
        <div class="restaurant-info">
          <h2>${restaurant.name}</h2>
          <p>${restaurant.description.substring(0, 80) + (restaurant.description.length > 80 ? '...' : '')}</p>
          <p id="rating">${restaurant.city} - Rating: ${restaurant.rating}</p>
        </div>
      </article>
    </a>
`;

const RestaurantDetail = (restaurant) => `
  <div class="restaurant-detail">
    <img class="lazyload" src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-img">
    <div class="restaurant-info">
      <h2>${restaurant.name}</h2>
      <p>${restaurant.description}</p>
      <p id="rating">${restaurant.city} - Rating: ${restaurant.rating}</p>
      <p><strong>Address:</strong> ${restaurant.address}</p>
      
      <div class="restaurant-categories">
        <h3>Categories:</h3>
        <ul>
          ${restaurant.categories.map((category) => `<li>${category.name}</li>`).join('')}
        </ul>
      </div>
      
      <div class="restaurant-menus">
        <h3>Menus:</h3>
        
        <div class="menu-section">
          <h4>Foods:</h4>
          <ul>
            ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
          </ul>
        </div>
        
        <div class="menu-section">
          <h4>Drinks:</h4>
          <ul>
            ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="customer-reviews">
        <h3>Customer Reviews:</h3>
        ${restaurant.customerReviews
					.map(
						(review) => `
            <div class="review-item">
              <p><strong>${review.name}</strong> - ${review.date}</p>
              <p>"${review.review}"</p>
            </div>
          `
					)
					.join('')}
      </div>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="unlikeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export const TemplateCreator = {
  RestaurantItem,
  RestaurantDetail,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
