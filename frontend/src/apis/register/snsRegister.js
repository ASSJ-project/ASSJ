import axios from "axios";
export async function snsRegisterDo(id) {
  const url = "api/users/snsregister.do";
  await axios
    .post(url, {
      userId: id,
    })
    .then((response) => {
      if (response.data) {
        sessionStorage.setItem("login", true);
        window.location.href = "map";
        return true;
      } else return false;
    })
    .catch((error) => console.log(error));
}
