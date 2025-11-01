import { orderReducer, initialState, createOrder, clearOrder } from './order';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['1', '2'],
  status: 'done',
  name: 'Test Order',
  number: 12345,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
};

describe('Order Reducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orderModalData).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Failed to create order';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orderModalData).toBeNull();
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      orderModalData: mockOrder,
      error: 'Some error'
    };

    const state = orderReducer(stateWithOrder, clearOrder());

    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
});
