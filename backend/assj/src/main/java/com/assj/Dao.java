package com.assj;

import java.net.URLEncoder;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

import java.util.List;
import java.util.ArrayList;

public class Dao {
	
	@Autowired
	private DataSource ds;
	
	private static Logger log = LoggerFactory.getLogger(Dao.class);
	
	public Connection getConnect(){
		Connection conn = null;
		try {
			conn = ds.getConnection();
			log.info("Connection 객체 '" + conn + "'");
			
		} catch (SQLException e) {
			log.info(e.toString());
		}
		return conn;
	}
	
	public String getTest() throws Exception{
		Connection conn = getConnect();
		
		String sql = "select username from user where uuid=1";
		PreparedStatement pstmt;
		String result = "";
		
		pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();
		
		try(conn;pstmt;rs){
			while(rs.next()) {
				result = rs.getString("username");
			}
		}
		return result;
	}

	/**
	 * 회사 정보 얻는 메소드
  */
	public List<CorpData> getCorp() throws Exception{
		
		List<CorpData> lcd = new ArrayList<>();
		Connection conn = getConnect();
	
		PreparedStatement pstmt;
	
		String sql = "SELECT * FROM corp";
		pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();

		try(conn; pstmt; rs){
			while(rs.next()){
				CorpData cd = new CorpData();
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

				lcd.add(cd);
			}
			return lcd;
		}
	}

	
	public List<Double> getGeo(String address){
		String REST_KEY = "KakaoAK 50bbb5205dc8fcc9c2611542015a54d5";
		String addr = address;
		KakaoGeoRes bodyJson = null;
		List<Double> result = new ArrayList<>();
		try {
			String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json?&query=" + URLEncoder.encode(addr, "UTF-8");
			
			HttpResponse<kong.unirest.JsonNode> response = Unirest.get(apiUrl)
			.header("Authorization", REST_KEY)
			.asJson();

			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);

			bodyJson = mapper.readValue(response.getBody().toString(), KakaoGeoRes.class);
			result.add(bodyJson.getDocuments().get(0).getX());
			result.add(bodyJson.getDocuments().get(0).getY());

		} catch (Exception e) {
			log.info(e.toString());
		}
		
		return result;
	}
}
