package com.wednesday.controller;

import com.wednesday.helper.Pbkdf2;
import com.wednesday.helper.Util;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import com.google.gson.Gson;
import com.wednesday.service.manager.ChatManager;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class UserRestController {

    @Autowired
    private UserManager um;

    @Autowired
    private ChatManager cm;

    @GetMapping(value = "/testuser", produces = "application/json")
    public String firstUser() {
        User u = um.get("zawarudo");
        return Util.fetchGson().toJson(u);
    }

    @RequestMapping(value = "/users",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = "application/json",
            method = RequestMethod.POST)
    public String createUser(User user) {
        String passwd = Pbkdf2.encode(user.getPassword());
        user.setPassword(passwd);
        um.create(user);
        return Util.fetchGson().toJson(user);
    }

    @RequestMapping(value = "/users",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.GET,
            produces = "application/json")
    public String getAllUsers() {
        List l = um.getAllUsers();
        return Util.fetchGson().toJson(l);
    }

    @RequestMapping(value = "/users/{username}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.GET,
            produces = "application/json")
    public String getUser(@PathVariable String username) {
        return Util.fetchGson().toJson(um.get(username));
    }

    @RequestMapping(value = "/users/id/{userId}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.GET,
            produces = "application/json")
    public String getUserById(@PathVariable String userId) {
        return Util.fetchGson().toJson(um.getById(userId));
    }

    @RequestMapping(value = "/users/id/{userId}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = "application/json")
    public String updateUserById(@PathVariable String userId) {
        return Util.fetchGson().toJson(um.getById(userId));
    }

    @RequestMapping(value = "/users/id/{userId}",
            method = RequestMethod.DELETE,
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = "application/json")
    public String updateUser(@PathVariable String userId) {
        return Util.fetchGson().toJson(um.getById(userId));
    }

    @RequestMapping(value = "/users/id/{userId}/chats",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.GET,
            produces = "application/json")
    public String getUserChatInfo(@PathVariable String userId) {
        List l = cm.getAllUserChat(userId);
        return Util.fetchGson().toJson(l);
    }

    @RequestMapping(value = "/users/id/{userId}/friends",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.GET,
            produces = "application/json")
    public String getUserFriendsInfo(@PathVariable String userId) {
        List l = um.getUserFriends(userId);
        return Util.fetchGson().toJson(l);
    }





}
