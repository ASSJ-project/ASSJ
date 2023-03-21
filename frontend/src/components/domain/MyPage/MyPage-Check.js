//여기 최근조회기록 누르면 나오는 페이지에요 ㅎㅎ
import { useEffect,useState } from "react";
import "../MyPage/MyPage.css"

const MyPageCheck = () =>{
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
          <div key={i} className="mypage-checkeditems">
            <div className="mypage-checked-text">{company[i]}</div>
            <button onClick={()=>lol(i)} className='mypage-chekeditem-deletebtn'>삭제</button></div>
      )
    }
    //만약 arr이 삭제하거나 전체삭제하거나 원래 빈배열이라면 최근조회한 기록이 없는걸 나오게하고
    //내역이있다면 내용이나오게
    if(arr.length<1){
      return <div className="Nothing">최근 조회한 기록이 없어요</div>
    }else{
      return arr;
    }
  }
  
  //검색어 전체 삭제
  const handleClearKeywords = () => {
    localStorage.removeItem('data')
    setcompany([])
  }

  return (
    <>
        <div className="mypage-searchmenu">
         <div className="mypage-recently">최근조회내역</div>
         <button className="mypage-checkeditems-alldeletebtn" onClick={handleClearKeywords}>전체삭제</button>
        </div>
        {repaetTitle(company)}
    </>
    );
  
}




export default MyPageCheck; 
