package com.wednesday.dao;

import com.wednesday.model.Message;
import org.hibernate.annotations.Proxy;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

@Transactional
@Scope(proxyMode = ScopedProxyMode.DEFAULT)
@Proxy(lazy = false)
@Repository("messageDao")
public class MessageDao {
    private EntityManager em;

    public MessageDao() {

    }

    public void persist(Message m) {

    }


    public Message get(String mId) {
        Query q = em.createNativeQuery("FROM messages WHERE id = :id");
        q.setParameter("id", mId);
        Message m = (Message) q.getSingleResult();
        return m;
    }


    public void merge(Message m) {

    }


    public void delete(Message m) {

    }

    @Transactional
    public void setEntityManager(EntityManager entityManager) {
        em = entityManager;
    }
}
