package com.assj.jwt;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
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

import com.assj.cookie.Cookies;
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
    String[] tokens = null;
    String newToken = "";

    try {
      // 쿠키에서 토큰을 가져옴
      tokens = Cookies.fromToken(request);
      newToken = tokens[0]; // accessToken
    } catch (NullPointerException e) {
      // 토큰이 없는 상태에서 로그인 시도 안하고 다른 페이지로 갔을때의 처리
      filterChain.doFilter(request, response);
      return;
    }

    if (Cookies.tokenIsEmpty(tokens)) {
      // 다시 doFilter 를 해줘야 컨트롤러로 넘어감
      filterChain.doFilter(request, response);
      return;
    }

    // try {
    // JwtToken.isExpired(tokens[0], secretKey);

    // } catch (TokenExpiredException e) {
    // log.error("토큰이 만료되었습니다");
    // newToken = JwtToken.tokenRefresh(tokens[0], tokens[1], secretKey,
    // accessExpiredAt, request, response,
    // refreshTokenRedisRepository);
    // filterChain.doFilter(request, response);
    // return;

    // }

    //
    String role = "";
    String userEmail = "";
    try {
      // token 에서 꺼낸 user role 쌍따옴표가 붙어서 들어오기 때문에 제거
      role = JwtToken.getUserRole(newToken, secretKey).replaceAll("\\\"", "");
      userEmail = JwtToken.getUserEmail(newToken, secretKey);
    } catch (TokenExpiredException e) {
      log.error("토큰이 만료되었습니다");
      newToken = JwtToken.tokenRefresh(tokens[0], tokens[1], secretKey,
          accessExpiredAt, request, response,
          refreshTokenRedisRepository);
      role = JwtToken.getUserRole(newToken, secretKey).replaceAll("\\\"", "");
      userEmail = JwtToken.getUserEmail(newToken, secretKey);

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, null,
          List.of(new SimpleGrantedAuthority(role)));

      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      log.info(authenticationToken.getAuthorities().toString());
      filterChain.doFilter(request, response);
      return;
    }

    // 권한 부여
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, null,
        List.of(new SimpleGrantedAuthority(role)));

    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    log.info(authenticationToken.getAuthorities().toString());
    filterChain.doFilter(request, response);
  }

}
