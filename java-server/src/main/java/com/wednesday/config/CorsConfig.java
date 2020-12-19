package com.wednesday.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With",
                               "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers",
                               "X-Access-Token", "XKey", "Authorization","Access-Control-Allow-Origin")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .maxAge(3600);

    }

}
