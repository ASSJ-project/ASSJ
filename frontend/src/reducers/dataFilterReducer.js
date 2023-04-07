// 리듀서 작성
import { SET_FILTER_JOB, SET_FILTER_REGION } from '@/actions/dataFilterActions';

// 리듀서 초기화
const initialState = {
  setFilterRegion: '',
  setFilterJob: '',
};

const dataFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_JOB:
      return {
        ...state,
        setFilterJob: action.payload,
      };
    case SET_FILTER_REGION:
      return {
        ...state,
        setFilterRegion: action.payload,
      };
    default:
      return state;
  }
};

export default dataFilterReducer;
