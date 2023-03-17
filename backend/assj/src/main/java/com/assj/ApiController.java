package com.assj;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.assj.domain.company.startfulldao;
import com.assj.utils.JwtToken;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
public class ApiController {
	final startfulldao ex;
	final Dao dao;
	private static Logger log;

	@Autowired
	private PasswordEncoder passwordEncoder; // 패스워드 인코더 

	public ApiController(){
		dao = new Dao();
		ex = new startfulldao();
		log = LoggerFactory.getLogger(Dao.class);
	}

	/**
	 * 회사 데이터 전체
	 */
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

	/**
	 * 주소로부터 좌표를 얻어옴
	 */
	@GetMapping("/api/getGeo/{address}")
	public List<Double> getGeo(@PathVariable("address") String address){
		List<Double> obj = dao.getGeo(address);
		
		return obj;
	}

	/**
	 * 로그인 시도
	 */
	@PostMapping("/api/login.do")
	public String login(@RequestBody User user){
		System.out.println(user);
		try {
			if(!dao.checkEmail(user.getEmail())) return "failed";
			else{
				String hashPassWord = passwordEncoder.encode(user.getPassword());
				user.setPassword(hashPassWord);
				if(dao.checkPassword(user)){
					JwtToken jt = new JwtToken();
					System.out.println(user);
					String token = jt.createJwtToken(user);
					return token;
				} 
			}
		} catch (Exception e) {
			log.info(e.toString());
		}
		return "failed";
	}

	/**
	 * 회원가입 시도
	 */
	@PostMapping("/api/register.do")
	public Boolean register(@RequestBody User user){
		try {
			// DB에 회원 가입을 시도한 유저가 존재하지 않음 
			if(!dao.checkEmail(user.getEmail())){
				String hashPassWord = passwordEncoder.encode(user.getPassword());
				user.setPassword(hashPassWord);
				dao.addUser(user);
				return true;
			}else{
				return false;
			}
		} catch (Exception e) {
			log.info(e.toString());
		}
		return false;
	}

		// @GetMapping("/api/setCorpData")
	// public void setCorpData(){
	// 	try {
	// 		dao.setCorpData();
	// 	} catch (Exception e) {
	// 		e.printStackTrace();
	// 	}
	// }
}
