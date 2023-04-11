// 정의된 액션 타입을 불러오기
import { SET_CENTER } from '@/actions/mapActions';

// 초기값 설정 (현재 위치는 코스모)
const initialState = {
  center: { latitude: 37.495423523338, longitude: 126.823532587 },
};

// 새로운 상태를 
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CENTER:
      return { ...state, center: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
