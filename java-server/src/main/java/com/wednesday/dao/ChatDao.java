package com.wednesday.dao;

import com.wednesday.model.Chat;

public interface ChatDao {
    void persist(Chat c);
    Chat get(String chatId);
    void update(Chat c);
    void delete(String chatId);
}
