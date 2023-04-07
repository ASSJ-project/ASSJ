// 액션 타입 정의
export const SET_CLICK_DATA = 'SET_CLICK_DATA';

// 회사 클릭 시 액션 생성자
export const setClickData = (x, y) => ({
  type: SET_CLICK_DATA,
  payload: { x, y },
});
