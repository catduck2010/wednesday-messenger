package com.wednesday.dao;

import com.wednesday.model.User;

public interface UserDao {
    void persist(User u);

    void newSession(String username, String sessionId);

    /**
     * Use username to get a user
     * @param username username
     * @return matched user
     */
    User get(String username);

    /**
     * Use userId to get a user
     * @param userId userId
     * @return matched user
     */
    User find(String userId);

    void search(String username);

    void merge(User u);

    void delete(String userId);
}
