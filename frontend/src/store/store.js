import { configureStore } from '@reduxjs/toolkit';
import dataFilterReducer from '@/reducers/dataFilterReducer';
import dataInfoReducer from '@/reducers/dataInfoReducer';
import mapReducer from '@/reducers/mapReducer';

const store = configureStore({
  reducer: {
    dataFilter: dataFilterReducer,
    dataInfo: dataInfoReducer,
    map: mapReducer,
  },
});

export default store;
