package com.assj.utils;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.assj.domain.user.UserService;
import com.assj.redis.RefreshTokenRedisRepository;
import com.auth0.jwt.exceptions.TokenExpiredException;

import lombok.extern.slf4j.Slf4j;

// OncePerRequestFilter 는 어떤 서블릿 컨테이너에서나 요청 당 한번의 실행을 보장하는 필터
@Slf4j
@Component 
public class JwtFilter extends OncePerRequestFilter{

  @Value("${jwt.secret-key}")
  private String secretKey;

  @Autowired
	private RefreshTokenRedisRepository refreshTokenRedisRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
    
    // 리퀘스트 헤더에서 전달된 토큰을 가져옴
    final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

    // 해당 토큰이 비어있거나 Bearer로 시작되지 않으면 리턴
    if(authorization == null|| !authorization.startsWith("Bearer ")){
      filterChain.doFilter(request, response);
      return;
    }

    // Bearer를 제외한 뒤쪽의 토큰 정보만을 잘라냄
    String token = authorization.split(" ")[1];
    String refresh = "";

    // long redisId = (long)(token.hashCode());
    // log.info(String.valueOf(redisId) );

    // token expired 여부 확인 
    try{
      JwtToken.isExpired(token, secretKey);
    }catch(TokenExpiredException e){
      log.error("토큰이 만료되었습니다");

      // 엑세스 토큰이 만료되었다면 리프레시 토큰을 꺼냄 
      refresh = authorization.split(" ")[2];
      
      filterChain.doFilter(request, response);
    }

    // token 에서 꺼낸 user email
    String userEmail = JwtToken.getUserEmail(token, secretKey);
    
    // token 에서 꺼낸 user role 쌍따옴표가 붙어서 들어오기 때문에 제거
    String role = JwtToken.getUserRole(token, secretKey).replaceAll("\\\"","");

    // 권한 부여 
    UsernamePasswordAuthenticationToken authenticationToken = 
      new UsernamePasswordAuthenticationToken(userEmail, null, List.of(new SimpleGrantedAuthority(role)));

      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      System.out.println(authenticationToken.getAuthorities());
      filterChain.doFilter(request, response);
  }}
