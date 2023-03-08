package com.assj;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ConnTest {
	
	private RootConfig cf = new RootConfig();
	
	@Autowired
	private DataSource ds = cf.datasource();
	
	private static Logger log = LoggerFactory.getLogger(ConnTest.class);
	
	public Connection test(){
		Connection conn = null;
		try {
			conn = ds.getConnection();
			log.info("Connection 객체 '" + conn + "'");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
		return conn;
	}
	
	public String getTest() throws Exception{
		Connection conn = test();
		
		String sql = "select username from user where uuid=1";
		PreparedStatement pstmt;
		String result = "";
		
		pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();
		
		try(conn;pstmt;rs){
			while(rs.next()) {
				result = rs.getString("username");
			}
		}
		
		return result;
	}
}
