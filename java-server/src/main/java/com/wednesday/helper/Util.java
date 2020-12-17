package com.wednesday.helper;

import com.google.gson.Gson;
import com.wednesday.model.User;

import javax.persistence.EntityManager;

public class Util {
    private static Gson gson = null;

    public static void flushNClear(EntityManager em) {
        em.flush();
        em.clear();
    }

    public static Gson fetchGson() {
        if (gson == null) {
            gson = new Gson();
        }
        return gson;
    }

    public static String toJSON(Object o){
        Gson g = fetchGson();
        return g.toJson(o);
    }

}
