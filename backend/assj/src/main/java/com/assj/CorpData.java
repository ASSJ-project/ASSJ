package com.assj;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.Setter;

@Service
@Getter
@Setter
public class CorpData {
  private String title;
  private String salTpNm;
  private String sal;
  private String minSal;
  private String maxSal;
  private String region;
  private String holidayTpNm;
  private String minEdubg;
  private String maxEdubg;
  private String career;
  private String redDt;
  private String closeDt;
  private String infoSvc;
  private String wantedInfoUrl;
  private String wantedMobileInfoUrl;
  private String smodifyDtm;
  private String zipCd;
  private String strtnmCd;
  private String basicAddr;
  private String detailAddr;
  private String empTpCd;
  private String jobsCd;
  private String prefCd;

}
