function CompanyList({ data }) {
  return (
    <div>
      {data.map((item, index) => {
        return <p>{item.title}</p>;
      })}
    </div>
  );
}

export default CompanyList;
