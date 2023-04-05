import axios from "axios";

export async function getUser(page, limit) {
  const url = `api/users/all?page=${page}&limit=${limit}`;
  try {
    const result = await axios.get(url, {});
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
