// 리듀서 작성
import { SET_CLICK_DATA } from '@/actions/dataInfoAction';

// 리듀서 초기화
const initialState = {
  setClickData: '',
};

const dataInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICK_DATA:
      return {
        ...state,
        setClickData: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    default:
      return state;
  }
};

export default dataInfoReducer;
