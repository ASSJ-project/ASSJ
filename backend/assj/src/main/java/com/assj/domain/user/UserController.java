package com.assj.domain.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assj.dto.User;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
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

    @PostMapping("/login.do")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) throws Exception {

        if (userService.checkEmail(user.getUserEmail())) {
            if (userService.checkPassword(user)) {
                return ResponseEntity.ok().body(userService.generateTokens(user.getUserEmail()));
            } else {
                return ResponseEntity.badRequest()
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

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(Authentication authentication) {
        return new ResponseEntity<>(userService.getUser(authentication.getName()).get(0), HttpStatus.OK);
    }

    @PostMapping("/passwordChange.do")
    public int changePassword(@RequestBody User user) {
        return userService.passwordChange(user.getUserPassword(), user.getUserEmail());
    }
}
