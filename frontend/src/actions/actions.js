// actions.js

export const SET_SUBCATEGORY = 'SET_SUBCATEGORY';

export const setSubcategory = (subcategory) => ({
  type: SET_SUBCATEGORY,
  payload: { subcategory },
});
