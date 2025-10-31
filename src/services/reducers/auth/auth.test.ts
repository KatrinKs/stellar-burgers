import { authReducer, initialState, loginUser } from './auth';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('Auth Reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: loginUser.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.user).toBeNull();
  });
});
