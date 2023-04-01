package com.assj.domain.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.assj.dto.User;



@Service
public class UserService {

		@Autowired
    private JdbcTemplate jdbcTemplate;
		@Autowired
		private PasswordEncoder passwordEncoder;

		/**
		 * 유저 리스트를 가져오는 메소드 
		 * @param limit 한 페이지에 보여주고자 하는 유저의 수
		 * @param page 현재 페이지 수 
		 * @return offset 부터 limit 만큼 유저 리스트 
		 */
    public List<User> getUsers(int limit, int page) {
				int offset = ((page - 1) * limit); // 몇번째 row(0부터 시작) 부터 표시할 것인지
        String sql = String.format("SELECT * FROM user LIMIT %d OFFSET %d", limit, offset);
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

		/**
		 * 유저 테이블 전체 유저 수를 반환하는 메소드
		 * @return 전체 유저 수
		 */
		public int getUserCount(){
			Integer result = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user", Integer.class);
			return result != null ? result.intValue() : 0;
		}

		/**
		 * 유저가 DB에 존재하는지 조회하는 메소드
		 * @param userEmail 유저 이메일 
		 * @return false : 존재, true : 부존재
		 * @throws Exception
		 */
    public boolean checkEmail(String userEmail) throws Exception{
			List<User> users = jdbcTemplate.query(String.format("select * from user where email = '%s'", userEmail), new UserRowMapper());
			return (users.isEmpty()) ? false : true;
		}

	/**
	 * 로그인 시도 유저의 패스워드가 DB 상에 저장된 패스워드와 같은지 조회하는 메소드
	 * @param user 로그인 시도 유저 
	 * @return true : 일치, false : 불일치 
	 * @throws DataAccessException
	 */
	public boolean checkPassword(User user) throws DataAccessException{

		String sql = "select * from user where email = '"+ user.getUserEmail() + "'";
		List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
		if(users.isEmpty()){
			return false;
		}else {
			String inDbPassword = users.get(0).getUserPassword(); // db 에 저장된 패스워드
			String inputPassword = user.getUserPassword();
			return passwordEncoder.matches(inputPassword, inDbPassword);
		}
	}
	
	/**
	 * 회원 가입 성공시 유저를 DB에 추가하는 메소드
	 * @param user 회원 가입 시도 유저
	 * @return 변경된 행의 개수 (실패: 0)
	 * @throws DataAccessException
	 */
	public int addUser(User user) throws DataAccessException{
		String sql = "Insert into user(email, password, address, name) values(?,?,?,?)";
		String hashPassWord = passwordEncoder.encode(user.getUserPassword());
		user.setUserPassword(hashPassWord);
		
		return jdbcTemplate.update(sql, user.getUserEmail(), user.getUserPassword(), 
			user.getUserAddress(), user.getUserName());

	}

	/**
	 * 특정 유저 1명만 가져오는 메소드
	 * @param userEmail 유저 이메일 
	 * @return 이메일과 일치하는 유저 
	 * @throws DataAccessException
	 */
	public List<User> getUser(String userEmail) throws DataAccessException{
		return jdbcTemplate
			.query(String.format("select * from user where email = %s", userEmail), new UserRowMapper());
	}
			

	/**
	 * 회원의 패스워드를 교체하는 메소드
	 * @param password 유저 패스워드
	 * @param userEmail 유저 이메일 
	 * @return 변경된 행의 개수 (실패: 0)
	 * @throws DataAccessException
	 */
	public int passwordChange(String password, String userEmail) throws DataAccessException{
		String hashPassWord = passwordEncoder.encode(password);
		String sql = String.format("UPDATE user SET password = '%s' WHERE email = '%s'",hashPassWord, userEmail);
		return jdbcTemplate.update(sql);
	}

}
