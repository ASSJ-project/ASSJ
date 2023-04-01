package com.assj.domain.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assj.dto.User;
import com.assj.utils.JwtToken;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Value("${jwt.secret-key}")
    private String secretKey; // application.properties 에 있는 시크릿 키

    private final Long expiredMs = 1000 * 60 * 60 * 3l; // access_token 만료시간 (현재 3시간)

    /**
     * 유저를 페이지당 가져오는 메소드 
     * @param page 보여주고자 하는 페이지 
     * @param limit 페이지당 보고싶은 숫자
     */
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllUsers(@RequestParam int page, @RequestParam int limit) {
        // 페이지당 리미트 개수 만큼만 가져온 유저 목록 
        List<User> users = userService.getUsers(limit, page);
        // 유저 테이블 전체 유저 숫자
        int count = userService.getUserCount();
        Map<String, Object> result = new HashMap<>();
        result.put("user_list", users);
        result.put("count", count);
        return ResponseEntity.ok().body(result);
    }

    /**
     * 로그인 시도 컨트롤러
     * 
     * @param user RequestBody로 전달된 유저 정보
     * @return 로그인 성공시 : JWT, 로그인 실패 시 :
     * @throws Exception
     * @throws DataAccessException
     */
    @PostMapping("/login.do")
    public ResponseEntity<String> login(@RequestBody User user) throws Exception {

        if (userService.checkEmail(user.getUserEmail())) {
            if (userService.checkPassword(user)) {
                // 유저의 이메일, 시크릿 키, 만료시간을 토큰 생성 메소드로 넘겨줌
                return ResponseEntity.ok()
                        .header("login", "success")
                        .body(JwtToken.createJwt(user.getUserEmail(), secretKey, expiredMs));
            } else {
                return ResponseEntity.ok()
                        .header("login", "fail : User not exist").build();
            }
        }
        return ResponseEntity.noContent()
                .header("login", "fail : DB access failed").build();
    }

    @PostMapping("/register.do")
    public Boolean register(@RequestBody User user) {
        try {
            if (!userService.checkEmail(user.getUserEmail())) {
                userService.addUser(user);
                log.info("회원가입 성공");
                return true;
            } else {
                log.info("유저가 DB에 존재합니다");
                return false;
            }
        } catch (Exception e) {
            log.info(e.toString());
        }
        return false;
    }

    @PostMapping("/emailCheck.do")
    public Boolean emailCheck(@RequestBody User user) {
        try {
            return userService.checkEmail(user.getUserEmail());
        } catch (Exception e) {
            log.info(e.toString());
            return false;
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(Authentication authentication) {
        return new ResponseEntity<>(userService.getUser(authentication.getName()).get(0), HttpStatus.OK);
    }

    @PostMapping("/passwordChange.do")
    public int changePassword(@RequestBody User user) {
        return userService.passwordChange(user.getUserPassword(), user.getUserEmail());
    }
}
