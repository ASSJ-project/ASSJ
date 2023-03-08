package com.assj;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class RootConfig {

	@Bean
	public DataSource datasource() {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("org.mariadb.jdbc.Driver");
		hikariConfig.setJdbcUrl("jdbc:mariadb://localhost:3306/mysql");
		hikariConfig.setUsername("root");
		hikariConfig.setPassword("assj");
		hikariConfig.setMaximumPoolSize(10);
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);
		return dataSource;
	}
}