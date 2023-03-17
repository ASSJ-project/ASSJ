//여기 최근조회기록 누르면 나오는 페이지에요 ㅎㅎ
import { useEffect,useState } from "react";
import "../static/css/MyPage-Check.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";

const MyPage2 = () =>{
  //최근조회기록을 눌렀을 때 
  let [company,setcompany] = useState([]);
  useEffect(()=>{
    let info = localStorage.getItem('data')
    if(info == null){
      info=[]
    }
    else{
    info = JSON.parse(info);        //[구글,네이버,코리아]
    }
    setcompany(info)
  },[])
  
  
  
  //검색어 삭제
  function lol(i){
    let info = localStorage.getItem('data')
    info = JSON.parse(info)
    localStorage.removeItem('data')
    info.splice(i,1)
    console.log(info);
    setcompany(info)
    localStorage.setItem("data", JSON.stringify(info));
  }

  //최근조회한것을 보여줍니다.
  function repaetTitle(company){
    let arr=[];
    for (let i =0; i<company.length; i++){
      arr.unshift(
          <div key={i}>{company[i]}<button onClick={()=>lol(i)}>삭제</button></div>
      )
    }
    return arr;
  }
  
  //검색어 전체 삭제
  const handleClearKeywords = () => {
    localStorage.removeItem('data')
    setcompany([])
  }

  return (
    <div className="main">
        <Head/>
        <Link to="/Main" className="home" style={{ textDecoration: "none" }}>Home</Link>
        <Link to="/MyPage" className="my-information2"style={{ textDecoration: "none" }}>내정보</Link>
        <button className="my-record2">최근 조회 기록</button>
        <p className="mypage">MY PAGE</p>
        <button className="my-record3" onClick={handleClearKeywords}>전체삭제</button>
        <div className="dod">
        {repaetTitle(company)}
        </div>
    </div>
    );
  
}




export default MyPage2; 

function Head(){ // 이 친구는 윗부분에 있는 컴포넌트에용
  return(
    <>
  <span className="App-title">알쓸신잡</span>
  <header className="App-header">
    <Link to="/SideBar" style={{ textDecoration: "none" }}><img src={frame} className="Hug"/></Link>
  </header>
  </>
  );
}

