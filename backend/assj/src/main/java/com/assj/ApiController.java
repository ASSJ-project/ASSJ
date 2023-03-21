package com.assj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.assj.domain.user.UserController;

@Controller
public class ApiController {

// 	@Autowired
// 	UserController userController;

// 	@GetMapping("/")
//   public String root(){
//     return "";
//   }

	// @PostMapping("/user")
	// public String loginApi(@RequestBody User user){
	// 	return userController.login(user);
	// }

	/**
	 * 주소로부터 좌표를 얻어옴
	 */
	// @GetMapping("/api/getGeo/{address}")
	// public List<Double> getGeo(@PathVariable("address") String address){
	// 	List<Double> obj = dao.getGeo(address);
		
	// 	return obj;
	// }


		// @GetMapping("/api/setCorpData")
	// public void setCorpData(){
	// 	try {
	// 		dao.setCorpData();
	// 	} catch (Exception e) {
	// 		e.printStackTrace();
	// 	}
	// }
}
