import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../../utils/burger-api';
import { TOrder, TOrdersData } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
  wsConnected: boolean;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  userOrders: [],
  isLoading: false,
  error: null,
  wsConnected: false
};

export const fetchFeeds = createAsyncThunk('feed/fetchAll', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk(
  'feed/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect: (state) => {
      state.wsConnected = true;
    },
    wsDisconnect: (state) => {
      state.wsConnected = false;
    },
    wsMessage: (state, action: PayloadAction<TOrdersData>) => {
      if (action.payload.orders && action.payload.orders.length > 0) {
        const firstOrder = action.payload.orders[0];
        if (firstOrder && firstOrder.number) {
          state.orders = action.payload.orders;
          state.total = action.payload.total || 0;
          state.totalToday = action.payload.totalToday || 0;
        } else {
          state.userOrders = action.payload.orders;
        }
      }
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.wsConnected = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ленты заказов';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      });
  }
});

export const { wsConnect, wsDisconnect, wsMessage, wsError } =
  feedSlice.actions;
export const feedReducer = feedSlice.reducer;
