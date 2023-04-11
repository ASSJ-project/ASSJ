import { useState, useEffect } from "react";

const usePageData = (page, size, data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
};

async function fetchData(page, size, data) {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    params.append("filteredData", data);

    const url = `/api/company/items?${params}`;

    const response = await fetch(url);
    const result = await response.json();
    const filteredData = result.map((data) => {
      return {
        company: data.company,
        x: data.x,
        y: data.y,
        address: data.basicAddr,
        title: data.title,
        salTpNm: data.salTpNm,
        sal: data.sal,
        basicAddr: data.basicAddr,
        closeDt: data.closeDt,
        jobsCd: data.jobsCd,
      };
    });
    setData(filteredData);
  } catch (error) {
    setError("데이터 fetch 중 에러 발생");
  } finally {
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [x, y]);

  return { data, loading, error };
}
export default usePageData;
