package com.assj.domain.user;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.assj.cookie.Cookies;
import com.assj.dto.User;
import com.assj.dto.SnsUser;
import com.assj.jwt.JwtToken;
import com.assj.redis.RefreshToken;
import com.assj.redis.RefreshTokenRedisRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private RefreshTokenRedisRepository refreshTokenRedisRepository;

	@Value("${jwt.secret-key}")
	private String secretKey; // application.properties 에 있는 시크릿 키
	@Value("${jwt.access-token.expiredAt}")
	private String accessExpiredAt; // 엑세스 토큰 만료기한 10분
	@Value("${jwt.refresh-token.expiredAt}")
	private String refreshExpiredAt; // 리프레시 토큰 만료기한 1주일

	/**
	 * 유저 리스트를 가져오는 메소드
	 * 
	 * @param limit 한 페이지에 보여주고자 하는 유저의 수
	 * @param page  현재 페이지 수
	 * @return offset 부터 limit 만큼 유저 리스트
	 */

	public List<User> getUsers(int limit, int page) {
		int offset = ((page - 1) * limit); // 몇번째 row(0부터 시작) 부터 표시할 것인지
		String sql = String.format("SELECT * FROM user LIMIT %d OFFSET %d", limit, offset);
		return jdbcTemplate.query(sql, new UserRowMapper());
	}

	/**
	 * 유저 테이블 전체 유저 수를 반환하는 메소드
	 * 
	 * @return 전체 유저 수
	 */
	public int getUserCount() {
		Integer result = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user", Integer.class);
		return result != null ? result.intValue() : 0;
	}

	/**
	 * 유저가 DB에 존재하는지 조회하는 메소드
	 * 
	 * @param userEmail 유저 이메일
	 * @return false : 존재, true : 부존재
	 * @throws Exception
	 */
	public boolean checkEmail(String userEmail) throws Exception {
		List<User> users = jdbcTemplate.query(String.format("select * from user where email = '%s'", userEmail),
				new UserRowMapper());
		return (users.isEmpty()) ? false : true;
	}

	/**
	 * SNS 유저가 DB에 존재하는지 조회하는 메소드
	 * 
	 * @param userId SNS 로그인시 받은 id
	 * @return false : 존재, true : 부존재
	 */
	public boolean checkEmailSns(String userId) throws DataAccessException {
		List<SnsUser> users = jdbcTemplate.query(String.format("select * from user_sns where userid = '%s'", userId),
				new SnsUserRowMapper());

		return (users.isEmpty()) ? false : true;
	}

	/**
	 * 로그인 시도 유저의 패스워드가 DB 상에 저장된 패스워드와 같은지 조회하는 메소드
	 * 
	 * @param user 로그인 시도 유저
	 * @return true : 일치, false : 불일치
	 * @throws DataAccessException
	 */
	public boolean checkPassword(User user) throws DataAccessException {

		String sql = "select * from user where email = '" + user.getUserEmail() + "'";
		List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
		if (users.isEmpty()) {
			return false;
		} else {
			String inDbPassword = users.get(0).getUserPassword(); // db 에 저장된 패스워드
			String inputPassword = user.getUserPassword();
			return passwordEncoder.matches(inputPassword, inDbPassword);
		}
	}

	/**
	 * 회원 가입 성공시 유저를 DB에 추가하는 메소드
	 * 
	 * @param user 회원 가입 시도 유저
	 * @return 변경된 행의 개수 (실패: 0)
	 * @throws DataAccessException
	 */
	public int addUser(User user) throws DataAccessException {
		String sql = "Insert into user(email, password, address, name) values(?,?,?,?)";
		String hashPassWord = passwordEncoder.encode(user.getUserPassword());
		user.setUserPassword(hashPassWord);

		return jdbcTemplate.update(sql, user.getUserEmail(), user.getUserPassword(),
				user.getUserAddress(), user.getUserName());
	}

	/**
	 * sns 회원가입 성공시 유저 id를 db에 추가
	 * 
	 * @param user sns 회원가입 시도유저
	 * @return 변경된 행의 개수 (실패0)
	 * @throws DataAccessException
	 */
	public int addSnsUser(String id) throws DataAccessException {
		String sql = "Insert into user_sns(userid) values(?)";
		return jdbcTemplate.update(sql, id);
	}

	/**
	 * 특정 유저 1명만 가져오는 메소드
	 * 
	 * @param userEmail 유저 이메일
	 * @return 이메일과 일치하는 유저
	 * @throws DataAccessException
	 */
	public List<User> getUser(HttpServletRequest request) throws DataAccessException {
		String userEmail = null;
		for (Cookie cookie : request.getCookies()) {
			if (cookie.getName().equals("access_token")) {
				userEmail = JwtToken.getUserEmail(cookie.getValue(), secretKey);
			}
		}
		if (userEmail == null) {
			User emptyUser = new User();
			emptyUser.setUserName("유저가 존재하지 않습니다");
			List<User> result = new ArrayList<User>();
			result.add(emptyUser);
			return result;
		}
		return jdbcTemplate
				.query(String.format("select * from user where email = %s", userEmail), new UserRowMapper());
	}

	/**
	 * 회원의 패스워드를 교체하는 메소드
	 * 
	 * @param password  유저 패스워드
	 * @param userEmail 유저 이메일
	 * @return 변경된 행의 개수 (실패: 0)
	 * @throws DataAccessException
	 */
	public int passwordChange(String password, String userEmail) throws DataAccessException {
		String hashPassWord = passwordEncoder.encode(password);
		String sql = String.format("UPDATE user SET password = '%s' WHERE email = '%s'", hashPassWord, userEmail);
		return jdbcTemplate.update(sql);
	}

	/**
	 * 회원의 역할을 가져오는 메소드
	 * 
	 * @param email 회원 이메일
	 * @return 회원 역할(ROLE)
	 * @throws DataAccessException
	 */
	public String getRole(String email) throws DataAccessException {
		String sql = String.format(
				"SELECT user_role.role FROM user INNER JOIN user_role ON user.role = user_role.role_id WHERE email = '%s'",
				email);
		return jdbcTemplate.queryForObject(sql, String.class);
	}

	public String getSnsRole(String id) throws DataAccessException {
		String sql = String.format(
				"SELECT user_role.role FROM user_sns INNER JOIN user_role ON user_sns.role = user_role.role_id WHERE userid = '%s'",
				id);
		return jdbcTemplate.queryForObject(sql, String.class);
	}

	public int deleteUser(User user) throws DataAccessException {
		String sql = String.format("DELETE FROM user WHERE email = '%s'", user.getUserEmail());
		return jdbcTemplate.update(sql);
	}

	/**
	 * 토큰 쌍을 생성하는 메소드
	 * 
	 * @param userEmail
	 * @return 엑세스 토큰, 리프레시 토큰
	 */
	public String generateTokens(String userEmail, HttpServletResponse response, HttpServletRequest request,
			String userType) {
		// 유저의 이메일, 권한, 시크릿 키, 만료시간을 토큰 생성 메소드로 넘겨줌
		log.info("토큰 발행 시작");

		String role = "";
		switch (userType) {
			case "user":
				role = getRole(userEmail);// 유저 권한
				break;
			case "sns_user":
				role = getSnsRole(userEmail);
				break;
		}

		// response body 에 엑세스 토큰, 리프레시 토큰 추가
		String accessToken = JwtToken.createAccess(userEmail, role, secretKey, Long.parseLong(accessExpiredAt));
		String refreshToken = JwtToken.createReFresh(secretKey, Long.parseLong(refreshExpiredAt));

		Cookies.sendCookie(response, true, "access_token", accessToken);
		Cookies.sendCookie(response, true, "refresh_token", refreshToken);

		// 엑세스 토큰을 id를 위해 고유한 정수로 만들어줌
		long redisId = JwtToken.parseTokenToId(accessToken);

		// 유저 접속 ip를 알아낸다
		String userIp = request.getHeader("X-FORWARDED-FOR");
		if (userIp == null) {
			userIp = request.getRemoteAddr();
		}
		// 두 조건 다 아닐 경우의 exception 처리도 필요해질것 같다
		// 리프레시 토큰을 redis에 저장
		refreshTokenRedisRepository.save(new RefreshToken(redisId, userEmail, userIp, refreshToken, role));

		return role;
	}

}
