package com.wednesday.helper;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class MakeResponse {
    public static ResponseEntity<String> okJson(String s){
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(s);
    }

    public static ResponseEntity<String> errorJson(String s){
        return ResponseEntity.status(403)
                .contentType(MediaType.APPLICATION_JSON)
                .body(s);
    }
}
