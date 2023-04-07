// reducers/mapReducer.js
import { SET_CENTER } from '@/actions/mapActions';

const initialState = {
  center: { latitude: 37.495423523338, longitude: 126.823532587 },
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CENTER:
      return { ...state, center: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
