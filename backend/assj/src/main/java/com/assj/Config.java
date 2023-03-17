package com.assj;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableWebSecurity
public class Config {

	@Bean
	DataSource datasource() {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("org.mariadb.jdbc.Driver");
		hikariConfig.setJdbcUrl("jdbc:mariadb://192.168.0.205:3306/assj");
		hikariConfig.setUsername("root");
		hikariConfig.setPassword("assj");
		hikariConfig.setMinimumIdle(10);
		hikariConfig.setMaximumPoolSize(10);
		hikariConfig.setConnectionTimeout(3000);
		hikariConfig.setValidationTimeout(3000);
		hikariConfig.setMaxLifetime(58000);
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);
		return dataSource;
	}

	@Bean
	PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}