package com.wednesday.dao.impl;

import com.wednesday.dao.ChatDao;
import com.wednesday.model.Chat;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Transactional
//@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Repository("chatDao")
public class ChatDaoImpl implements ChatDao {
    @PersistenceContext
    private EntityManager em;

    @Override
    public void persist(Chat c) {
em.persist(c);
    }

    @Override
    public Chat get(String chatId) {

    return null;
    }

    @Override
    public void merge(Chat c) {
        em.merge(c);
    }

    @Override
    public void delete(String chatId) {

    }
}
