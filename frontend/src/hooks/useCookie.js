import { useState, useEffect } from 'react';

function useCookie(key, defaultValue, days) {
  const [value, setValue] = useState(() => {
    const storedValue = getCookie(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    setCookie(key, JSON.stringify(value), days);
  }, [key, value, days]);

  const remove = () => {
    deleteCookie(key);
    setValue(defaultValue);
  };

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function deleteCookie(name) {
    document.cookie =
      name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  return [value, setValue, remove];
}

export default useCookie;
