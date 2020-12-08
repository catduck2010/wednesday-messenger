package com.wednesday.helper;

import com.wednesday.model.Chat;
import com.wednesday.model.User;
import com.wednesday.service.SessionWorker;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

public class ChatManager {

    @Autowired
    private SessionFactory factory;

//    ChatManager() {
//        factory = SessionWorker.getFactory();
//    }

    public void create(Set<User> users) {
        //Session s = factory.openSession();
        Transaction tr = null;
        try (Session s = factory.openSession()) {
            tr = s.beginTransaction();
            Chat c = new Chat(users);
        } catch (Exception e) {
            if (tr != null) tr.rollback();
            e.printStackTrace();
        }
    }

    public void get(String chatId) {
        Session ses = factory.openSession();

    }
}
