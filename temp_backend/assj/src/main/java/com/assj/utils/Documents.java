package com.assj.utils;
import java.util.HashMap;

import lombok.Data;

@Data
public class Documents {
  private HashMap<String, Object> address;
  private String address_type;
  private Double x;
  private Double y;
  private String address_name;
  private HashMap<String, Object> road_address;
}
