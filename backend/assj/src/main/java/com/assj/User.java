package com.assj;

import lombok.Data;

@Data
public class User {
	private String username;
	private String email;
	private String password;
	private String reg_date;
	private String user_address;
	private int uuid;
	private int admin;
	
}
