package com.assj.utils;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JwtToken {

  public static String createJwt(String userEmail, String secretKey, Long expiredMs) throws NoSuchAlgorithmException{
  
    return JWT.create()
      .withIssuer("assj")
      .withIssuedAt(new Date(System.currentTimeMillis()))
      .withExpiresAt(new Date(System.currentTimeMillis()+ expiredMs))
      .withClaim("user", userEmail)
      .sign(Algorithm.HMAC256(secretKey));
  }

  public static boolean isExpired(String token, String secretKey){
    System.out.println(JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getExpiresAt().before(new Date()));
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getExpiresAt().before(new Date());
  }
  
  public static String getUserEmail(String token, String secretKey){
    return JWT.require(Algorithm.HMAC256(secretKey)).build().verify(token).getClaim("user").toString();
  }
    
}


