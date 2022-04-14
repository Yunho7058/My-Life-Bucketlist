import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type TypeRootReducer = ReturnType<typeof rootReducer>;

export default store;
