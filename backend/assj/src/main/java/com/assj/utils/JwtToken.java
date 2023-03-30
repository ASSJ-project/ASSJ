package com.assj.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.SecureRandom;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.assj.domain.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JwtToken {
  private static Logger log = LoggerFactory.getLogger(JwtToken.class);
  public String createJwtToken(User user){
    String token = null;
    try {
      KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
      SecureRandom sr = SecureRandom.getInstanceStrong();
      kpg.initialize(1024, sr); 

      KeyPair kp = kpg.generateKeyPair();
      RSAPublicKey publicKey = (RSAPublicKey) kp.getPublic();
      RSAPrivateKey privateKey = (RSAPrivateKey) kp.getPrivate();
   
      Algorithm algorithm = Algorithm.RSA256(publicKey,privateKey);
      Map<String, String> privateClaim = new HashMap<>();
      privateClaim.put("user", user.getUserEmail());

      Date now = new Date(System.currentTimeMillis());
      Date expiredDate = new Date(System.currentTimeMillis() + 600000);
      

      token = JWT.create().withIssuer("assj").withPayload(privateClaim)
        .withIssuedAt(now).withExpiresAt(expiredDate).withNotBefore(now).sign(algorithm);
  
    }catch(Exception e){
      log.info(e.toString());
    }
    return token;
  }
}
