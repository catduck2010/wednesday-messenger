package com.wednesday.service.manager;

import com.wednesday.dao.ChatDao;
import com.wednesday.dao.UserDao;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import org.hibernate.annotations.Proxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Transactional
@Service
@Proxy(lazy = false)
@Repository("userManager")
public class UserManager {
    @Autowired
    private UserDao dao;
    @Autowired
    private ChatDao chatDao;

    public void create(User u) {
        dao.persist(u);
    }

    public User get(String username) {
        return dao.get(username);
    }

    @Transactional
    public User getById(String userId){
        return dao.find(userId);
    }

    public List getAllUsers(){
        return dao.getAllUsers();
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
        dao.attachChat(users, chatId);

    }

    public void removeChat(Set<String> users, String chatId){

    }

    public List getUserFriends(String userId){
        return dao.getFriends(userId);
    }


}
