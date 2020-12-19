package com.wednesday.controller;

import com.wednesday.helper.MakeResponse;
import com.wednesday.helper.Util;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import com.wednesday.service.manager.ChatManager;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class ChatRestController {
    @Autowired
    private ChatManager cm;
    @Autowired
    private UserManager um;


    @PostMapping(value = "/chats",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> newChat(@RequestBody String body) {
        NewChatInfo ce = Util.fetchGson().fromJson(body, NewChatInfo.class);
        // create new chat in db
        Chat c = new Chat();
        c.setChatName(ce.getChatName());
        Set<String> userSet = new HashSet<>();
        Collections.addAll(userSet, ce.getUsers());
        c.setUsers(userSet);
        cm.create(c);
        // add chat to creator's chat list
        um.addChat(userSet, c.getId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Util.fetchGson().toJson(ce));
    }

    @GetMapping(value = "/chats/{chatId}")
    public ResponseEntity<String> getChatInfo(@PathVariable String chatId) {
        Chat c = cm.getInfo(chatId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Util.fetchGson().toJson(c));
    }

    @GetMapping(value = "/chats/get/{chatId}")
    public ResponseEntity<String> postToGetChatMessage(@PathVariable String chatId){
        List l = cm.getChatMessages(chatId);
        return MakeResponse.okJson(Util.fetchGson().toJson(l));
    }

    @PutMapping(value = "/chats/{chatId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> editChatInfo(@PathVariable String chatId, @RequestBody String body) {
        Chat c = Util.fetchGson().fromJson(body, Chat.class);
        c.setId(chatId);
        cm.update(c);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Util.fetchGson().toJson(c));
    }

    @DeleteMapping(value = "/chats/{chatId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteChat(@PathVariable String chatId) {
        cm.delete(chatId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Util.fetchGson().toJson(new SimpleMessage("success")));
    }

    static class NewChatInfo {
        String sessionId, userId, chatName;
        String[] users;

        public String getSessionId() {
            return sessionId;
        }

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getChatName() {
            return chatName;
        }

        public void setChatName(String chatName) {
            this.chatName = chatName;
        }

        public String[] getUsers() {
            return users;
        }

        public void setUsers(String[] users) {
            this.users = users;
        }
    }

    static class SimpleMessage {
        String message;

        SimpleMessage() {

        }

        SimpleMessage(String m) {
            message = m;
        }
    }

    @ModelAttribute
    public void setCORSHeaders(HttpServletResponse res) {
        Util.setCorsHeaders(res);
    }
}
