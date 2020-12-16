package com.wednesday.dao;

import com.wednesday.model.User;

public interface UserDao {
    void persist(User u);

    void newSession(String username, String sessionId);

    User get(String username);

    User find(String userId);

    void search(String username);

    void update(String userId);

    void delete(String userId);
}
