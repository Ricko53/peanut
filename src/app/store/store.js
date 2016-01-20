import { combineReducers, createStore } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT
} from '../actions';

function selectedImage(state, action) {
  if(action.type === SELECT_REDDIT) {
    return Object.assign({}, state, action.reddit);
  }
}

const rootReducer = combineReducers({
  selectedImage
});

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);
  return store;
}