package com.assj.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

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
      kpg.initialize(1024);
      KeyPair kp = kpg.generateKeyPair();

      RSAPublicKey publicKey = (RSAPublicKey) kp.getPublic();
      RSAPrivateKey privateKey = (RSAPrivateKey) kp.getPrivate();
   
      Algorithm algorithm = Algorithm.RSA256(publicKey,privateKey);
      token = JWT.create().withIssuer("assj").withPayload(null).sign(algorithm);
  
    }catch(Exception e){
      log.info(e.toString());
    }
    return token;
  }
}
