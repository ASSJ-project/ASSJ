package com.assj;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.assj.domain.user.UserService;

@SpringBootTest
class AssjApplicationTests {

	@Autowired
	UserService userService;

	@Test
	public void 회원_페이지_가져오기() {
		//when
		int limit = 10; // 최대 몇명을 보여줄 것인가 
		int offset = 10; // 몇번째 row 부터 출력할 것인가 

		//then
		Assertions.assertThat(userService.getUsers(limit, offset).size()).isEqualTo(5);
		
	}

}
