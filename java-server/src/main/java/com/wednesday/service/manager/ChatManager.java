package com.wednesday.service.manager;

import com.wednesday.dao.ChatDao;
import com.wednesday.dao.MessageDao;
import com.wednesday.model.Chat;
import org.hibernate.annotations.Proxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@Proxy(lazy = false)
@Repository("chatManager")
public class ChatManager {
    @Autowired
    private ChatDao cDao;
    @Autowired
    private MessageDao mDao;
    public void create(Chat c){
        cDao.persist(c);
    }

    public void update(Chat c){
        cDao.merge(c);
    }

    public Chat getInfo(String chatId){
        return cDao.get(chatId);
    }

    public void delete(String chatId){
        cDao.delete(chatId);
    }

    public List getAllUserChat(String userId){
        return cDao.getUserChats(userId);
    }

    public List getChatMessages(String chatId){
        return mDao.getChatMessages(chatId);
    }
}
