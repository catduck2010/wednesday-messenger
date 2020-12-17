package com.wednesday.service.manager;

import com.wednesday.dao.ChatDao;
import com.wednesday.model.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("chatManager")
public class ChatManager {
    @Autowired
    private ChatDao dao;
    public void create(Chat c){

    }
}
