package com.wednesday.helper;

import com.wednesday.model.User;
import com.wednesday.service.SessionWorker;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class UserManager {
    private SessionFactory factory = SessionWorker.getFactory();

    public void createUser() {
        Session ses = factory.openSession();
        Transaction tr = null;
        try {
            tr = ses.beginTransaction();
        } catch (Exception e) {

        } finally {
            ses.close();
        }
    }

    public List<User> listUsers() {
        List users = null;
        Transaction tr = null;
        try (Session ses = factory.openSession()) {
            tr = ses.beginTransaction();
            users = ses.createQuery("from User").list();
            tr.commit();
        } catch (Exception e) {
            if (tr != null) tr.rollback();
        }
        return users;
    }

    public void updateUser(User u){

    }


}
