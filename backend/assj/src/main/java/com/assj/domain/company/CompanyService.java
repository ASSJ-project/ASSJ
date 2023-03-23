package com.assj.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Iterator;
import java.nio.charset.Charset;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
        String sql = "SELECT * FROM company";
        List<Company> companies = jdbcTemplate.query(sql, new CompanyRowMapper());
        return companies;
    }

    /**
     * 주소 좌표 호출
     */
    public List<Double> callCoordinatesApi(String queryParam) {
        // api 호출
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", Constants.KAKAO_API_KEY);

        HttpEntity<String> request = new HttpEntity<>(headers);

        String url = "https://dapi.kakao.com/v2/local/search/address.json";

        ResponseEntity<String> response = restTemplate.exchange(url + "?query=" + queryParam,
                HttpMethod.GET,
                request,
                String.class);

        // JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = null;
        List<Double> coordinates = new ArrayList<>();
        try {
            String responseBody = response.getBody();
            if (responseBody != null && !responseBody.isEmpty()) {
                rootNode = objectMapper.readTree(responseBody);
            }
        } catch (JsonProcessingException e) {
            log.info(e.toString());
        }
        if (rootNode != null) {
            JsonNode documentsNode = rootNode.path("documents");
            if (documentsNode.isArray()) {
                Iterator<JsonNode> iterator = documentsNode.elements();
                while (iterator.hasNext()) {
                    JsonNode documentNode = iterator.next();
                    JsonNode xNode = documentNode.path("x");
                    JsonNode yNode = documentNode.path("y");
                    if (!xNode.isMissingNode() && !yNode.isMissingNode()) {
                        coordinates.add(xNode.asDouble());
                        coordinates.add(yNode.asDouble());
                    }
                }
            }
        }
        return coordinates;
    }

    public void initializeCompanyData() {
        int pageNum = 0;
        String url, xmlString = "";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        String urlTemplate = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=%s&callTp=L&returnType=XML&startPage=%d&display=1&region=11000";
        while (true) {
            pageNum++;
            url = String.format(urlTemplate, Constants.WORKNET_API_KEY, pageNum);
            xmlString = restTemplate.getForObject(url, String.class);
            if (!XML.toJSONObject(xmlString).getJSONObject("wantedRoot").has("wanted")) {
                break;
            }
            JSONObject jsonObject = XML.toJSONObject(xmlString).getJSONObject("wantedRoot").getJSONObject("wanted");
            List<Double> geo = callCoordinatesApi(jsonObject.get("basicAddr").toString());
            if (!geo.isEmpty()) {
                Object[] params = new Object[] {
                        jsonObject.get("company").toString(),
                        jsonObject.get("title").toString(),
                        jsonObject.get("salTpNm").toString(),
                        jsonObject.get("sal").toString(),
                        jsonObject.get("minSal").toString(),
                        jsonObject.get("maxSal").toString(),
                        jsonObject.get("region").toString(),
                        jsonObject.get("holidayTpNm").toString(),
                        jsonObject.get("minEdubg").toString(),
                        jsonObject.get("career").toString(),
                        jsonObject.get("regDt").toString(),
                        jsonObject.get("closeDt").toString(),
                        jsonObject.get("zipCd").toString(),
                        jsonObject.get("strtnmCd").toString(),
                        jsonObject.get("basicAddr").toString(),
                        jsonObject.get("detailAddr").toString(),
                        jsonObject.get("empTpCd").toString(),
                        jsonObject.get("jobsCd").toString(),
                        geo.get(0),
                        geo.get(1)
                };
                jdbcTemplate.update(Constants.INSERT_INTO_COMPANY_SQL, params);
                log.info("pageNum: {}", pageNum);
            } else {
                log.error("geo 값이 없어서 데이터를 삽입하지 않습니다. ");
                continue;
            }
        }
        log.info("출력완료");
    }

    @Scheduled(cron = "0 36 10 * * ?")
    public void addTodayCompanyData() {
        int pageNum = 0;
        String url, xmlString = "";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        String urlTemplate = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=%s&callTp=L&returnType=XML&startPage=%d&display=1&region=11000&regDate=D-0";
        while (true) {
            pageNum++;
            url = String.format(urlTemplate, Constants.WORKNET_API_KEY, pageNum);
            xmlString = restTemplate.getForObject(url, String.class);
            if (!XML.toJSONObject(xmlString).getJSONObject("wantedRoot").has("wanted")) {
                break;
            }
            JSONObject jsonObject = XML.toJSONObject(xmlString).getJSONObject("wantedRoot").getJSONObject("wanted");
            List<Double> geo = callCoordinatesApi(jsonObject.get("basicAddr").toString());
            if (!geo.isEmpty()) {
                Object[] params = new Object[] {
                        jsonObject.get("company").toString(),
                        jsonObject.get("title").toString(),
                        jsonObject.get("salTpNm").toString(),
                        jsonObject.get("sal").toString(),
                        jsonObject.get("minSal").toString(),
                        jsonObject.get("maxSal").toString(),
                        jsonObject.get("region").toString(),
                        jsonObject.get("holidayTpNm").toString(),
                        jsonObject.get("minEdubg").toString(),
                        jsonObject.get("career").toString(),
                        jsonObject.get("regDt").toString(),
                        jsonObject.get("closeDt").toString(),
                        jsonObject.get("zipCd").toString(),
                        jsonObject.get("strtnmCd").toString(),
                        jsonObject.get("basicAddr").toString(),
                        jsonObject.get("detailAddr").toString(),
                        jsonObject.get("empTpCd").toString(),
                        jsonObject.get("jobsCd").toString(),
                        geo.get(0),
                        geo.get(1)
                };
                jdbcTemplate.update(Constants.INSERT_INTO_COMPANY_SQL, params);
                log.info("pageNum: {}", pageNum);
            } else {
                log.error("geo 값이 없어서 데이터를 삽입하지 않습니다. ");
                continue;
            }
        }
        log.info("출력완료");
    }
}
