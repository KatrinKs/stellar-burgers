import { constructorReducer, initialState } from './constructor';
import {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructor';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'test.jpg',
  image_mobile: 'test-mobile.jpg',
  image_large: 'test-large.jpg',
  __v: 0
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Test Ingredient',
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
};

describe('Burger Constructor Reducer', () => {
  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addBun', () => {
    const action = addBun(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toEqual([]);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('should handle removeIngredient', () => {
    const addAction = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction);
    const ingredientId = state.ingredients[0].id;

    const removeAction = removeIngredient(ingredientId);
    state = constructorReducer(state, removeAction);

    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '1' };
    const ingredient2 = { ...mockIngredient, _id: '2' };

    let state = constructorReducer(initialState, addIngredient(ingredient1));
    state = constructorReducer(state, addIngredient(ingredient2));

    expect(state.ingredients[0]._id).toBe('1');
    expect(state.ingredients[1]._id).toBe('2');

    const moveAction = moveIngredient({ fromIndex: 0, toIndex: 1 });
    state = constructorReducer(state, moveAction);

    expect(state.ingredients[0]._id).toBe('2');
    expect(state.ingredients[1]._id).toBe('1');
  });

  it('should replace bun when adding new bun', () => {
    const firstBun = { ...mockBun, _id: 'bun1' };
    const secondBun = { ...mockBun, _id: 'bun2' };

    let state = constructorReducer(initialState, addBun(firstBun));
    expect(state.bun?._id).toBe('bun1');

    state = constructorReducer(state, addBun(secondBun));
    expect(state.bun?._id).toBe('bun2');
  });
});
