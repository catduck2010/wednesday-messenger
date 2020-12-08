package com.wednesday.service;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

@Service
public class SessionWorker implements ApplicationListener<ContextRefreshedEvent> {
    private static SessionFactory factory;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        getInstance();
    }

    private static SessionFactory getInstance() {
        if (factory == null) {
            factory = new Configuration().configure().buildSessionFactory();
        }
        return factory;
    }

    public static SessionFactory getFactory(){
        return getInstance();
    }
}
