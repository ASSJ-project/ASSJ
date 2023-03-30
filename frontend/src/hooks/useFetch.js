function useFetch() {
  const { isLoading, error, data} = useQuery('data', fetchData);
}