package com.wednesday.dao;

import com.wednesday.model.Chat;
import org.springframework.context.annotation.Bean;

public interface ChatDao {
    void persist(Chat c);
    Chat get(String chatId);
    void merge(Chat c);
    void delete(String chatId);
}
