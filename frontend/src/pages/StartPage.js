// coding by 'ikki'
import "../components/domain/Start/StartPage.css";
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

function StartPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const settings = {
    //슬라이드
    dots: true, // 점 보이기
    infinite: true, // 무한루트
    speed: 500,
    slidesToShow: 1, //1장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
    arrows: true, // 화살표버튼
  };
  const StartSlider = styled.div`
    .slick-list {
      //크기조정
      width: 100%;
      height: 100%;
      margin: 0% auto;
    }
    .slick-prev {
      // 양염 버튼 위치
      z-index: 1;
      left: 30px;
    }

    .slick-next {
      // 양옆 버튼 위치
      right: 40px;
    }
    .slick-prev:before,
    .slick-next:before {
      //양옆 버튼. 커스텀 해줘야 보임
      font-family: "slick";
      font-size: 30px;
      line-height: 0;
      opacity: 0; //버튼 숨기기
      color: #000000;
      -webkit-font-smoothing: antialiased;
    }
  `;
  return (
    <StartSlider>
      {/* 슬라이더 안먹음 */}
      <div>hi</div>
      <Slider {...settings}>
        <div>
          <p>시작화면 잡 어쩌구 (마우스 오른쪽으로 드래그시 화면 넘어감)</p>
        </div>
        <div>
          <p>프로젝트 설명</p>
        </div>
        <div>
          <p>우리 프로젝트 사용화면 </p>
        </div>
        <>
          <div className="start-container">
            <div className="logo-item">
              <img id="logo" src={logo} alt="logo-img" />
            </div>

            <div className="btn-item">
              <Button
                variant="contained"
                className="btn-lo"
                onClick={() => (window.location.href = "/login")}
              >
                <p>로그인</p>
              </Button>
              <Button
                variant="contained"
                className="btn-re"
                onClick={() => (window.location.href = "/register")}
              >
                <p>회원가입</p>
              </Button>
            </div>
          </div>
        </>
      </Slider>
    </StartSlider>
  );
}

export default StartPage;
