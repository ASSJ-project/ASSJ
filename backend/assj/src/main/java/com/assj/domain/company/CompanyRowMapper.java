package com.assj.domain.company;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.assj.dto.Company;

public class CompanyRowMapper implements RowMapper<Company> {
    @Override
    public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
        Company company = new Company();
        company.setCompany(rs.getString("company"));
        company.setTitle(rs.getString("title"));
        company.setSalTpNm(rs.getString("salTpNm"));
        company.setSal(rs.getString("sal"));
        company.setMinSal(rs.getString("minSal"));
        company.setMaxSal(rs.getString("maxSal"));
        company.setRegion(rs.getString("region"));
        company.setHolidayTpNm(rs.getString("holidayTpNm"));
        company.setMinEdubg(rs.getString("minEdubg"));
        company.setCareer(rs.getString("career"));
        company.setRegDt(rs.getString("regDt"));
        company.setCloseDt(rs.getString("closeDt"));
        company.setZipCd(rs.getString("zipCd"));
        company.setStrtnmCd(rs.getString("strtnmCd"));
        company.setBasicAddr(rs.getString("basicAddr"));
        company.setDetailAddr(rs.getString("detailAddr"));
        company.setEmpTpCd(rs.getString("empTpCd"));
        company.setJobsCd(rs.getString("jobsCd"));
        company.setWgsX(rs.getString("wgsX"));
        company.setWgsY(rs.getString("wgsY"));
        company.setWtmX(rs.getDouble("wtmX"));
        company.setWtmY(rs.getDouble("wtmY"));

        return company;
    }
}
