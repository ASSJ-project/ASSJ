// 커스텀 훅
const useAlert = () => {
    const dispatch = useDispatch();
  
    const alert = (value, options) => {
      // 에러 Alert
      if (options?.error) {
        if (typeof value === 'string') {
          dispatch(setError(true));
          dispatch(setMessage(value));
          return;
        }
  
        /* ... */
        
      } else {
        // 일반 Alert
        if (typeof value === 'string') {
          dispatch(setError(false));
          dispatch(setMessage(value));
        }
      }
    };
  
    return alert;
  };