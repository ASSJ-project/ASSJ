// 스토어에 리듀서 추가
import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/reducers/reducer';

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
