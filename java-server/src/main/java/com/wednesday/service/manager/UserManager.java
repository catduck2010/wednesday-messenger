package com.wednesday.service.manager;

import com.wednesday.model.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.*;
import java.util.List;

@Transactional
public class UserManager {
    
    @Autowired
    private SessionFactory factory;

    @Autowired
    private EntityManagerFactory entityManagerFactory;
    @Autowired
    private TransactionManager transactionManager;

    public void createUser(User u) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
        TransactionManager tm = com.arjuna.ats.jta.TransactionManager.transactionManager();
        tm.begin();
        EntityManager em = entityManagerFactory.createEntityManager();
        em.persist(u);
        em.close();
        tm.commit();
    }

    public List<User> listUsers() {
        return null;
    }

    public void updateUser(User u){

    }


}
