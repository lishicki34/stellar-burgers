import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../ingredientsSlice';
import { userSlice } from '../userSlice';
import { burgerConstructorSlice } from '../burgerConstructorSlice';
import { feedSlice } from '../feedSlice';
import { ordersSlice } from '../ordersSlice';
import { orderSlice } from '../orderSlice';
import { rootReducer } from '../../store';

const initialRootState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [ordersSlice.name]: ordersSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState()
};

describe('rootReducer', () => {
  test('должен правильно объединять состояния различных редюсеров', () => {
    const action = { type: 'SOME_ACTION' };
    const state = rootReducer(initialRootState, action);
    expect(state).toEqual(initialRootState);
  });

  test('должен правильно инициализировать начальное состояние', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    expect(state).toEqual(initialRootState);
  });
});
