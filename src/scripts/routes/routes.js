import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';


const ROUTES = {
  '/': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default ROUTES;
