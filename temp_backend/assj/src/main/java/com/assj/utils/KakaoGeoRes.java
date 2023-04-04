package com.assj.utils;

import java.util.HashMap;
import java.util.List;

import lombok.Data;

@Data
public class KakaoGeoRes {
  private HashMap<String, Object> meta;
  private List<Documents> documents;
}
