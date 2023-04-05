package com.assj.jwt;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.assj.redis.RefreshTokenRedisRepository;
import com.assj.redis.RefreshToken;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtToken {

  /**
   * Json Web Token 발행 메소드
   * 
   * @param userEmail 유저 이메일
   * @param secretKey 시크릿 키
   * @param expiredMs 만료일
   * @return JWT 토큰을 리턴
   * @throws NoSuchAlgorithmException
   */
  public static String createAccess(String userEmail, String role, String secretKey, Long expiredMs) {
    return JWT.create()
        .withIssuer("assj")
        .withIssuedAt(new Date(System.currentTimeMillis()))
        .withExpiresAt(new Date(System.currentTimeMillis() + expiredMs))
        .withClaim("user", userEmail)
        .withClaim("role", role)
        .sign(Algorithm.HMAC256(secretKey));
  }

  /**
   * 리프레시 토큰을 발행하는 메소드
   * 
   * @param secretKey 시크릿 키
   * @param expiredMs 만료일
   * @return 리프레시 토큰
   */
  public static String createReFresh(String secretKey, Long expiredMs) {
    return JWT.create()
        .withIssuer("assj")
        .withIssuedAt(new Date(System.currentTimeMillis()))
        .withExpiresAt(new Date(System.currentTimeMillis() + expiredMs))
        .sign(Algorithm.HMAC256(secretKey));
  }

  /**
   * 토큰 만료 여부 검사하는 메소드
   * 
   * @param token     헤더로 전달된 토큰
   * @param secretKey 시크릿 키
   * @return 유효시 false, 만료시 true
   */
  public static boolean isExpired(String token, String secretKey) throws TokenExpiredException {
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getExpiresAt()
        .before(new Date());
  }

  /**
   * 토큰에서 유저의 Email을 추출하는 메소드
   * 
   * @param token     헤더로 전달된 토큰
   * @param secretKey 시크릿 키
   * @return String userEmail
   */
  public static String getUserEmail(String token, String secretKey) {
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getClaim("user").toString();
  }

  /**
   * 토큰에서 유저의 role를 추출하는 메소드
   * 
   * @param token     헤더로 전달된 토큰
   * @param secretKey 시크릿 키
   * @return String role
   */
  public static String getUserRole(String token, String secretKey) {
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getClaim("role").toString();
  }

  /**
   * 토큰 redis 저장을 위해 고유 long id를 만드는 메소드
   * 
   * @param accessToken
   * @return redis 용 long id
   */
  public static long parseTokenToId(String accessToken) {
    char arr[] = accessToken.toCharArray();
    long result = 0l;
    for (char i : arr) {
      result += Character.valueOf(i);
    }
    return result;
  }

  /**
   * 토큰 재발급 메소드
   * 
   * @param token                       엑세스 토큰
   * @param refresh                     리프레시 토큰
   * @param secretKey                   시크릿 키
   * @param accessExpiredAt             엑세스 토큰의 만료기일
   * @param request                     HttpServletRequest
   * @param response                    HttpServletResponse
   * @param refreshTokenRedisRepository 레디스 레파지토리 인스턴스
   * @return 발급 유무 true or false
   */
  public static Boolean tokenRefresh(String token, String refresh, String secretKey, String accessExpiredAt,
      HttpServletRequest request, HttpServletResponse response,
      RefreshTokenRedisRepository refreshTokenRedisRepository) {

    // 유저 접속 ip를 알아낸다
    String userIp = request.getHeader("X-FORWARDED-FOR");
    if (userIp == null) {
      userIp = request.getRemoteAddr();
    }

    long redisId = JwtToken.parseTokenToId(token); // 엑세스 토큰에서 redis id 추출
    System.out.println("필터 안의 레디스 아이디 : " + redisId);
    System.out.println("리포지토리주소 : " + refreshTokenRedisRepository);
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
          Long.parseLong(accessExpiredAt));// 엑세스 토큰을 재발급
      Cookie myCookie = new Cookie("access_token", newAccessToken);
      myCookie.setPath("/");
      myCookie.setHttpOnly(true);
      response.addCookie(myCookie);
      long newRedisId = parseTokenToId(newAccessToken);
      System.out.println("추가된 id : " + newRedisId);
      refreshTokenRedisRepository
          .save(new RefreshToken(newRedisId, inRedisUserEmail, userIp, refresh, inRedisUserRole));
      // refreshTokenRedisRepository.deleteById(redisId); // 검증 필요
      System.out.println("삭제된 id : " + redisId);
      log.info("토큰재발급 완료");
    } else
      return false;
    return true;
  }
}
