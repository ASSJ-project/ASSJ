import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetCompany from '@/hooks/useGetCompany';
import { useDispatch } from 'react-redux';
import './css/CompanyList.css';
import { setClickData } from '@/actions/dataInfoAction';
import { setCenter } from '@/actions/mapActions';

export default function CompanyList(props) {
  const { region, jobsCd } = props;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleMarkerClick(item) {
    dispatch(setCenter(item.wgsY, item.wgsX));
  }

  function handleScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }

  const { items, loading, error } = useGetCompany(region, jobsCd, page);

  //메인 컨테이너에 미디어쿼리 적용, div -> main -> div() -> div(회사내용) {item.company} {item.title} {item.jobsCd} {item.salTpNm} {item.sal} {item.closeDt} {item.}
  return (
    <div className="main-container" onScroll={handleScroll}>
      <div className="clist-container">
        {items.map((item, index) => {
          return (
            <>
              <div
                className="clist"
                key={item.id}
                onClick={() => handleMarkerClick(item)}
              >
                <div className="clist-company">
                  <strong>{item.company}</strong>
                </div>
                <div className="clist-title">
                  <span>{item.title}</span>
                </div>
                <div className="clist-closedt">{item.closeDt}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
