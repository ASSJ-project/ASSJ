// package com.assj.exception;
// import java.io.IOException;
// import java.util.List;
// import java.util.Optional;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.Cookie;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.annotation.Order;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.bind.annotation.ResponseStatus;
// import org.springframework.web.filter.OncePerRequestFilter;
// import org.springframework.web.server.ResponseStatusException;

// import com.assj.redis.RefreshToken;
// import com.assj.redis.RefreshTokenRedisRepository;
// import com.assj.jwt.JwtToken;
// import com.auth0.jwt.exceptions.TokenExpiredException;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import lombok.extern.slf4j.Slf4j;


// @Component
// @Order(0)
// @Slf4j
// public class ExceptionFilter extends OncePerRequestFilter{
//   @Autowired
// 	private RefreshTokenRedisRepository refreshTokenRedisRepository;
//   @Value("${jwt.secret-key}")
//   private String secretKey;

//   @Override
//   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//       throws ServletException, IOException {
//         // final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION); // 헤더에서 뽑아낸 토큰
//         // String token = authorization.split(" ")[1]; // 엑세스 토큰
//         // String refresh = authorization.split(" ")[2]; // 리프레시 토큰
//         // try{
//         //   filterChain.doFilter(request, response);
//         // }catch(TokenExpiredException e){
          
//         //   long redisId = JwtToken.accessTokenToId(token); // 엑세스 토큰에서 redis id 추출 
//         //   Optional<RefreshToken> rf = refreshTokenRedisRepository.findById(redisId); // redis주소

//         //   // 유저 접속 ip를 알아낸다 
//         //   String userIp = request.getHeader("X-FORWARDED-FOR");
//         //   if(userIp == null){
//         //     userIp = request.getRemoteAddr();
//         //   }
          
//         //   String inRedisRefreshToken = rf.get().getRefreshToken(); // redis 안에 저장된 토큰 유저의 리프레시 토큰
//         //   String inRedisIp = rf.get().getIp(); // redis 안에 저장된 토큰 유저의 ip
          
//         //   // 만약 가져온 엑세스 토큰으로 꺼낸 redis의 리프레시 토큰이 리퀘스트로 온 리프레시 토큰과 같고
//         //   // 접속한 유저의 ip와 레디스 안에 저장된 ip가 같다면 
//         //   // 토큰을 재발급한다 
//         //   if(inRedisRefreshToken.equals(refresh) && inRedisIp.equals(userIp)){
//         //     log.info("토큰재발급 시작");
//         //     Cookie myCookie=new Cookie("test","");
//         //     myCookie.setValue("testValue");
//         //     myCookie.setPath("/");
//         //     myCookie.setHttpOnly(true);
//         //    // myCookie.setDomain(".mydomain.com");
//         //     response.addCookie(myCookie);
           
//         //   }
//         // }

//     //     // token 에서 꺼낸 user email
//     // String userEmail = JwtToken.getUserEmail(token, secretKey);
    
//     // // token 에서 꺼낸 user role 쌍따옴표가 붙어서 들어오기 때문에 제거
//     // String role = JwtToken.getUserRole(token, secretKey).replaceAll("\\\"","");
        
//     // // 권한 부여 
//     //   UsernamePasswordAuthenticationToken authenticationToken = 
//     //   new UsernamePasswordAuthenticationToken(userEmail, null, List.of(new SimpleGrantedAuthority(role)));

//     //   authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//     //   SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//     //   System.out.println(authenticationToken.getAuthorities());
//     //   filterChain.doFilter(request, response);     
//   }
// }
