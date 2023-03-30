/* global daum */
// 주소 검색 API
export function postalSeach(setAddress) {
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById("address").value = data.address;
      setAddress(data.address);
    },
  }).open();
}
