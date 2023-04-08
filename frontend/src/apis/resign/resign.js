import axios from "axios";

export async function deleteUser(email, password) {
  const url = "api/users/deleteUser";
  try {
    const result = await axios.delete(url, {
      headers: {
        userEmail: email,
        userPassword: password,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
