// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '@/store/slices';
import statisticReducer from '@/store/statisticSlice';
import walletSliceReducer from '@/store/walletSlice';

const store = configureStore({
    reducer: {
        main: mainReducer,
        statistics: statisticReducer,
        wallet:walletSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
