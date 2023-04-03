package com.assj;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.assj.domain.user.UserService;
import com.assj.redis.RefreshTokenRedisRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class AssjApplicationTests {

	@Autowired
	UserService userService;
	@Autowired
	private RefreshTokenRedisRepository refreshTokenRedisRepository;

	@Test
	public void 회원_페이지_가져오기() {
		//when
		int limit = 10; // 최대 몇명을 보여줄 것인가 
		int page = 1; // 몇페이지를 보여주고 싶은지

		//then
		Assertions.assertThat(userService.getUsers(limit, page).size()).isEqualTo(9);
		
	}

	@Test
	public void 회원_롤_가져오기(){
		
		//when
		String emailA = "tailleejb@gmail.com";
		String emailB = "dlwoqur@hanmail.net";

		//then
		Assertions.assertThat(userService.getRole(emailA)).isEqualTo("ROLE_ADMIN");
		Assertions.assertThat(userService.getRole(emailB)).isEqualTo("ROLE_USER");

	}

	// @Test
	// public void 회원_리프레시토큰_저장_가져오기(){
	// 	Assertions.assertThat((refreshTokenRedisRepository.findById("tailleejb@gmail.com"))).isEqualTo(null);
	// }
}
