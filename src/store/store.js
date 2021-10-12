import { createStore } from 'redux';
import rootReducer from './reducer';

let preloadedState = {
    isLoading: false,
    cartItems: [],
};
const store = createStore(rootReducer, preloadedState);

export default store;
