// coding by 'ikki'
import "../components/domain/Start/StartPage.css";
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
      <Slider {...settings} className="slider">
        <div>
          <Card className="start_card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="start_card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="start_card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Slider>
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
}

export default StartPage;