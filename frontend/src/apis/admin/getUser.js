import axios from "axios";

export async function getUser(page, limit) {
  const url = `api/users/all?page=${page}&limit=${limit}`;
  try {
    const result = await axios.get(url, {});
    if (result.data.length <= 0) {
      sessionStorage.setItem("error_message", "제공하지 않는 서비스입니다");
      window.location.href = "/error";
    }
    return result.data;
  } catch (error) {
    sessionStorage.setItem("error_message", "제공하지 않는 서비스입니다");
    window.location.href = "/error";
    console.log(error);
  }
}
