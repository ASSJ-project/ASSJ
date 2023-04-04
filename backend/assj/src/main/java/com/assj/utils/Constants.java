package com.assj.utils;

public final class Constants {
  public static final int DEFAULT_PAGE_SIZE = 10;
  public static final String API_VERSION = "v1";
  public static final String KAKAO_API_KEY = "KakaoAK 50bbb5205dc8fcc9c2611542015a54d5";
  public static final String KAKAO_API_URL = "v1";
  public static final String WORKNET_API_KEY = "WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ";
  public static final String INSERT_INTO_COMPANY_SQL = "INSERT INTO company (company_id, company, title, salTpNm, sal, minSal, maxSal, region, holidayTpNm, minEdubg, career, regDt, closeDt, zipCd, strtnmCd, basicAddr, detailAddr, empTpCd, jobsCd, wgsX, wgsY, wtmX, wtmY) VALUE (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)";
}
