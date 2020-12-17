package com.wednesday.controller;

import com.google.gson.Gson;
import com.wednesday.dao.MessageDao;
import com.wednesday.helper.Util;
import com.wednesday.model.Message;
import com.wednesday.service.manager.MessageManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    @RequestMapping(value = "/messages", method = RequestMethod.POST, produces = "application/json")
    public String newMessage(MessageExtended m){
        Gson g = Util.fetchGson();
        mm.create(m);
        return g.toJson((Message)m);
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
