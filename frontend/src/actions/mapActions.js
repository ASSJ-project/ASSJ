// actions/mapActions.js
export const SET_CENTER = 'SET_CENTER';

export const setCenter = (latitude, longitude) => ({
  type: SET_CENTER,
  payload: { latitude, longitude },
});
