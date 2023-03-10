import util from "./util";

export default function KakaoLogin() {
    const src = "https://developers.kakao.com/sdk/js/kakao.min.js"
        let kakaoScript = util.checkScript('kakao', src, openPopup)
        function openPopup() {
            if (!Kakao.isInitialized()) {
                Kakao.init('5308bfd7191289f8e5ccd2c1224835eb')
            }
            
            Kakao.Auth.login({
                success: (_) => {
                    Kakao.API.request({
                        url: '/v2/user/me',
                        data: {
                            property_keys: ["kakao_account.email", "kakao_account.profile"]
                        },
                        success: (res) => {
                            // res.kakao_account.email
                            // res.kakao_account.profile.nickname
                            // res.kakao_account.profile.profile_image_url
                            console.log({ res })
                            util.removeScript(kakaoScript)
                            return res.kakao_account
                        },
                        fail: (err) => {
                            alert(`개인정보를 가져올 수 없습니다. ${JSON.stringify(err)}`)
                        }
                    })
                },
                fail: (err) => {
                    alert(`도메인을 확인해주세요. ${JSON.stringify(err)}`)
                },
            });
        }
   
}