package com.assj.cookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Cookies {
  /**
   * 쿠키에서 엑세스 토큰과 리프레시 토큰을 얻는 메소드
   * @param request 리퀘스트 객체 
   * @return 토큰 배열 [엑세스, 리프레시]
   */
  public static String[] fromToken(HttpServletRequest request){
    String token = "";
    String refresh = "";
    
    for (Cookie cookie : request.getCookies()){
      String cookieName = cookie.getName();
      if (cookieName.equals("access_token")) token = cookie.getValue();
      if (cookieName.equals("refresh_token")) refresh = cookie.getValue();
    }
    return new String[]{token, refresh};
  }

  /**
   * 토큰이 비어있는지 확인하는 메소드 
   * @param tokens 토큰 배열 
   * @return 두개의 토큰중 하나라도 비어있음 : true, 두개다 있음 : false
   */
  public static Boolean tokenIsEmpty(String[] tokens){
    if(tokens[0].isEmpty()) return true;
    if(tokens[1].isEmpty()) return true;
    return false;
  }

  public static void sendCookie(HttpServletResponse response, Boolean httpOnly, String key, String value){
    Cookie myCookie = new Cookie(key, value);
    myCookie.setPath("/");
    myCookie.setHttpOnly(true);
    response.addCookie(myCookie);
  }
}
