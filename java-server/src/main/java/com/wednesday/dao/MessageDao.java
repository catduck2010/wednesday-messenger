package com.wednesday.dao;

import com.wednesday.helper.Util;
import com.wednesday.model.Message;
import org.hibernate.annotations.Proxy;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Transactional
@Scope(proxyMode = ScopedProxyMode.DEFAULT)
@Proxy(lazy = false)
@Repository("messageDao")
public class MessageDao {
    private EntityManager em;

    public MessageDao() {

    }

    public void persist(Message m) {
        em.persist(m);
    }


    public Message get(String mId) {
        String query = "db.messages.find({ '_id' : '" + mId + "' })";
        Message m = (Message) em.createNativeQuery(query, Message.class).getSingleResult();
        return m;
    }


    public void merge(Message m) {
        em.merge(m);
    }


    public void delete(String mId) {
        Message u = new Message();
        u.setId(mId);
        em.remove(u);
        Util.flushNClear(em);
    }

    public List getChatMessages(String chatId){
        String query = "db.messages.find({'chatId' : '"+chatId+"'})";
        List list = em.createNativeQuery(query, Message.class).getResultList();
        return list;
    }

    @Transactional
    public void setEntityManager(EntityManager entityManager) {
        em = entityManager;
    }
}
