package com.wednesday.dao.impl;

import com.wednesday.dao.MessageDao;
import com.wednesday.model.Message;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
public class MessageDaoImpl implements MessageDao {

    @Override
    public void persist(Message m) {

    }

    @Override
    public Message get(String mId) {
        return null;
    }

    @Override
    public void update(Message m) {

    }

    @Override
    public void delete(Message m) {

    }
}
