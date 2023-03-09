package com.assj;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class TestController {
	
	private User user;
	
	@Autowired
	public TestController(User user) {
		this.user = user;
	}
	
	@GetMapping("/api/user")
	public String showResult() {
		ConnTest ct = new ConnTest();
		String result = "";
		try {
			result = ct.getTest();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@GetMapping("/api/getData")
	public void getData(){
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> map = new HashMap<>();

		restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
		String url = "https://openapi.work.go.kr/opi/opi/opia/wantedApi.do?"
		+"authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=10&region=11000";
		String response = restTemplate.getForObject(url, String.class);
	
		JSONObject jobj = XML.toJSONObject(response);
		jobj = jobj.getJSONObject("wantedRoot");
		JSONArray result = jobj.getJSONArray("wanted");
		// System.out.println(result.get(1));
		// System.out.println(result.length());
		ObjectMapper om = new ObjectMapper();
		CorpData cpl = om.convertValue(jobj.toMap(), CorpData.class);
		System.out.println(cpl.toString());
	}
}
