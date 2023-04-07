//여기 최근조회기록 누르면 나오는 페이지에요 ㅎㅎ
import { useEffect, useState } from 'react';
import '@/components/domain/MyPage/MyPage-Check.css';
import Button from '@mui/material/Button';

const MyPageCheck = () => {
  let [company, setcompany] = useState([]);

  useEffect(() => {
    let info = localStorage.getItem('data');
    if (info == null) {
      info = [];
    } else {
      info = JSON.parse(info);
    }
    setcompany(info);
  }, []);

  //검색어 삭제 함수에용
  function lol(i) {
    let info = localStorage.getItem('data');
    info = JSON.parse(info);
    localStorage.removeItem('data');
    info.splice(i, 1);
    console.log(info);
    setcompany(info);
    localStorage.setItem('data', JSON.stringify(info));
  }

  //최근조회한것을 보여줍니다.
  function repaetTitle(company) {
    let arr = [];
    for (let i = 0; i < company.length; i++) {
      arr.unshift(
        <div key={i} className="MyPage-CheckedItems">
          <div className="MyPage-Checked-Text">
            No {company.length - [i]}. &nbsp; {company[i]}
          </div>
          <Button onClick={() => lol(i)} variant="contained" size="small">
            삭제
          </Button>
        </div>
      );
    }
    //만약 arr이 삭제하거나 전체삭제하거나 원래 빈배열이라면 최근조회한 기록이 없는걸 나오게하고 내역이있다면 내용이나오게
    if (arr.length < 1) {
      return <div>최근 조회한 기록이 없어요</div>;
    } else {
      return arr;
    }
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    localStorage.removeItem('data');
    setcompany([]);
  };

  return (
    <>
      <div className="MyPage-SearchMenu">
        <div className="MyPage-Recently">최근조회내역</div>
        <Button
          variant="contained"
          size="small"
          onClick={handleClearKeywords}
          style={{ marginTop: '5px' }}
        >
          전체삭제
        </Button>
      </div>
      {repaetTitle(company)}
    </>
  );
};

export default MyPageCheck;
