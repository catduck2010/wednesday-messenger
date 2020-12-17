package com.wednesday.helper;

import javax.persistence.EntityManager;

public class Util {
    public static void flushNClear(EntityManager em){
        em.flush();
        em.clear();
    }
}
