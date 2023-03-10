import { Buffer } from "buffer"

const util = {
    checkScript: (name, src, callback, type) => {
        // name : script에 포함된 이름
        // src : script내부에 사용되는 src
        // callback : script 로드 완료 후 발생되는 콜백
        // type : meta, google인 경우 추가적인 script 셋팅
        const scriptList = document.getElementsByTagName('script')

        let script

        for (let i = 0; i < scriptList.length; i++) {
            if (scriptList[i].src.includes(name)) {
                script = scriptList[i]
            }
        }

        if (script) {
            callback()
        } else {
            script = document.createElement('script')

            script.async = true

            if (type === 'meta') {
                script.defer = true
                script.crossOrigin = "anonymous"
            } else if (type === 'google') {
                script.defer = true
            }

            script.src = src

            document.head.appendChild(script)

            script.onload = () => {
                callback()
            }
        }

        return script
    },
    decodePaylod: (token) => {
        // base64 데이터 추출(google login)
        const base64Payload = token.split('.')[1]

        const payload = Buffer.from(base64Payload, 'base64')

        return JSON.parse(payload.toString())
    },
    removeScript: (script) => {
        // script 제거
        document.head.removeChild(script)
    },
    delay: (ms) => {
        // ms 만큼 딜레이
        return new Promise((res) => {
            const timer = setTimeout(() => {
                res()
                clearTimeout(timer)
            }, ms);
        })
    },
}

export default util