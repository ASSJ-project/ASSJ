import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetCompany from '@/hooks/useGetCompany';
import './css/CompanyList.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { setCenter } from '@/actions/mapActions';
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';

export default function CompanyList(props) {
  const { region, jobsCd, data } = props;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setOpen(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const navigate = useNavigate();

  function handleScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }

  const { items, loading, error, resetItems } = useGetCompany(
    region,
    jobsCd,
    page
  );

  useEffect(() => {
    resetItems();
    setPage(1);
  }, [region, jobsCd]);
  //메인 컨테이너에 미디어쿼리 적용, div -> main -> div() -> div(회사내용) {item.company} {item.title} {item.jobsCd} {item.salTpNm} {item.sal} {item.closeDt} {item.}
  return (
    <div className="main-container" onScroll={handleScroll}>
      <div className="clist-container">
        {items.map((item, index) => {
          return (
            <>
              <Card
                className="company-card"
                key={item.id}
                onClick={() => {
                  handleCardClick(item);
                }}
                sx={{
                  m: 1.5,
                  backgroundColor: '#ffffff',
                  border: 'solid 1px #b4c0d3',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="blue" gutterBottom>
                    {item.company}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 18, marginBottom: 7 }}
                    component="div"
                  >
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{}}>
                    마감일자 : {item.closeDt}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <div className="modal-company">{selectedItem?.company}</div>
          <div className="modal-title">
            <h3>{selectedItem?.title}</h3>
          </div>{' '}
          <hr />
          <dl className="modal-dl">
            <dt className="modal-dt">경력</dt>
            <dd className="modal-dd">{selectedItem?.career}</dd>
          </dl>
          <dl className="modal-dl">
            <dt className="modal-dt">학력</dt>
            <dd className="modal-dd">{selectedItem?.minEdubg}</dd>
          </dl>
          <dl className="modal-dl">
            <dt className="modal-dt">근무일시</dt>
            <dd className="modal-dd">{selectedItem?.holidayTpNm}</dd>
          </dl>
          <dl className="modal-dl">
            <dt className="modal-dt">{selectedItem?.salTpNm}</dt>
            <dd className="modal-dd">{selectedItem?.sal}</dd>
          </dl>
          <dl className="modal-dl">
            <dt className="modal-dt">상세주소</dt>
            <dd className="modal-dd">{selectedItem?.basicAddr}</dd>
          </dl>
          <dl className="modal-dl">
            <dt className="modal-dt">모집기간</dt>
            <dd className="modal-dd">
              {selectedItem?.regDt} ~ {selectedItem?.closeDt}
            </dd>
          </dl>
        </div>
      </Modal>
    </div>
  );
}
