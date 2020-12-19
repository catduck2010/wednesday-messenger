package com.wednesday.controller;

import com.google.gson.Gson;
import com.wednesday.dao.MessageDao;
import com.wednesday.helper.MakeResponse;
import com.wednesday.helper.Util;
import com.wednesday.model.Message;
import com.wednesday.service.manager.MessageManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

//@CrossOrigin(origins = "*", maxAge = 3600)
@Transactional
@RestController
public class MessageRestController {
    @Autowired
    MessageManager mm;


    @PostMapping(value = "/messages",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> newMessage(@RequestBody String body){
        MessageExtended m = Util.fetchGson().fromJson(body, MessageExtended.class);
        Gson g = Util.fetchGson();
        mm.create(m);
        return MakeResponse.okJson(g.toJson(m));
    }

    @PostMapping(value = "/messages/{messageId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postToGetMessage(@PathVariable String messageId){
        Gson g = Util.fetchGson();
        Message m = mm.get(messageId);
        return MakeResponse.okJson(g.toJson(m));
    }

    @PutMapping(value = "/messages/{messageId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> editMessage(@PathVariable String messageId, @RequestBody String body){
        MessageExtended m = Util.fetchGson().fromJson(body, MessageExtended.class);
        Gson g = Util.fetchGson();
        m.setId(messageId);
        mm.update(m);
        return MakeResponse.okJson(g.toJson(m));
    }

    @DeleteMapping(value = "/messages/{messageId}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteMessage(@PathVariable String messageId){
        mm.delete(messageId);
        SimpleMessage sm = new SimpleMessage("success");
        return MakeResponse.okJson(Util.fetchGson().toJson(sm));
    }

//    @RequestMapping(value = "/messages/test", method = RequestMethod.GET, produces = "application/json")
//    public String testMessage(){
//        Gson g =Util.fetchGson();
//        Message m = mm.get("350870f5-e001-591d-a7cf-5bd5f090e92f");
////        MessageExtended me = (MessageExtended) m;
////        me.setSessionId("kokosuki");
//        return g.toJson(m);
//    }


    static class MessageExtended extends Message{
        String sessionId;

        public String getSessionId() {
            return sessionId;
        }

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }
    }

    static class SimpleMessage {
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
    @ModelAttribute
    public void setCORSHeaders(HttpServletResponse res){
        Util.setCorsHeaders(res);
    }
}
