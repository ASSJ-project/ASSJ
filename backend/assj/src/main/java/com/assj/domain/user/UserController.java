package com.assj.domain.user;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.assj.utils.JwtToken;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value="/api/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Value("${jwt.secret-key}")
    private String secretKey; // application.properties 에 있는 시크릿 키 

    private final Long expiredMs = 1000 * 60 * 60 * 3l; // access_token 만료시간 (현재 3시간)

    /*
     * 모든 유저 얻는 메소드
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    /*
     * 로그인 메소드
     */
    @PostMapping("/login.do")
	public ResponseEntity<String> login(@RequestBody User user){
        try {
            if(userService.checkEmail(user.getUserEmail())){
                if(userService.checkPassword(user)){
                // 유저의 이메일, 시크릿 키, 만료시간을 토큰 생성 메소드로 넘겨줌
                String token = JwtToken.createJwt(user.getUserEmail(), secretKey, expiredMs);

                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setLocation(null);
                responseHeaders.set("login","ok");
                // Response 모양 만들어서 리턴
                return new ResponseEntity<>(token, responseHeaders, HttpStatus.OK);
            }
            else return null; // 적절한 리스폰스 조치 필요
        }else return null;
                
        } catch (Exception e) {
            log.info(e.toString());
        }
            return null;
    } 

    @PostMapping("/register.do")
    public Boolean register(@RequestBody User user){
        try {
            if(!userService.checkEmail(user.getUserEmail())){
                userService.addUser(user);
                log.info("회원가입 성공");
                return true;
            }
            else {
                log.info("유저가 DB에 존재합니다");
                return false;
            }
        } catch (Exception e) {
            log.info(e.toString());
        }
        return false;
    }

    @PostMapping("/emailCheck.do")
    public Boolean emailCheck(@RequestBody User user){
        try{
            return userService.checkEmail(user.getUserEmail());
        }
        catch(Exception e) {
            log.info(e.toString());
            return false;
        }
    }

    @GetMapping("/getUser")
    public User getUser(Authentication authentication){
        return userService.getUser(authentication.getName()).get(0);
    }
    
    @PostMapping("/passwordChange.do")
    public int changePassword(@RequestBody User user){
        return userService.passwordChange(user.getUserPassword(
        ), user.getUserEmail());
    }
}
