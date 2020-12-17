package com.wednesday.controller;

import com.wednesday.helper.Util;
import com.wednesday.model.User;
import com.google.gson.Gson;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Transactional
@RestController
public class UserRestController {

    @Autowired
    private UserManager um;

    @GetMapping("/testuser")
    public String firstUser() {
        Gson g = Util.fetchGson();
        User u = um.getById("a602400f-449f-7076-3a86-c1447bcaffc8");
        return g.toJson(u);
    }

    public String createUser(String username, String passwd, String nickname) {
        return null;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public String getAllUsers() {
        Gson g = Util.fetchGson();
        List l = um.getAllUsers();
        return g.toJson(l);
    }

}
