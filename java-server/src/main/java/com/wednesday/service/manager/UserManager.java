package com.wednesday.service.manager;

import com.wednesday.dao.ChatDao;
import com.wednesday.dao.UserDao;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.*;
import java.util.List;
import java.util.Set;

@Transactional
@Repository("userManager")
public class UserManager {
    @Autowired
    private UserDao dao;
    @Autowired
    private ChatDao chatDao;

    public void create(User u) {
        dao.persist(u);
    }

    public User search(String username) {
        return dao.get(username);
    }

    public User getById(String userId){
        return dao.find(userId);
    }

    public boolean newSession(String username, String sessionId) {
        User u = dao.get(username);
        if (u != null) {
            u.setSessionId(sessionId);
            dao.merge(u);
            return true;
        }
        return false;
    }

    public void delete(String userId) {
        dao.delete(userId);
    }

    public void update(User u){
        dao.merge(u);
    }

    public void addChat(Set<String> users, String chatId){
        Chat c = new Chat(users);
        chatDao.persist(c);

    }

    public void removeChat(Set<String> users, String chatId){

    }


}
