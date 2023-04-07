package com.assj.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class SnsUser {
  private Long uuid;
  private String userId;
  private Date regDate;
  private int role;
}
