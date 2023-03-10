import axios from "axios";
export let dataSet = null;
export function callApi(url) {
  axios
    .get(url)
    .then((response) => {
      dataSet = response.data;
    })
    .catch((error) => console.log(error));
}
