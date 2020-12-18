package com.wednesday.controller;

import com.google.gson.Gson;
import com.wednesday.dao.MessageDao;
import com.wednesday.helper.Util;
import com.wednesday.model.Message;
import com.wednesday.service.manager.MessageManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class MessageRestController {
    @Autowired
    MessageManager mm;

    class MessageExtended extends Message{
        String sessionId;

        public String getSessionId() {
            return sessionId;
        }

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }
    }

    class SimpleMessage {
        String message;
        SimpleMessage(){}
        SimpleMessage(String m){
            message = m;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @RequestMapping(value = "/messages",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.POST,
            produces = "application/json")
    public String newMessage(MessageExtended m){
        Gson g = Util.fetchGson();
        mm.create(m);
        return g.toJson(m);
    }

    @RequestMapping(value = "/messages/{messageId}",
            method = RequestMethod.POST,
            produces = "application/json")
    public String postToGetMessage(@PathVariable String messageId){
        Gson g = Util.fetchGson();
        Message m = mm.get(messageId);
        return g.toJson(m);
    }

    @RequestMapping(value = "/messages/{messageId}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.PUT,
            produces = "application/json")
    public String editMessage(@PathVariable String messageId, MessageExtended m){
        Gson g = Util.fetchGson();
        m.setId(messageId);
        mm.update(m);
        return g.toJson(m);
    }

    @RequestMapping(value = "/messages/{messageId}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            method = RequestMethod.DELETE,
            produces = "application/json")
    public String deleteMessage(@PathVariable String messageId){
        Gson g = Util.fetchGson();
        mm.delete(messageId);
        SimpleMessage sm = new SimpleMessage("success");
        return g.toJson(sm);
    }

    @RequestMapping(value = "/messages/test", method = RequestMethod.GET, produces = "application/json")
    public String testMessage(){
        Gson g =Util.fetchGson();
        Message m = mm.get("350870f5-e001-591d-a7cf-5bd5f090e92f");
//        MessageExtended me = (MessageExtended) m;
//        me.setSessionId("kokosuki");
        return g.toJson(m);
    }
}
