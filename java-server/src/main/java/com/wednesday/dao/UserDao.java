package com.wednesday.dao;


import com.wednesday.helper.Util;
import com.wednesday.model.User;
import org.hibernate.annotations.Proxy;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.orm.jpa.support.SharedEntityManagerBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PostLoad;
import java.util.List;
import java.util.Set;

@Transactional
@Scope(proxyMode = ScopedProxyMode.DEFAULT)
@Proxy(lazy = false)
@Repository("userDao")
public class UserDao {

    private EntityManager em;

    public UserDao() {
//        em = emw.getEntityManager();
    }

    @PostLoad
    public void init() {

    }

    @javax.transaction.Transactional
    public void persist(User u) {
        em.persist(u);
    }


    public void newSession(String username, String sessionId) {

    }

    public List getAllUsers() {
        String query = "db.users.find({})";
        List list = em.createNativeQuery(query, User.class).getResultList();
        return list;
    }

    @javax.transaction.Transactional
    public User get(String username) {
//        FullTextEntityManager ftem = Search.getFullTextEntityManager(em);
//
//        QueryBuilder qb = ftem.getSearchFactory().buildQueryBuilder()
//                .forEntity(User.class)
//                .get();
//
//        org.apache.lucene.search.Query q = qb.keyword()
//                .onField("username")
//                .matching(username)
//                .createQuery();
//
//        FullTextQuery ftQuery = ftem.createFullTextQuery(q, User.class);
//
//        User user = (User) ftQuery.getSingleResult();

        String query = "db.users.find({'username':'" + username + "'})";
        User u = (User) em.createNativeQuery(query, User.class).getSingleResult();
        return u;
    }

    @javax.transaction.Transactional
    public User find(String userId) {
        String query = "db.users.find({ '_id' : '" + userId + "' })";
        User u = (User) em.createNativeQuery(query, User.class).getSingleResult();
        return u;
    }

    public void search(String userId) {

    }


    public void merge(User u) {
        em.merge(u);
    }


    public void delete(String userId) {
        User u = new User();
        u.setId(userId);
        em.remove(u);
        Util.flushNClear(em);
    }

    public List getFriends(String userId) {
        User u = find(userId);
        Set<String> set = u.getFriendList();
        String query = "db.users.find({ '_id' : { $in: " + set.toString() + " })";
        List list = em.createNativeQuery(query, User.class).getResultList();
        return list;
    }

    @Transactional
    public void setEntityManager(EntityManager entityManager) {
        em = entityManager;
    }
}
