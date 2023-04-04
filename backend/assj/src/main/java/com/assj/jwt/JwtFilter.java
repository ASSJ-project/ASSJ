package com.assj.jwt;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

import com.assj.redis.RefreshToken;

import lombok.extern.slf4j.Slf4j;

// OncePerRequestFilter 는 어떤 서블릿 컨테이너에서나 요청 당 한번의 실행을 보장하는 필터
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

  private String secretKey = Constants.SECRET_KEY;

  @Value("${jwt.access-token.expiredAt}")
  private String accessExpiredAt; // 엑세스 토큰 만료기한 1분

  @Autowired
  private RefreshTokenRedisRepository refreshTokenRedisRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response, FilterChain filterChain)
      throws IOException, ServletException {

    // 리퀘스트 헤더에서 전달된 토큰을 가져옴
    // final String authorization = request.getHeader(HttpHeaders.COOKIE);
    String token = "";
    String refresh = "";
    for (Cookie cookie : request.getCookies()) {
      String cookieName = cookie.getName();
      if (cookieName.equals("access_token"))
        token = cookie.getValue();
      if (cookieName.equals("refresh_token"))
        refresh = cookie.getValue();
    }
    // log.info(token);
    // log.info(refresh);
    if (token.length() <= 0 | refresh.length() <= 0) {
      log.info("진입");
      filterChain.doFilter(request, response);
      return;
    }

    // // token 에서 꺼낸 user email
    // token expired 여부 확인
    try {
      JwtToken.isExpired(token, secretKey);
    } catch (TokenExpiredException e) {
      log.error("토큰이 만료되었습니다");

      // 유저 접속 ip를 알아낸다
      String userIp = request.getHeader("X-FORWARDED-FOR");
      if (userIp == null) {
        userIp = request.getRemoteAddr();
      }
      long redisId = JwtToken.accessTokenToId(token); // 엑세스 토큰에서 redis id 추출
      Optional<RefreshToken> rf = refreshTokenRedisRepository.findById(redisId); // redis주소

      String inRedisRefreshToken = rf.get().getRefreshToken(); // redis 안에 저장된 토큰
      String inRedisIp = rf.get().getIp(); // redis 안에 저장된 토큰 유저의 ip
      String inRedisUserEmail = rf.get().getEmail();
      String inRedisUserRole = rf.get().getRole();

      // 만약 가져온 엑세스 토큰으로 꺼낸 redis의 리프레시 토큰이 리퀘스트로 온 리프레시 토큰과 같고
      // 접속한 유저의 ip와 레디스 안에 저장된 ip가 같다면
      // 토큰을 재발급한다
      if (inRedisRefreshToken.equals(refresh) && inRedisIp.equals(userIp)) {
        log.info("토큰재발급 시작");
        String newAccessToken = JwtToken.createAccess(inRedisUserEmail, inRedisUserRole, secretKey,
            Long.parseLong(accessExpiredAt));
        Cookie myCookie = new Cookie("access_token", newAccessToken); // 엑세스 토큰을 재발급
        myCookie.setPath("/");
        myCookie.setHttpOnly(true);
        response.addCookie(myCookie);
        log.info("토큰재발급 완료");
        filterChain.doFilter(request, response);
        return;
      }
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
