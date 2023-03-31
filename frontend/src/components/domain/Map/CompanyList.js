import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './CompanyList.css';


export default function CompanyList(size, filter) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  //filteredData=${filter}

  const navigate = useNavigate();

  function handleClick() {
    navigate('/test');
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }

  // const getCompany = useCallback(async() => {
  //     const res = await axios({method: 'GET', url: `/api/company/get/page=${page}&size=${size}&filteredData='서울특별시 구로구`});
  //     if(res.data) {
  //       setItems(prev=> [...prev, {...res.data[0]} ]);
  //     }
  //     else {
  //       console.log(res)
  //     }
  //   }, []);

   //데이터 불러오기

  const getCompany = async () => {
    const token = sessionStorage.getItem("access_token");
    const res = await axios.get(`/api/company/items?page=${page}&size=30&filteredData=서울특별시 구로구`, {
      headers : {
        "authorization" : "Bearer " + token
      }
    });
    setItems(prev => [...prev, ...res.data]);
  };
  
    //스크롤이 페이지 끝에 닿아서 로드 될 시 다음 데이터 출력
    useEffect(() => {
      getCompany() 
    }, [page]);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    //메인 컨테이너에 미디어쿼리 적용, div -> main -> div() -> div(회사내용) {item.company} {item.title} {item.jobsCd} {item.salTpNm} {item.sal} {item.closeDt} {item.}
    return (
      <div className='main-container'> 
        <div className='div1'>
              <div className='div2'>
              {items.map((item, index) => {
              return( <>  
                  <div className='div3' onClick={handleClick}>
                      <div className='title'><p>{item.title}</p></div>
                      <div className='company'>{item.company}</div>
                      <div className='jobcode'>{item.career}, {item.minEdubg} {item.holidayTpNm} </div>
                      <div className='sal'>{item.salTpNm} {item.sal} </div>
                      <div className='closedt'>{item.closeDt}</div>
                  </div>
              </>)
              })}
            </div>
        </div>
      </div>
    );
  }