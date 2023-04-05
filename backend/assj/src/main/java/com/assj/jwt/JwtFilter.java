package com.assj.jwt;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.assj.redis.RefreshTokenRedisRepository;
import com.assj.utils.Constants;
import com.auth0.jwt.exceptions.TokenExpiredException;

import lombok.extern.slf4j.Slf4j;

// OncePerRequestFilter 는 어떤 서블릿 컨테이너에서나 요청 당 한번의 실행을 보장하는 필터
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

  private String secretKey = Constants.SECRET_KEY;

  @Value("${jwt.access-token.expiredAt}")
  private String accessExpiredAt; // 엑세스 토큰 만료기한 10분

  @Autowired
  private RefreshTokenRedisRepository refreshTokenRedisRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response, FilterChain filterChain)
      throws IOException, ServletException {

    String token = "";
    String refresh = "";
    // 쿠키 비어있음
    if (request.getCookies() == null) {
      log.info("쿠키없음");
      filterChain.doFilter(request, response);
      return;
    }
    // 쿠키가 있지만 토큰이 없음
    for (Cookie cookie : request.getCookies()) {
      String cookieName = cookie.getName();
      if (cookieName.equals("access_token")) {
        token = cookie.getValue();
        if (cookie.getValue().length() <= 0) {
          filterChain.doFilter(request, response);
          return;
        } else
          continue;
      }

      if (cookieName.equals("refresh_token")) {
        refresh = cookie.getValue();
        if (cookie.getValue().length() <= 0) {
          filterChain.doFilter(request, response);
          return;
        } else
          continue;
      }
    }

    // 위에서 토큰을 넣었는데 비어있다면
    if (token.length() <= 0) {
      filterChain.doFilter(request, response);
      return;
    }

    // 토큰 만료 여부 확인
    try {
      JwtToken.isExpired(token, secretKey);
    } catch (TokenExpiredException e) {
      log.error("토큰이 만료되었습니다");
      JwtToken.tokenRefresh(token, refresh, secretKey, accessExpiredAt, request, response,
          refreshTokenRedisRepository);

      filterChain.doFilter(request, response);
      return;

    }

    String userEmail = JwtToken.getUserEmail(token, secretKey);

    // // token 에서 꺼낸 user role 쌍따옴표가 붙어서 들어오기 때문에 제거
    String role = JwtToken.getUserRole(token, secretKey).replaceAll("\\\"", "");

    // 권한 부여
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, null,
        List.of(new SimpleGrantedAuthority(role)));

    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    System.out.println(authenticationToken.getAuthorities());
    filterChain.doFilter(request, response);
  }
}
