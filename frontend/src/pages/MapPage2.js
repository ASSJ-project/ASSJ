import useFetch from '@/hooks/useFetch';

function LayoutPage() {
  const { data, isLoading, error } = useFetch(
    'https://dapi.kakao.com/v2/local/search/address.json',
    { query: '서울 구로구' },
    {
      'Content-Type': 'application/json',
      Authorization: 'KakaoAK 50bbb5205dc8fcc9c2611542015a54d5',
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}

export default LayoutPage;
