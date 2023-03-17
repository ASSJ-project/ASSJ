package com.assj;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.assj.domain.company.startfulldao;
import com.assj.utils.JwtToken;


@RestController
public class ApiController {
	final startfulldao ex;
	final Dao dao;

	public ApiController(){
		dao = new Dao();
		ex = new startfulldao();
	}

	@GetMapping("/api/user")
	public String showResult() {
		Dao ct = new Dao();
		String result = "";
		try {
			result = ct.getTest();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@GetMapping("/api/getCorpData")
	public String getCorpData(){
		List<CorpData> lcd = new ArrayList<>();
		String json = null;
	
		try {
			lcd = dao.getCorp();
			json = new Gson().toJson(lcd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

	@GetMapping("/api/getGeo/{address}")
	public List<Double> getGeo(@PathVariable("address") String address){
		List<Double> obj = dao.getGeo(address);
		
		return obj;
	}

	// @GetMapping("/api/setCorpData")
	// public void setCorpData(){
	// 	try {
	// 		dao.setCorpData();
	// 	} catch (Exception e) {
	// 		e.printStackTrace();
	// 	}
	// }

	@PostMapping("/api/login.do")
	public String login(@RequestBody User user){
		JwtToken jt = new JwtToken();
		System.out.println(user);
		String token = jt.createJwtToken(user);

		return token;
	}
}
