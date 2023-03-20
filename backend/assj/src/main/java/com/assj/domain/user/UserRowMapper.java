package com.assj.domain.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;

public class UserRowMapper implements RowMapper<User> {
    @Override
    @Nullable
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User myObject = new User();
        myObject.setUuid(rs.getLong("uuid"));
        myObject.setUserEmail(rs.getString("email"));
        myObject.setUserPassword(rs.getString("password"));
        myObject.setRegDate(rs.getDate("reg_date"));
        myObject.setUserAddress(rs.getString("user_address"));
        return myObject;
    }
}
