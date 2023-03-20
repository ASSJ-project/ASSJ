package com.assj.domain.company;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CompanyRowMapper implements RowMapper<CorpData>{

  @Override
  public CorpData mapRow(ResultSet rs, int row) throws SQLException {
    CorpData corpObj = new CorpData();
    corpObj.setBasicAddr(rs.getString("basicAddr"));
    corpObj.setCareer(rs.getString("career"));
    corpObj.setCloseDt(rs.getString("closeDt"));
    corpObj.setCompany(rs.getString("company"));
    corpObj.setDetailAddr(rs.getString("detailAddr"));
    corpObj.setEmpTpCd(rs.getString("empTpCd"));
    corpObj.setHolidayTpNm(rs.getString("holidayTpNm"));
    corpObj.setInfoSvc(rs.getString("infoSvc"));
    corpObj.setJobsCd(rs.getString("jobsCd"));
    corpObj.setMaxSal(rs.getString("maxSal"));
    corpObj.setMinEdubg(rs.getString("minEdubg"));
    corpObj.setMinSal(rs.getString("minSal"));
    corpObj.setRegDt(rs.getString("regDt"));
    corpObj.setRegion(rs.getString("region"));
    corpObj.setSal(rs.getString("sal"));
    corpObj.setSalTpNm(rs.getString("salTpNm"));
    corpObj.setSmodifyDtm(rs.getString("smodifyDtm"));
    corpObj.setTitle(rs.getString("title"));
    corpObj.setWantedInfoUrl(rs.getString("wantedInfoUrl"));
    corpObj.setWantedMobileInfoUrl(rs.getString("wantedMobileInfoUrl"));
    corpObj.setX(rs.getString("x"));
    corpObj.setY(rs.getString("y"));
    corpObj.setZipCd(rs.getString("zipCd"));
    return corpObj;
  }
  
}
