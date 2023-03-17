package com.assj.domain.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User myObject = new User();
        myObject.setId(rs.getLong("id"));
        myObject.setUserEmail(rs.getString("user_email"));
        myObject.setUserPassword(rs.getLong("user_password"));
        myObject.setRegDate(rs.getDate("reg_date"));
        myObject.setUserAddress(rs.getString("user_address"));
        return myObject;
    }
}
