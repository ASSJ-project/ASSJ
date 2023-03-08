package com.assj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class TestController {
	
	private User user;
	
	@Autowired
	public TestController(User user) {
		this.user = user;
	}
	
	@GetMapping("")
	public String showResult() {
		ConnTest ct = new ConnTest();
		String result = "";
		try {
			result = ct.getTest();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
