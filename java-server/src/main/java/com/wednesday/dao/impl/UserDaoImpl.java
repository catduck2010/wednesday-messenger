package com.wednesday.dao.impl;

import com.wednesday.dao.UserDao;
import com.wednesday.model.User;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.annotation.PostConstruct;
import javax.persistence.*;
import javax.persistence.Query;
import javax.transaction.*;
import java.util.Collections;
import java.util.List;

@Transactional
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager em;


    @Override
    public void persist(User u) {
        em.persist(u);
    }

    @Override
    public void newSession(String username, String sessionId) {

    }

    @Override
    public User get(String username) {
        String query = "{$query:{ username : '" + username + "' }}";
        User u = (User) em.createNativeQuery(query, User.class).getSingleResult();
        return null;
    }

    @Override
    public User find(String userId) {
        return null;
    }

    @Override
    public void search(String username) {

    }

    @Override
    public void update(String userId) {

    }

    @Override
    public void delete(String userId) {

    }
}
