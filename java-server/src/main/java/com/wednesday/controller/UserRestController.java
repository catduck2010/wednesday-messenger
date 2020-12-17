package com.wednesday.controller;

import com.wednesday.model.User;
import com.wednesday.service.manager.UserManager;
import io.netty.handler.codec.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {
    @Autowired
    private UserManager um;

    @GetMapping("/testuser")
    private User firstUser(){
        User u = um.getById("a602400f-449f-7076-3a86-c1447bcaffc8");
        return u;
    }

}
