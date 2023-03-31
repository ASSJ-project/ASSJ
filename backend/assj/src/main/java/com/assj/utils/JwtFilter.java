package com.assj.utils;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter{

  @Value("${jwt.secret-key}")
  private String secretKey;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
    
    final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

    if(authorization == null|| !authorization.startsWith("Bearer ")){
      filterChain.doFilter(request, response);
      return;
    }

    String token = authorization.split(" ")[1];
    
    // token expired 여부 확인 
      if(JwtToken.isExpired(token, secretKey)){
      log.error("토큰이 만료되었습니다");
      filterChain.doFilter(request, response);
      return;
    }
  
    // token 에서 꺼낸 user email
    String userEmail = JwtToken.getUserEmail(token, secretKey);
    //log.info("useEmail: {}", userEmail);

    // 권한 부여 
    UsernamePasswordAuthenticationToken authenticationToken = 
      new UsernamePasswordAuthenticationToken(userEmail, null, List.of(new SimpleGrantedAuthority("USER")));
    
      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      filterChain.doFilter(request, response);
  }
}
