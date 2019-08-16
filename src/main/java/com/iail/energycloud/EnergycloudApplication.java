package com.iail.energycloud;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value = "com.iail.energycloud.mapper.**")
@SpringBootApplication
public class EnergycloudApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnergycloudApplication.class, args);
    }

}
