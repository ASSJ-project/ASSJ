package com.assj.domain.user;

import java.sql.Date;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String userEmail;
    private Long userPassword;
    private Date regDate;
    private String userAddress;
}
