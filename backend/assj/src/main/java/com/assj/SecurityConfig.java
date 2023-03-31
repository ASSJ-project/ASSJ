package com.assj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.assj.utils.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
  
  @Autowired
  JwtFilter jwtFilter;

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
  @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      return http
              .httpBasic().disable() // http 베이직 로그인 창을 이용. 사용하지 않을것이므로 disable.
              //csrf, cors 설정 
              .csrf().disable() 
              .cors().and()
              .authorizeRequests()
              //end point 설정 
              .antMatchers("api/users/login.do", "api/users/register.do").permitAll()
              .antMatchers("/api/company/items").authenticated()
              .antMatchers("/api/users/all", "api/users/getUser").authenticated()
              .and()
              .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
              .and()
              // filter 설정
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
              .build();
    }
}
