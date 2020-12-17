package com.wednesday.dao.impl;

import com.wednesday.dao.UserDao;
import com.wednesday.helper.Util;
import com.wednesday.model.User;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
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
import javax.transaction.*;
import java.util.Collections;
import java.util.List;

@Transactional
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Repository("userDao")
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
        FullTextEntityManager ftem = Search.getFullTextEntityManager(em);

        QueryBuilder qb = ftem.getSearchFactory().buildQueryBuilder()
                .forEntity(User.class)
                .get();

        org.apache.lucene.search.Query q = qb.keyword()
                .onField("username")
                .matching(username)
                .createQuery();

        FullTextQuery ftQuery = ftem.createFullTextQuery(q, User.class);

        User user = (User) ftQuery.getSingleResult();

//        String query = "{$query:{ username : '" + username + "' }}";
//        User u = (User) em.createNativeQuery(query, User.class).getSingleResult();
        return user;
    }

    @Override
    public User find(String userId) {
        FullTextEntityManager ftem = Search.getFullTextEntityManager(em);

        QueryBuilder qb = ftem.getSearchFactory().buildQueryBuilder()
                .forEntity(User.class)
                .get();
        Query q = qb.keyword().onField("id").matching(userId).createQuery();

        FullTextQuery ftQuery = ftem.createFullTextQuery(q, User.class);

        User user = (User) ftQuery.getSingleResult();

        return user;
    }

    @Override
    public void search(String userId) {

    }

    @Override
    public void merge(User u) {
        em.merge(u);
    }

    @Override
    public void delete(String userId) {
        User u = new User();
        u.setId(userId);
        em.remove(u);
        Util.flushNClear(em);
    }
}
