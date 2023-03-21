/* global daum */
export function postalSeach() {
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById("address").value = data.address;
      document.getElementById("address_detail").focus();
    },
  }).open();
}
