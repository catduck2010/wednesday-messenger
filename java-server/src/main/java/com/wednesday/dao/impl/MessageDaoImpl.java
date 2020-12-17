package com.wednesday.dao.impl;

import com.wednesday.dao.MessageDao;
import com.wednesday.model.Message;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Transactional
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Repository("messageDao")
public class MessageDaoImpl implements MessageDao {
    @PersistenceContext
    private EntityManager em;

    @Override
    public void persist(Message m) {

    }

    @Override
    public Message get(String mId) {
        Query q = em.createNativeQuery("FROM messages WHERE id = :id");
        q.setParameter("id", mId);
        Message m = (Message) q.getSingleResult();
        return m;
    }

    @Override
    public void merge(Message m) {

    }

    @Override
    public void delete(Message m) {

    }
}
