package com.assj.domain.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @PostMapping("/login.do")
	public String login(@RequestBody User user){
		System.out.println(user);

        try {
            if(userService.checkEmail(user.getUserEmail())){
                if(userService.checkPassword(user)){
                JwtToken jt = new JwtToken();
                System.out.println(user);
                String token = jt.createJwtToken(user);
                return token;
            }
            else return null;
        }else return null;
                
        } catch (Exception e) {
            log.info(e.toString());
        }
            return null;
    } 

    @PostMapping("/register.do")
    public void register(@RequestBody User user){
        try {
            if(!userService.checkEmail(user.getUserEmail())){
                String hashPassWord = passwordEncoder.encode(user.getUserPassword());
                user.setUserPassword(hashPassWord);
                userService.addUser(user);
                log.info("회원가입 성공");
            }
            else log.info("유저가 DB에 존재합니다");
        } catch (Exception e) {
            log.info(e.toString());
        }
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
}
