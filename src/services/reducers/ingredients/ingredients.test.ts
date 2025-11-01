import {
  ingredientsReducer,
  initialState,
  fetchIngredients
} from './ingredients';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'test1.jpg',
    image_mobile: 'test1-mobile.jpg',
    image_large: 'test1-large.jpg',
    __v: 0
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'test2.jpg',
    image_mobile: 'test2-mobile.jpg',
    image_large: 'test2-large.jpg',
    __v: 0
  }
];

describe('Ingredients Reducer', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
    expect(state.lastFetched).toBeDefined();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
    expect(state.lastFetched).toBeDefined();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
    expect(state.lastFetched).toBeDefined();
  });

  it('should not modify state for unknown action', () => {
    const existingState = {
      ingredients: mockIngredients,
      isLoading: false,
      error: null,
      lastFetched: Date.now()
    };

    const newState = ingredientsReducer(existingState, {
      type: 'UNKNOWN_ACTION'
    });
    expect(newState).toEqual(existingState);
  });
});
