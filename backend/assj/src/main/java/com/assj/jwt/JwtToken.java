package com.assj.jwt;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;


public class JwtToken {

  /**
   * Json Web Token 발행 메소드
   * @param userEmail  유저 이메일 
   * @param secretKey  시크릿 키
   * @param expiredMs  만료일 
   * @return JWT 토큰을 리턴 
   * @throws NoSuchAlgorithmException
   */
  public static String createAccess(String userEmail, String role, String secretKey, Long expiredMs){
    return JWT.create()
      .withIssuer("assj")
      .withIssuedAt(new Date(System.currentTimeMillis()))
      .withExpiresAt(new Date(System.currentTimeMillis()+ expiredMs))
      .withClaim("user", userEmail)
      .withClaim("role", role)
      .sign(Algorithm.HMAC256(secretKey));
  }

  /**
   * 리프레시 토큰을 발행하는 메소드
   * @param secretKey 시크릿 키 
   * @param expiredMs 만료일 
   * @return 리프레시 토큰
   */
  public static String createReFresh(String secretKey, Long expiredMs){
    return JWT.create()
      .withIssuer("assj")
      .withIssuedAt(new Date(System.currentTimeMillis()))
      .withExpiresAt(new Date(System.currentTimeMillis() + expiredMs))
      .sign(Algorithm.HMAC256(secretKey));
  }

  /**
   * 토큰 만료 여부 검사하는 메소드 
   * @param token 헤더로 전달된 토큰 
   * @param secretKey 시크릿 키 
   * @return 유효시 false, 만료시 true
   */
  public static boolean isExpired(String token, String secretKey)throws TokenExpiredException{
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getExpiresAt().before(new Date());
  }
  
  /**
   * 토큰에서 유저의 Email을 추출하는 메소드
   * @param token 헤더로 전달된 토큰 
   * @param secretKey 시크릿 키 
   * @return String userEmail
   */
  public static String getUserEmail(String token, String secretKey){
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getClaim("user").toString();
  }

  /**
   * 토큰에서 유저의 role를 추출하는 메소드
   * @param token 헤더로 전달된 토큰 
   * @param secretKey 시크릿 키 
   * @return String role
   */
  public static String getUserRole(String token, String secretKey){
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getClaim("role").toString();
  }

  /**
   * 토큰 redis 저장을 위해 고유 long id를 만드는 메소드
   * @param accessToken
   * @return redis 용 long id 
   */
  public static long accessTokenToId(String accessToken){
    char arr[] = accessToken.toCharArray();
		long result = 0l;
		for(char i : arr){
			result += (char)i;
		}
    return result;
  }
}


