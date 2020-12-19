package com.wednesday.helper;

import com.google.gson.Gson;
import com.wednesday.model.User;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletResponse;

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

    public static void setCorsHeaders(HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers",
                "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                        "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, " +
                        "X-Access-Token, XKey, Authorization");
    }

}
