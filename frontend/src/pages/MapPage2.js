import useFetch from '@/hooks/useFetch';

function LayoutPage() {
  const { data, isLoading, error } = useFetch(
    '/api/company/items',
    { page: 3, size: 10, filteredData: '구로구' },
    { 'Content-Type': 'application/json' }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);
  // return <div>{JSON.stringify(data)}</div>;
}

export default LayoutPage;
