import axios from "axios";

export async function getUser() {
  const url = "api/users/all";
  try {
    const result = await axios.get(url);

    return result.data;
  } catch (error) {
    console.log(error);
  }
}
