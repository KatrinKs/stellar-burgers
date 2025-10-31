import { rootReducer } from './index';

describe('Root Reducer', () => {
  it('should initialize correctly with unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null,
        lastFetched: null 
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        updateUserError: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        userOrders: [],
        isLoading: false,
        error: null,
        wsConnected: false
      }
    });
  });

  it('should return the same state for unknown action', () => {
    const existingState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null,
        lastFetched: null 
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        updateUserError: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        userOrders: [],
        isLoading: false,
        error: null,
        wsConnected: false
      }
    };

    const newState = rootReducer(existingState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(existingState);
  });
});
