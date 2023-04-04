import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useGetCompany from '@/hooks/useGetCompany';
import './css/CompanyList.css';

export default function CompanyList(props) {
  const { region, jobsCd } = props;
  const [page, setPage] = useState(1);
  
  

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
  };

  const { items, loading, error } = useGetCompany(region, jobsCd, page);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //메인 컨테이너에 미디어쿼리 적용, div -> main -> div() -> div(회사내용) {item.company} {item.title} {item.jobsCd} {item.salTpNm} {item.sal} {item.closeDt} {item.}
  return (
    <div className="main-container">
      <div className="clist-container">
        {items.map((item, index) => {
          console.log(item.closeDt)
          return (
            <>
              <div className="clist" onClick={handleClick}>
                <div className="clist-company">
                  <strong>{item.company}</strong>
                </div>
                <div className="clist-title">
                  <span>{item.title}</span>
                </div>
                {/* <div className="clist-jobcode">
                  {item.minEdubg}, {item.holidayTpNm}{' '}
                </div>
                <div className="clist-sal">
                  {item.salTpNm} {item.sal}{' '}
                </div> */}
                
                <div className="clist-closedt">{item.closeDt}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
