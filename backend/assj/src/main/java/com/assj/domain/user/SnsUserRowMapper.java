package com.assj.domain.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;

import com.assj.dto.SnsUser;

public class SnsUserRowMapper implements RowMapper<SnsUser> {

  @Override
  @Nullable
  public SnsUser mapRow(ResultSet rs, int rowNum) throws SQLException {
    SnsUser myObject = new SnsUser();
    myObject.setUuid(rs.getLong("uuid"));
    myObject.setUserId(rs.getString("userid"));
    myObject.setRegDate(rs.getDate("reg_date"));
    myObject.setRole(rs.getInt("role"));
    return myObject;
  }

}
