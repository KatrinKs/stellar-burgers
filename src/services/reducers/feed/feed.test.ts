import { feedReducer, initialState, fetchFeeds, wsMessage } from './feed';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Test Order 1',
    number: 12345,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    ingredients: ['3', '4'],
    status: 'pending',
    name: 'Test Order 2',
    number: 12346,
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  }
];

describe('Feed Reducer', () => {
  it('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.rejected', () => {
    const errorMessage = 'Failed to fetch feeds';
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle wsMessage with orders data', () => {
    const action = wsMessage({
      orders: mockOrders,
      total: 100,
      totalToday: 10
    });
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });
});
