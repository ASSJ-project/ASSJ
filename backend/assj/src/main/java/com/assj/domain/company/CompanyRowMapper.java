package com.assj.domain.company;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class CompanyRowMapper implements RowMapper<Company> {
    @Override
    public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
        Company cd = new Company();
        cd.setCareer(rs.getString("career"));
        cd.setTitle(rs.getString("title"));
        cd.setSalTpNm(rs.getString("salTpNm"));
        cd.setSal(rs.getString("sal"));
        cd.setMinSal(rs.getString("minSal"));
        cd.setMaxSal(rs.getString("maxSal"));
        cd.setRegion(rs.getString("region"));
        cd.setHolidayTpNm(rs.getString("holidayTpNm"));
        cd.setMinEdubg(rs.getString("minEdubg"));
        cd.setRegDt(rs.getString("regDt"));
        cd.setCloseDt(rs.getString("closeDt"));
        cd.setInfoSvc(rs.getString("infoSvc"));
        cd.setWantedInfoUrl(rs.getString("wantedInfoUrl"));
        cd.setWantedMobileInfoUrl(rs.getString("wantedMobileInfoUrl"));
        cd.setSmodifyDtm(rs.getString("smodifyDtm"));
        cd.setZipCd(rs.getString("zipCd"));
        cd.setStrtnmCd(rs.getString("strtnmCd"));
        cd.setBasicAddr(rs.getString("basicAddr"));
        cd.setDetailAddr(rs.getString("detailAddr"));
        cd.setEmpTpCd(rs.getString("empTpCd"));
        cd.setJobsCd(rs.getString("jobsCd"));
        cd.setCompany(rs.getString("company"));
        cd.setX(rs.getString("x"));
        cd.setY(rs.getString("y"));
        return cd;
    }
}
