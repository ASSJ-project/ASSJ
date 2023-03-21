{
  /* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.2.js"></script>
window.onload = function () {
    document.getElementById("kakao").addEventListener("click", function () {
      //주소입력칸을 클릭하면
      //카카오 지도 발생
      function closeDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_layer.style.display = "none";
      }
      new daum.Postcode({
        oncomplete: function (data) {
          //선택시 입력값 세팅
          document.getElementById("kakao").value = data.address; // 주소 넣기
          document.querySelector("input[id=address_detail]").focus(); //상세입력 포커싱
        },
      }).open();
    });
  }; */
}
/* global daum */
export function postalSeach() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
      document.getElementById("address").value = data.address;
      document.getElementById("address_detail").focus();
    },
  }).open();
}
