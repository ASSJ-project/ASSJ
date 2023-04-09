package com.assj.domain.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assj.dto.SnsUser;
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
    public String login(@RequestBody User user, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        if (user.getUserEmail().isEmpty()) {
            return null;
        }

        if (userService.checkEmail(user.getUserEmail())) {
            if (userService.checkPassword(user)) {
                return userService.generateTokens(user.getUserEmail(), response, request, "user");
            }
        }
        return null;
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

    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'SNS')")
    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() {
        return new ResponseEntity<>(userService.getUser().get(0), HttpStatus.OK);
    }

    @PostMapping("/passwordChange.do")
    public int changePassword(@RequestBody User user) {
        return userService.passwordChange(user.getUserPassword(), user.getUserEmail());
    }

    @PostMapping("/snslogin.do")
    public String snsLogin(@RequestBody SnsUser user, HttpServletResponse response, HttpServletRequest request) {
        if (userService.checkEmailSns(user.getUserId())) {
            return userService.generateTokens(user.getUserId(), response, request,
                    "sns_user");
        } else
            return null;
    }

    @PostMapping("/snsregister.do")
    public Boolean snsRegister(@RequestBody SnsUser user) {
        try {
            userService.addSnsUser(user.getUserId());
            return true;
        } catch (DataAccessException e) {
            log.warn(e.getMessage());
            return false;
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/deleteUser")
    public Boolean deleteUser(HttpServletRequest request) {
        User user = new User();
        user.setUserEmail(request.getHeader("userEmail"));
        user.setUserPassword(request.getHeader("userPassword"));

        try {
            if (userService.checkEmail(user.getUserEmail())) {
                if (userService.checkPassword(user)) {
                    if (userService.deleteUser(user) > 0)
                        return true;
                    else
                        return false;
                }
            } else
                return false;

        } catch (DataAccessException e) {
            log.error(e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return false;
    }
}
