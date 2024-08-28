import feedReducer, { getFeeds, initialState } from '../feedSlice';

import { TOrdersData, RequestStatus } from '@utils-types';

describe('feedSlice', () => {
  const orderData: TOrdersData = {
    orders: [
      {
        _id: 'order1',
        status: 'done',
        name: 'Test Order 1',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      },
      {
        _id: 'order2',
        status: 'pending',
        name: 'Test Order 2',
        createdAt: '',
        updatedAt: '',
        number: 2,
        ingredients: []
      }
    ],
    total: 100,
    totalToday: 20
  };

  test('обработка состояния ожидания getFeeds', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('обработка выполненного состояния getFeeds', () => {
    const action = { type: getFeeds.fulfilled.type, payload: orderData };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Success);
    expect(state.orders).toEqual(orderData.orders);
    expect(state.total).toEqual(orderData.total);
    expect(state.totalToday).toEqual(orderData.totalToday);
  });

  test('обработка отклоненного состояния getFeeds', () => {
    const action = { type: getFeeds.rejected.type };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Failed);
  });
});
