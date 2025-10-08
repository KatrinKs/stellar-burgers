import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/ingredients';
import { constructorReducer } from './constructor/constructor';
import { orderReducer } from './order/order';
import { authReducer } from './auth/auth';
import { feedReducer } from './feed/feed';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer
});
