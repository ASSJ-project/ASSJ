package com.assj.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 604800) // key에대한 prefix, 만료기간일주일
public class RefreshToken {

    @Id
    private long id;

    @Indexed
    private String email;

    private String ip;

    private String refreshToken;

    private String role;
}
