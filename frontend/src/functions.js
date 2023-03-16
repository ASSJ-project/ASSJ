import axios from "axios";
export async function callApi(url) {
  let dataSet = null;
  await axios
    .get(url, {
      // Header: {},
      // Payload: {},
    })
    .then((response) => {
      dataSet = response.data;
    })
    .catch((error) => console.log(error));

  return dataSet;
}
