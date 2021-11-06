import AppReducer from './app';
import MoviesReducer from './movies';
import UserInformationReducer from './userInformation';
import {combineReducers} from 'redux';

export default combineReducers({
  AppReducer,
  MoviesReducer,
  UserInformationReducer,
});
