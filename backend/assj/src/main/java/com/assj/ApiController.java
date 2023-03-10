package com.assj;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
	final Dao dao ;

	public ApiController(){
		dao = new Dao();
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

	@GetMapping("/api/setCorpData")
	public void setCorpData(){
		try {
			dao.setCoprData();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("/api/getCorpData/address={address}/jobsCode={jobsCode}")
	public List<CorpData> getCorpData(@PathVariable("address") String addr, @PathVariable("jobsCode") String job){
		List<CorpData> lcd = new ArrayList<>();
		try {
			lcd = dao.getCorp(addr, job);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lcd;
	}
}
