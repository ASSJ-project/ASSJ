package com.assj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AssjApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssjApplication.class, args);
	}
}
