package com.assj.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import com.assj.utils.KakaoGeoRes;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;

import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class CompanyService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 회사 전체 데이터
     */
    public List<Company> getAllCompanies() {
        String sql = "SELECT * FROM corp";
        List<Company> companies = jdbcTemplate.query(sql, new CompanyRowMapper());
        return companies;
    }

    /**
     * 주소 좌표 호출
     */
    public List<Double> getGeo(String address) {
        String REST_KEY = "KakaoAK 50bbb5205dc8fcc9c2611542015a54d5";
        String addr = address;
        KakaoGeoRes bodyJson = null;
        List<Double> result = new ArrayList<>();
        try {
            String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json?&query="
                    + URLEncoder.encode(addr, "UTF-8");

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

    /**
     * 회사 전체 데이터 DB 삽입
     */
    public void initializeCompanyData() throws Exception {
        Connection conn = jdbcTemplate.getDataSource().getConnection();
        RestTemplate restTemplate = new RestTemplate();
        Company cd = new Company();
        /* 최초 페이지 수를 얻기 위해 1개만을 API 요청하는 조건의 URL */
        String url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
                + "authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=1&region=11000";
        String sql = "";
        PreparedStatement pstmt = null;
        int updateCount = 0;

        JSONObject jobj = new JSONObject(); // 1depth 제이슨 오브젝트
        JSONObject robj = new JSONObject(); // 2depth 제이슨 오브젝트
        JSONArray result = new JSONArray(); // 제이슨 어레이로 만든 결과값
        String response = restTemplate.getForObject(url, String.class);
        jobj = XML.toJSONObject(response);
        jobj = jobj.getJSONObject("wantedRoot");
        // 1 페이지에 최대 100개를 불러올 수 있고 페이지수는 총 개수에서 100을 나눈것에 1을 더한 값
        int pageNum = jobj.getInt("total") / 100 + 1;
        // utf-8 컨버팅
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        for (int i = 1; i <= pageNum; i++) {
            url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
                    + "authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=" + i
                    + "&display=100&region=11000";
            response = restTemplate.getForObject(url, String.class);

            result = XML.toJSONObject(response).getJSONObject("wantedRoot").getJSONArray("wanted");

            for (int j = 0; j < result.length(); j++) {
                robj = (JSONObject) result.get(j);

                cd.setCompany(robj.get("company").toString());
                cd.setCareer(robj.get("career").toString());
                cd.setTitle(robj.get("title").toString());
                cd.setSalTpNm(robj.get("salTpNm").toString());
                cd.setSal(robj.get("sal").toString());
                cd.setMinSal(robj.get("minSal").toString());
                cd.setMaxSal(robj.get("maxSal").toString());
                cd.setRegion(robj.get("region").toString());
                cd.setHolidayTpNm(robj.get("holidayTpNm").toString());
                cd.setMinEdubg(robj.get("minEdubg").toString());
                cd.setRegDt(robj.get("regDt").toString());
                cd.setCloseDt(robj.get("closeDt").toString());
                cd.setInfoSvc(robj.get("infoSvc").toString());
                cd.setWantedInfoUrl(robj.get("wantedInfoUrl").toString());
                cd.setWantedMobileInfoUrl(robj.get("wantedMobileInfoUrl").toString());
                cd.setSmodifyDtm(robj.get("smodifyDtm").toString());
                cd.setZipCd(robj.get("zipCd").toString());
                cd.setStrtnmCd(robj.get("strtnmCd").toString());
                cd.setBasicAddr(robj.get("basicAddr").toString());
                cd.setDetailAddr(robj.get("detailAddr").toString());
                cd.setEmpTpCd(robj.get("empTpCd").toString());
                cd.setJobsCd(robj.get("jobsCd").toString());
                if (!getGeo(cd.getBasicAddr()).isEmpty()) {
                    cd.setX(getGeo(cd.getBasicAddr()).get(0).toString());
                    cd.setY(getGeo(cd.getBasicAddr()).get(1).toString());
                } else
                    continue;

                sql = "insert into corp(coprid, title, salTpNm, sal, minSal, maxSal, region, holidayTpNm, minEdubg," +
                        "career, regDt, closeDt, infoSvc, wantedInfoUrl, wantedMobileInfoUrl, smodifyDtm, zipCd, strtnmCd, basicAddr,"
                        +
                        "detailAddr, empTpCd, jobsCd, company, x, y) values(DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                pstmt = conn.prepareStatement(sql);

                pstmt.setString(1, cd.getTitle());
                pstmt.setString(2, cd.getSalTpNm());
                pstmt.setString(3, cd.getSal());
                pstmt.setString(4, cd.getMinSal());
                pstmt.setString(5, cd.getMaxSal());
                pstmt.setString(6, cd.getRegion());
                pstmt.setString(7, cd.getHolidayTpNm());
                pstmt.setString(8, cd.getMinEdubg());
                pstmt.setString(9, cd.getCareer());
                pstmt.setString(10, cd.getRegDt());
                pstmt.setString(11, cd.getCloseDt());
                pstmt.setString(12, cd.getInfoSvc());
                pstmt.setString(13, cd.getWantedInfoUrl());
                pstmt.setString(14, cd.getWantedMobileInfoUrl());
                pstmt.setString(15, cd.getSmodifyDtm());
                pstmt.setString(16, cd.getZipCd());
                pstmt.setString(17, cd.getStrtnmCd());
                pstmt.setString(18, cd.getBasicAddr());
                pstmt.setString(19, cd.getDetailAddr());
                pstmt.setString(20, cd.getEmpTpCd());
                pstmt.setString(21, cd.getJobsCd());
                pstmt.setString(22, cd.getCompany());
                pstmt.setString(23, cd.getX());
                pstmt.setString(24, cd.getY());

                if (pstmt.executeUpdate() == 0) {
                    throw new Exception("회사DB추가에러");
                } else {
                    updateCount++;
                }
                pstmt.close();
            }
        }
        log.info(updateCount + "건 회사 DB 업데이트 완료");
        conn.close();
    }

    /*
     * 워크넷 API 요청하여 오늘 날짜 자동으로 DB 업데이트 메소드
     */
    @Scheduled(cron = " 0 10 10 * * *")
    public void setCorpData() throws Exception {
        Connection conn = jdbcTemplate.getDataSource().getConnection();
        RestTemplate restTemplate = new RestTemplate();
        Company cd = new Company();
        /* 최초 페이지 수를 얻기 위해 1개만을 API 요청하는 조건의 URL */
        String url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
                + "authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=1&region=11000&regDate=D-0";
        String sql = "";
        PreparedStatement pstmt = null;
        int updateCount = 0;

        JSONObject jobj = new JSONObject(); // 1depth 제이슨 오브젝트
        JSONObject robj = new JSONObject(); // 2depth 제이슨 오브젝트
        JSONArray result = new JSONArray(); // 제이슨 어레이로 만든 결과값
        String response = restTemplate.getForObject(url, String.class);
        jobj = XML.toJSONObject(response);
        jobj = jobj.getJSONObject("wantedRoot");
        // 1 페이지에 최대 100개를 불러올 수 있고 페이지수는 총 개수에서 100을 나눈것에 1을 더한 값
        int pageNum = jobj.getInt("total") / 100 + 1;
        // utf-8 컨버팅
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        for (int i = 1; i <= pageNum; i++) {
            url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
                    + "authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=" + i
                    + "&display=100&region=11000&regDate=D-0";
            response = restTemplate.getForObject(url, String.class);

            result = XML.toJSONObject(response).getJSONObject("wantedRoot").getJSONArray("wanted");

            for (int j = 0; j < result.length(); j++) {
                robj = (JSONObject) result.get(j);

                cd.setCompany(robj.get("company").toString());
                cd.setCareer(robj.get("career").toString());
                cd.setTitle(robj.get("title").toString());
                cd.setSalTpNm(robj.get("salTpNm").toString());
                cd.setSal(robj.get("sal").toString());
                cd.setMinSal(robj.get("minSal").toString());
                cd.setMaxSal(robj.get("maxSal").toString());
                cd.setRegion(robj.get("region").toString());
                cd.setHolidayTpNm(robj.get("holidayTpNm").toString());
                cd.setMinEdubg(robj.get("minEdubg").toString());
                cd.setRegDt(robj.get("regDt").toString());
                cd.setCloseDt(robj.get("closeDt").toString());
                cd.setInfoSvc(robj.get("infoSvc").toString());
                cd.setWantedInfoUrl(robj.get("wantedInfoUrl").toString());
                cd.setWantedMobileInfoUrl(robj.get("wantedMobileInfoUrl").toString());
                cd.setSmodifyDtm(robj.get("smodifyDtm").toString());
                cd.setZipCd(robj.get("zipCd").toString());
                cd.setStrtnmCd(robj.get("strtnmCd").toString());
                cd.setBasicAddr(robj.get("basicAddr").toString());
                cd.setDetailAddr(robj.get("detailAddr").toString());
                cd.setEmpTpCd(robj.get("empTpCd").toString());
                cd.setJobsCd(robj.get("jobsCd").toString());
                if (!getGeo(cd.getBasicAddr()).isEmpty()) {
                    cd.setX(getGeo(cd.getBasicAddr()).get(0).toString());
                    cd.setY(getGeo(cd.getBasicAddr()).get(1).toString());
                } else
                    continue;

                sql = "insert into corp(title, salTpNm, sal, minSal, maxSal, region, holidayTpNm, minEdubg," +
                        "career, regDt, closeDt, infoSvc, wantedInfoUrl, wantedMobileInfoUrl, smodifyDtm, zipCd, strtnmCd, basicAddr,"
                        +
                        "detailAddr, empTpCd, jobsCd, company, x, y) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                pstmt = conn.prepareStatement(sql);

                pstmt.setString(1, cd.getTitle());
                pstmt.setString(2, cd.getSalTpNm());
                pstmt.setString(3, cd.getSal());
                pstmt.setString(4, cd.getMinSal());
                pstmt.setString(5, cd.getMaxSal());
                pstmt.setString(6, cd.getRegion());
                pstmt.setString(7, cd.getHolidayTpNm());
                pstmt.setString(8, cd.getMinEdubg());
                pstmt.setString(9, cd.getCareer());
                pstmt.setString(10, cd.getRegDt());
                pstmt.setString(11, cd.getCloseDt());
                pstmt.setString(12, cd.getInfoSvc());
                pstmt.setString(13, cd.getWantedInfoUrl());
                pstmt.setString(14, cd.getWantedMobileInfoUrl());
                pstmt.setString(15, cd.getSmodifyDtm());
                pstmt.setString(16, cd.getZipCd());
                pstmt.setString(17, cd.getStrtnmCd());
                pstmt.setString(18, cd.getBasicAddr());
                pstmt.setString(19, cd.getDetailAddr());
                pstmt.setString(20, cd.getEmpTpCd());
                pstmt.setString(21, cd.getJobsCd());
                pstmt.setString(22, cd.getCompany());
                pstmt.setString(23, cd.getX());
                pstmt.setString(24, cd.getY());

                if (pstmt.executeUpdate() == 0) {
                    throw new Exception("회사DB추가에러");
                } else {
                    updateCount++;
                }
                pstmt.close();
            }
        }
        log.info(updateCount + "건 회사 DB 업데이트 완료");
        conn.close();
    }

}