package com.assj;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.ArrayList;

public class Dao {
	
	final RootConfig cf = new RootConfig();
	
	@Autowired
	final DataSource ds = cf.datasource();
	
	private static Logger log = LoggerFactory.getLogger(Dao.class);
	
	public Connection getConnect(){
		Connection conn = null;
		try {
			conn = ds.getConnection();
			log.info("Connection 객체 '" + conn + "'");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

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
	 * @param addr 회사 지역 (구 단위)
	 * @param job 직업코드
	 * @return 회사정보 
	 */
	public List<CorpData> getCorp(String addr, String job) throws Exception{
		
		List<CorpData> lcd = new ArrayList<>();
		Connection conn = getConnect();
		
		String address = "";
		PreparedStatement pstmt;
		switch(addr){
			case "gangnam":
				address = "강남구";
			break;
		}

		String sql = "SELECT * FROM corp WHERE basicAddr LIKE '%" + address + "%'";
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

				lcd.add(cd);
			}
			return lcd;
		}
		
	}

	/*
	 * 워크넷 API 요청하여 자동으로 DB에 넣어주는 메서드
	 */
	// public void setCoprData() throws Exception{
	// 	Connection conn = getConnect();
	// 	RestTemplate restTemplate = new RestTemplate();
	// 	CorpData cd = new CorpData();
	// 	/* 최초 페이지 수를 얻기 위해 1개만을 API 요청하는 조건의 URL  */
	// 	String url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
	// 	+"authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=1&region=11000";
	// 	String sql = "";
	// 	PreparedStatement pstmt = null;
	// 	JSONObject jobj = new JSONObject(); // 1depth 제이슨 오브젝트 
	// 	JSONObject robj = new JSONObject(); // 2depth 제이슨 오브젝트 
	// 	JSONArray result = new JSONArray(); // 결과값으로 내줄 제이슨 어레이 
	// 	String response = restTemplate.getForObject(url, String.class);
	// 	jobj = XML.toJSONObject(response);
	// 	jobj = jobj.getJSONObject("wantedRoot");
	// 	// 1 페이지에 최대 100개를 불러올 수 있고 페이지수는 총 개수에서 100을 나눈것에 1을 더한 값  
	// 	int pageNum = jobj.getInt("total") / 100 + 1; 

	// 	restTemplate.getMessageConverters()
  //       .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
		
	// 	for(int i = 1; i <= pageNum; i++){
	// 		url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
	// 		+"authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage="+i+"&display=100&region=11000";
	// 		response = restTemplate.getForObject(url, String.class);
		
	// 		jobj = XML.toJSONObject(response);
	// 		jobj = jobj.getJSONObject("wantedRoot");
	// 		result = jobj.getJSONArray("wanted");

	// 		for(int j = 0; j < result.length(); j++){
	// 			robj = (JSONObject)result.get(j);
				
	// 			cd.setCompany(robj.get("company").toString());
	// 			cd.setCareer(robj.get("career").toString());
	// 			cd.setTitle(robj.get("title").toString());
	// 			cd.setSalTpNm(robj.get("salTpNm").toString());
	// 			cd.setSal(robj.get("sal").toString());
	// 			cd.setMinSal(robj.get("minSal").toString());
	// 			cd.setMaxSal(robj.get("maxSal").toString());
	// 			cd.setRegion(robj.get("region").toString());
	// 			cd.setHolidayTpNm(robj.get("holidayTpNm").toString());
	// 			cd.setMinEdubg(robj.get("minEdubg").toString());
	// 			cd.setRegDt(robj.get("regDt").toString());
	// 			cd.setCloseDt(robj.get("closeDt").toString());
	// 			cd.setInfoSvc(robj.get("infoSvc").toString());
	// 			cd.setWantedInfoUrl(robj.get("wantedInfoUrl").toString());
	// 			cd.setWantedMobileInfoUrl(robj.get("wantedMobileInfoUrl").toString());
	// 			cd.setSmodifyDtm(robj.get("smodifyDtm").toString());
	// 			cd.setZipCd(robj.get("zipCd").toString());
	// 			cd.setStrtnmCd(robj.get("strtnmCd").toString());
	// 			cd.setBasicAddr(robj.get("basicAddr").toString());
	// 			cd.setDetailAddr(robj.get("detailAddr").toString());
	// 			cd.setEmpTpCd(robj.get("empTpCd").toString());
	// 			cd.setJobsCd(robj.get("jobsCd").toString());
				
	// 			sql = "insert into corp(title, salTpNm, sal, minSal, maxSal, region, holidayTpNm, minEdubg,"+
	// 			"career, regDt, closeDt, infoSvc, wantedInfoUrl, wantedMobileInfoUrl, smodifyDtm, zipCd, strtnmCd, basicAddr,"+
	// 			"detailAddr, empTpCd, jobsCd, company) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	// 			pstmt = conn.prepareStatement(sql);
	
	// 			pstmt.setString(1, cd.getTitle());
	// 			pstmt.setString(2, cd.getSalTpNm());
	// 			pstmt.setString(3, cd.getSal());
	// 			pstmt.setString(4, cd.getMinSal());
	// 			pstmt.setString(5, cd.getMaxSal());
	// 			pstmt.setString(6, cd.getRegion());
	// 			pstmt.setString(7, cd.getHolidayTpNm());
	// 			pstmt.setString(8, cd.getMinEdubg());
	// 			pstmt.setString(9, cd.getCareer());
	// 			pstmt.setString(10, cd.getRegDt());
	// 			pstmt.setString(11, cd.getCloseDt());
	// 			pstmt.setString(12, cd.getInfoSvc());
	// 			pstmt.setString(13, cd.getWantedInfoUrl());
	// 			pstmt.setString(14, cd.getWantedMobileInfoUrl());
	// 			pstmt.setString(15, cd.getSmodifyDtm());
	// 			pstmt.setString(16, cd.getZipCd());
	// 			pstmt.setString(17, cd.getStrtnmCd());
	// 			pstmt.setString(18, cd.getBasicAddr());
	// 			pstmt.setString(19, cd.getDetailAddr());
	// 			pstmt.setString(20, cd.getEmpTpCd());
	// 			pstmt.setString(21, cd.getJobsCd());
	// 			pstmt.setString(22, cd.getCompany());
				
	// 			if (pstmt.executeUpdate() == 0) {
	// 				throw new Exception("회사DB추가에러");
	// 			}
	// 			pstmt.close();
	// 		}
	// 	 }
	// 	 conn.close();
	//  }
}
