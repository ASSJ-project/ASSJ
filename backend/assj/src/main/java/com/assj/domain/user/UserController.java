package com.assj.domain.user;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.secret-key}")
    private String secretKey;

    private final Long expiredMs = 1000 * 60 * 60 * 3l;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @PostMapping("/login.do")
	public ResponseEntity<String> login(@RequestBody User user){
        try {
            if(userService.checkEmail(user.getUserEmail())){
                if(userService.checkPassword(user)){
                String token = JwtToken.createJwt(user.getUserEmail(), secretKey, expiredMs);

                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setLocation(null);
                responseHeaders.set("login","ok");

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
                String hashPassWord = passwordEncoder.encode(user.getUserPassword());
                user.setUserPassword(hashPassWord);
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
}
