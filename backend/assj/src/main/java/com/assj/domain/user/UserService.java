package com.assj.domain.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

		@Autowired
		private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM user";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
				
        return users;
    }

		/**
		 * DB에 유저가 존재하는지 확인하는 메소드 
		 */
    public boolean checkEmail(String email) throws Exception{
			String sql = "select * from user where email = '"+ email + "'";
			List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
			
			return (users.isEmpty()) ? false : true;
		}

	/**
	 * 로그인 시도한 유저의 패스워드를 체크하는 메소드
	 */
	public boolean checkPassword(User user) throws Exception{

		String sql = "select * from user where email = '"+ user.getUserEmail() + "'";
		List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
		Boolean result = false;

		if(!users.isEmpty()){
			String inDbPassword = users.get(0).getUserPassword(); // db 에 저장된 패스워드
			String inputPassword = user.getUserPassword();
			result = passwordEncoder.matches(inputPassword, inDbPassword);
			return result;
		}else result = false;
		return result;
	}
	
	/**
	 * 회원가입 성공시 DB에 유저를 추가하는 메소드
	 */
	public int addUser(User user) throws DataAccessException{
		String sql = "Insert into user(email, password, address, name) values(?,?,?,?)";
		String hashPassWord = passwordEncoder.encode(user.getUserPassword());
		user.setUserPassword(hashPassWord);
		
		return jdbcTemplate.update(sql, user.getUserEmail(), user.getUserPassword(), 
			user.getUserAddress(), user.getUserName());

	}

	/**
	 * 회원 1명만 가져오는 메소드 
	 */
	public List<User> getUser(String userEmail) {
		String sql = "select * from user where email = " + userEmail;
		List<User> user = jdbcTemplate.query(sql, new UserRowMapper());
		return user;
	}

	/**
	 * 회원 패스워드 교체하는 메소드
	 */
	public int passwordChange(String password, String userEmail) throws DataAccessException{
		String hashPassWord = passwordEncoder.encode(password);
		String sql = String.format("UPDATE user SET password = '%s' WHERE email = %s",hashPassWord, userEmail);
		return jdbcTemplate.update(sql);
	}
}
