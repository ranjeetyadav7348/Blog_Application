package com.apigateways.demo.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.util.pattern.PathPatternParser;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {



   

    

    @Bean
    public CorsWebFilter corsWebFilter() {
        System.out.println("+=================================FUC");
        CorsConfiguration corsConfig = new CorsConfiguration();

      //  String[] allowedOrigins = {"http://localhost:3000"};
        corsConfig.addAllowedOrigin("*"); // Allow all origins
        corsConfig.addAllowedMethod("*"); // Allow all methods (GET, POST, PUT, DELETE, etc.)
        corsConfig.addAllowedHeader("*"); // Allow all headers
        corsConfig.setAllowCredentials(false); // Allow credentials like cookies, authorization headers
        corsConfig.setMaxAge(3600L); // Max age of CORS options pre-flight request

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}
