package com.assj.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class User {
    private Long uuid;
    private String userEmail;
    private String userPassword;
    private Date regDate;
    private String userAddress;
    private String userName;
    private int role;
}
