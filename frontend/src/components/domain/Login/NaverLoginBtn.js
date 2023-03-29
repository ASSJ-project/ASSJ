// import React from "react";
// import NaverImg from "../../../assets/images/naverbtn.png";
// import NaverLogin from "react-naver-login";

// export default function GoogleLoginBtn() {
//   const clientId = "Y5zyEYtILlNk1RvdxNa9";
//   const callbackUrl = "http://localhost:3000/";

//   const responseNaver = (response) => {
//     console.log(response);
//   };

//   return (
//     <NaverLogin
//       clientId={clientId}
//       callbackUrl={callbackUrl}
//       render={(renderProps) => (
//         <img
//           src={NaverImg}
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled}
//           style={{ marginRight: 10 }}
//         />
//       )}
//       onSuccess={responseNaver}
//       onFailure={responseNaver}
//     />
//   );
// }
