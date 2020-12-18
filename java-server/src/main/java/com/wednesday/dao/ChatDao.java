package com.wednesday.dao;

import com.wednesday.model.Chat;
import org.hibernate.annotations.Proxy;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.util.List;

@Transactional
@Scope(proxyMode = ScopedProxyMode.DEFAULT)
@Proxy(lazy = false)
@Repository("chatDao")
public class ChatDao {
    //    @PersistenceContext(unitName = "ogm-mongodb",type = PersistenceContextType.EXTENDED)
    private EntityManager em;

    public ChatDao() {

    }

    public void persist(Chat c) {
        em.persist(c);
    }

    public Chat get(String chatId) {
        String query = "db.chats.find({ '_id' : '" + chatId + "' })";
        Chat c = (Chat) em.createNativeQuery(query, Chat.class).getSingleResult();
        return c;
    }

    public void merge(Chat c) {
        em.merge(c);
    }

    public void delete(String chatId) {
        Chat c = new Chat();
        c.setId(chatId);
        em.remove(c);
    }

    public List getUserChats(String userId) {
        String query = "db.chats.find({'users' : {$in : ['" + userId + "']}})";
        List list = em.createNativeQuery(query, Chat.class).getResultList();
        return list;
    }

    @Transactional
    public void setEntityManager(EntityManager entityManager) {
        em = entityManager;
    }
}
