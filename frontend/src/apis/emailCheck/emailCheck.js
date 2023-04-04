import axios from "axios";

export async function emailCheck(email) {
  const url = "api/users/emailCheck.do";
  try {
    const result = await axios.post(url, {
      userEmail: email,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
