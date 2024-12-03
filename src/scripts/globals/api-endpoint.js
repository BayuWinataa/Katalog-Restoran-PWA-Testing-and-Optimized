import CONFIG from './config';

const API_ENDPOINT = {
  resturantList: `${CONFIG.BASE_URL}/list`,
  resturantDetail: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;
