import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { userSlice } from './userSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice';
import { feedSlice } from './feedSlice';
import { ordersSlice } from './ordersSlice';
import { orderSlice } from './orderSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
