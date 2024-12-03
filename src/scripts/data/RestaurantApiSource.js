import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApiSource {
  static async getRestaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.resturantList);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.log(error);
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.resturantDetail(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RestaurantApiSource;
