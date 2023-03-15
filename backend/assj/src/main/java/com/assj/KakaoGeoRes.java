package com.assj;

import java.util.HashMap;
import java.util.List;

import lombok.Data;

@Data
public class KakaoGeoRes {
  private HashMap<String, Object> meta;
  private List<Documents> documents;
}
@Data
class Documents {
    private HashMap<String, Object> address;
    private String address_type;
    private Double x;
    private Double y;
    private String address_name;
    private HashMap<String, Object> road_address;
}