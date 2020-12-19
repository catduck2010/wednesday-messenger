package com.wednesday.controller;

import com.wednesday.helper.MakeResponse;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class UserRestController {

    @Autowired
    private UserManager um;

    @Autowired
    private ChatManager cm;

//    @GetMapping(value = "/testuser", produces = "application/json")
//    public String firstUser() {
//        User u = um.get("zawarudo");
//        return Util.fetchGson().toJson(u);
//    }

    @PostMapping(value = "/users",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createUser(User user) {
        String passwd = Pbkdf2.encode(user.getPassword());
        user.setPassword(passwd);
        um.create(user);
        return MakeResponse.okJson(Util.fetchGson().toJson(user));
    }

    @GetMapping(value = "/users",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllUsers() {
        List l = um.getAllUsers();
        return MakeResponse.okJson(Util.fetchGson().toJson(l));
    }

    @GetMapping(value = "/users/{username}")
    public ResponseEntity<String> getUser(@PathVariable String username) {
        return MakeResponse.okJson(Util.fetchGson().toJson(um.get(username)));
    }

    @GetMapping(value = "/users/id/{userId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getUserById(@PathVariable String userId) {
        return MakeResponse.okJson(Util.fetchGson().toJson(um.getById(userId)));
    }

    @PutMapping(value = "/users/id/{userId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateUserById(@PathVariable String userId) {
        return MakeResponse.okJson(Util.fetchGson().toJson(um.getById(userId)));
    }

    @DeleteMapping(value = "/users/id/{userId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateUser(@PathVariable String userId) {
        return MakeResponse.okJson(Util.fetchGson().toJson(um.getById(userId)));
    }

    @GetMapping(value = "/users/id/{userId}/chats")
    public ResponseEntity<String> getUserChatInfo(@PathVariable String userId) {
        List l = cm.getAllUserChat(userId);
        return MakeResponse.okJson(Util.fetchGson().toJson(l));
    }

    @GetMapping(value = "/users/id/{userId}/friends")
    public ResponseEntity<String> getUserFriendsInfo(@PathVariable String userId) {
        List l = um.getUserFriends(userId);
        return MakeResponse.okJson(Util.fetchGson().toJson(l));
    }

    @ModelAttribute
    public void setCORSHeaders(HttpServletResponse res){
        Util.setCorsHeaders(res);
    }




}
