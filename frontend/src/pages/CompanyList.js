import useFetchData from '@/hooks/useFetchData';

function CompanyList() {
  const { data, loading, error } = useFetchData();
  console.log(data);
  return (
    <div>
      {data.map((item, index) => {
        console.log(item.title);
        <p>{item.title}</p>;
      })}
    </div>
  );
}

export default CompanyList;
