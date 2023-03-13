package com.assj;

import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.Setter;

@Service
@Getter
@Setter
public class User {
	private String username;
	private String email;
	private String password;
	private String reg_date;
	private String user_address;
	private int uuid;
	private int admin;
	
}
