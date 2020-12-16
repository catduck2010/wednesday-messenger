package com.wednesday.dao.impl;

import com.wednesday.dao.ChatDao;
import com.wednesday.model.Chat;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class ChatDaoImpl implements ChatDao {
    @Override
    public void persist(Chat c) {

    }

    @Override
    public Chat get(String chatId) {
        return null;
    }

    @Override
    public void update(Chat c) {

    }

    @Override
    public void delete(String chatId) {

    }
}
