import useFetch from '@/hooks/useFetch';
import { useMemo } from 'react';

function LayoutPage() {
  const queryParams = { page: 2, size: 10, filteredData: '구로구' };
  const params = new URLSearchParams(queryParams);
  const headers = useMemo(
    () => ({ 'Content-Type': 'application/json;charset=utf-8' }),
    []
  );
  const options = useMemo(() => ({ headers }), [headers]);
  const { data, isLoading, error } = useFetch(
    `/api/company/items?${params}`,
    options
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <>{data && <p>{data.title}</p>}</>;
}

export default LayoutPage;


// import useFetch from '@/hooks/useFetch';
// import { useMemo } from 'react';

// function LayoutPage() {
//   const queryParams = useMemo(
//     () => ({ page: 3, size: 10, filteredData: '구로구' }),
//     []
//   );
//   const params = useMemo(() => new URLSearchParams(queryParams), [queryParams]);
//   const headers = useMemo(
//     () => ({ 'Content-Type': 'application/json;charset=utf-8' }),
//     []
//   );
//   const options = useMemo(() => ({ headers }), [headers]);
//   const { data, isLoading, error } = useFetch(`/api/company/items?${params}`, options);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   console.log("data: ", data);
//   return <>{data && <p>{data.title}</p>}</>;
// }

// export default LayoutPage;
