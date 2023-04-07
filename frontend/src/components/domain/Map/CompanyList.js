import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetCompany from "@/hooks/useGetCompany";
import "./css/CompanyList.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { yellow } from "@material-ui/core/colors";

export default function CompanyList(props) {
  const { region, jobsCd } = props;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/test");
  }

  function handleScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight ) {
      setPage((prev) => prev + 1);
    }
  }

  function handleCompanyClick(item) {
    console.log(item.wgsX, item.wgsY);
  }

  const { items, loading, error } = useGetCompany(region, jobsCd, page);

  //메인 컨테이너에 미디어쿼리 적용, div -> main -> div() -> div(회사내용) {item.company} {item.title} {item.jobsCd} {item.salTpNm} {item.sal} {item.closeDt} {item.}
  return (
    <div className="main-container" onScroll={handleScroll} >
      <div className="clist-container">
        {items.map((item, index) => {
          return (
            <>
              <Card className="card" 
                key={item.id} 
                onClick={() => handleCompanyClick(item)} 
                sx={{m: 1.5, backgroundColor: '#eff5ff', border: 'solid 1px #b4c0d3' }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.company}
                  </Typography>

                  <Typography sx={{ fontSize: 18 }} component="div">
                    {item.title}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.career}, {item.minEdubg}, {item.holidayTpNm}
                  </Typography>
                    
                  <Typography sx={{ mb: 3 }} color="text.secondary">
                    {item.salTpNm }: {item.sal }
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.basicAddr }
                  </Typography>

                  <Typography variant="body2" sx={{}}>
                  {item.closeDt}
                  </Typography>

                </CardContent>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
}
