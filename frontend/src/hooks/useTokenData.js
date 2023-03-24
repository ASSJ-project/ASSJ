import { useState, useEffect, useCallback } from 'react';

const useTokenData = (e, p) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tokenData = useCallback(async () => {
    const data = { userEmail: e, userPassword: p };
    try {
      const response = await fetch('api/users/login.do', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.text();

      setToken(result);
    } catch (error) {
      setError('로그인 실패');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenData();
  }, [tokenData]);

  return { token, loading, error };
};

export default useTokenData;
