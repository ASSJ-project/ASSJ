// 액션 타입 정의
export const SET_FILTER_JOB = 'SET_FILTER_JOB';
export const SET_FILTER_REGION = 'SET_FILTER_REGION';

// 액션 생성자 작성
export const setFilterJob = (value) => ({
  type: SET_FILTER_JOB,
  payload: value,
});

export const setFilterRegion = (value) => ({
  type: SET_FILTER_REGION,
  payload: value,
});
