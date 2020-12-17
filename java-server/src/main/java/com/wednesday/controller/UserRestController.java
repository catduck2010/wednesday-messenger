package com.wednesday.controller;

import com.wednesday.helper.Pbkdf2;
import com.wednesday.helper.Util;
import com.wednesday.model.User;
import com.google.gson.Gson;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Transactional
@RestController
public class UserRestController {

    @Autowired
    private UserManager um;

    @GetMapping(value = "/testuser", produces = "application/json")
    public String firstUser() {
        Gson g = Util.fetchGson();
        User u = um.getById("a602400f-449f-7076-3a86-c1447bcaffc8");
        return g.toJson(u);
    }

    @RequestMapping(value = "/users",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = "application/json",
            method = RequestMethod.POST)
    public String createUser(User user) {
        Gson g = Util.fetchGson();
        String passwd = Pbkdf2.encode(user.getPassword());
        user.setPassword(passwd);
        um.create(user);
        return g.toJson(user);
    }

    @RequestMapping(value = "/users",
            method = RequestMethod.GET,
            produces = "application/json")
    public String getAllUsers() {
        Gson g = Util.fetchGson();
        List l = um.getAllUsers();
        return g.toJson(l);
    }

}
