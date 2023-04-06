package com.assj.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@EnableRedisRepositories
@Configuration
public class RedisConfig {

  @Value("${spring.redis.host}")
  private String redisHost;

  @Value("${spring.redis.port}")
  private int redisPort;
  
  @Bean
  public RedisConnectionFactory redisConnectFactory(){
    return new LettuceConnectionFactory(new RedisStandaloneConfiguration(redisHost, redisPort));
  }
  
  // @Bean
  // public RedisTemplate<?, ?> redisTemplate() {
  //     RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
  //     redisTemplate.setConnectionFactory(redisConnectFactory());
  //     redisTemplate.setKeySerializer(new StringRedisSerializer());
  //     redisTemplate.setValueSerializer(new StringRedisSerializer());
  //     return redisTemplate;
  // }
}
