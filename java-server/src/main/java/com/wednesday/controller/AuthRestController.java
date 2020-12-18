package com.wednesday.controller;

import com.google.gson.Gson;
import com.wednesday.helper.Pbkdf2;
import com.wednesday.helper.Util;
import com.wednesday.model.User;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@Transactional
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthRestController {
    @Autowired
    private UserManager um;

    static class UserPass {
        String username, password;

        UserPass() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class SimpleMessage {
        String message;

        SimpleMessage() {

        }

        SimpleMessage(String s) {
            message = s;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    static class LoginDetail {
        String message, userId, sessionId;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getSessionId() {
            return sessionId;
        }

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }
    }

    static class SimpleUUID {
        String uuid;

        SimpleUUID() {
            uuid = UUID.randomUUID().toString();
        }

        public String getUuid() {
            return uuid;
        }

        public void setUuid(String uuid) {
            this.uuid = uuid;
        }
    }

    @RequestMapping(value = "/users/login",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.POST,
            produces = "application/text")
    public String verify(UserPass up) {
        String json;
        System.out.println("Username" + up.username);
        System.out.println("Password" + up.password);

        Gson g = Util.fetchGson();
        String username = up.username;
        String password = up.password;

        User u = um.get(username);
        String hash = u.getPassword();

        if (Pbkdf2.verification(password, hash)) {
            LoginDetail ld = new LoginDetail();
            ld.message = "Logged In";
            ld.sessionId = UUID.randomUUID().toString();
            ld.userId = u.getId();
            json = g.toJson(ld);
        } else {
            SimpleMessage msg = new SimpleMessage();
            msg.message = "Incorrect username or password.";
            json = g.toJson(msg);
        }


        return json;
    }

    @RequestMapping(value = "/uuid",
            method = RequestMethod.GET,
            produces = "application/json")
    public String getUUID() {
        return Util.fetchGson().toJson(new SimpleUUID());
    }
}
