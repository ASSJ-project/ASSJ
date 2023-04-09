// coding by 'ikki'
import "../components/domain/Start/StartPage.css";
import logo from "../assets/images/logo.svg";
import card1 from "../assets/images/start-card1.png";
import card2 from "../assets/images/start-card2.png";
import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Card from "@mui/material/Card";

const StartPage = () => {
  const customeSlider = useRef();

  const settings = {
    //슬라이드
    dots: false, // 점 보이기
    infinite: false, // 무한루트
    speed: 500,
    slidesToShow: 1, //1장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
    arrows: false, // 화살표버튼
  };

  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
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
      left: 30%;
    }

    .slick-next {
      // 양옆 버튼 위치
      right: 30%;
    }
    .slick-prev:before,
    .slick-next:before {
      //양옆 버튼. 커스텀 해줘야 보임
      font-family: "slick";
      font-size: 30px;
      line-height: 0;
      opacity: 1; //버튼 숨기기
      color: #000000;
      -webkit-font-smoothing: antialiased;
    }
  `;
  return (
    <StartSlider className="startslider">
      {/* 슬라이더 안먹음 */}
      <div className="logo-item">
        <img id="logo" src={logo} alt="logo-img" />
      </div>
      {/* 슬라이더 안먹음 */}
      <Slider {...settings} ref={customeSlider} className="slider">
        <div>
          <Card className="start_card">
            <img src={card1} alt="" />
          </Card>
        </div>

        <div>
          <Card className="start_card">
            <img src={card2} alt="" />
          </Card>
        </div>

        <div>
          <Card className="start_card"></Card>
        </div>

        <div>
          <Card className="start_card"></Card>
        </div>

        <div>
          <Card className="start_card">
            <img src={card1} alt="" />
          </Card>
        </div>
      </Slider>

      <div className="pvne_btn">
        <button className="previous" onClick={gotoPrev}>
          이전
        </button>
        <button className="next-btn" onClick={gotoNext}>
          다음
        </button>
      </div>

      <div className="btn-container">
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
    </StartSlider>
  );
};

export default StartPage;
