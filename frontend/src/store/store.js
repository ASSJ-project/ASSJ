// store.js

import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/reducers/reducer';

const store = configureStore({
  reducer: reducer,
});

export default store;
