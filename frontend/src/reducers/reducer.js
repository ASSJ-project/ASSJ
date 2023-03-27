// reducer.js

import { SET_SUBCATEGORY } from '@/actions/actions';

const initialState = {
  selectedSubcategory: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBCATEGORY:
      return {
        ...state,
        selectedSubcategory: action.payload.subcategory,
      };
    default:
      return state;
  }
};

export default reducer;
