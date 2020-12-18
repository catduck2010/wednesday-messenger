package com.wednesday.controller;

import com.wednesday.helper.Util;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import com.wednesday.service.manager.ChatManager;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class ChatRestController {
    @Autowired
    private ChatManager cm;
    @Autowired
    private UserManager um;


    @RequestMapping(value = "/chats",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.POST,
            produces = "application/json")
    public String newChat(ChatExtended ce) {

        cm.create(ce);
        User u = um.getById(ce.userId);
        u.getChatList().add(ce.getId());
        um.update(u);

        return Util.fetchGson().toJson(ce);
    }

    @RequestMapping(value = "/chats/{chatId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public String getChatInfo(@PathVariable String chatId) {
        Chat c = cm.getInfo(chatId);
        return Util.fetchGson().toJson(c);
    }

    @RequestMapping(value = "/chats/{chatId}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.PUT,
            produces = "application/json")
    public String editChatInfo(@PathVariable String chatId, Chat c) {
        c.setId(chatId);
        cm.update(c);
        return Util.fetchGson().toJson(c);
    }

    @RequestMapping(value = "/chats/{chatId}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.DELETE,
            produces = "application/json")
    public String deleteChat(@PathVariable String chatId) {
        cm.delete(chatId);
        return Util.fetchGson().toJson(new SimpleMessage("success"));
    }

    static class ChatExtended extends Chat {
        String sessionId, userId;
    }

    static class SimpleMessage{
        String message;
        SimpleMessage(){

        }
        SimpleMessage(String m){
            message = m;
        }
    }
}
