import { rootReducer, RootState } from './index';

describe('Root Reducer', () => {
  it('should initialize correctly with unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState: RootState = {
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

    expect(initialState).toEqual(expectedState);
  });

  it('should return the same state for unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(initialState);
  });
});
