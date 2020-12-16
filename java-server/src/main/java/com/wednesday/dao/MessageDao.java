package com.wednesday.dao;

import com.wednesday.model.Message;

public interface MessageDao {
    void persist(Message m);
    Message get(String mId);
    void update(Message m);
    void delete(Message m);
}
