package com.assj.domain.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM user";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
        return users;
    }
}
