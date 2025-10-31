import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  lastFetched: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { getState }) => {
    const state = getState() as any;
    const lastFetched = state.ingredients.lastFetched;
    const now = Date.now();

    // Если данные были загружены менее 5 минут назад, не делаем новый запрос
    if (lastFetched && now - lastFetched < 5 * 60 * 1000) {
      return state.ingredients.ingredients;
    }

    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ингредиентов';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
