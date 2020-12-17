package com.wednesday.intercepter;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

public class InjectionInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
        //req.setAttribute("purified", "true");
        Enumeration<String> names = req.getParameterNames();
        while (names.hasMoreElements()) {
            String name = names.nextElement();
            String[] values = req.getParameterValues(name);
            for (String value : values) {
                if (checkSQLInject(value.toLowerCase())) {
                    res.setContentType("text/html;charset=UTF-8");
                    res.getWriter().print("SQL Injection Detected.");
                    return false;
                }
                clearXss(value);
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) throws Exception {

    }

    /**
     * check if sql injection exists
     *
     * @param value string
     * @return boolean value
     */
    public boolean checkSQLInject(String value) {
        if (value == null || "".equals(value)) {
            return false;
        }
        String xssStr = "and|or|select|update|delete|drop|truncate|%20|=|-|--|;|'|%|#|+|,|//|/| |\\|!=|(|)";
        String[] xssArr = xssStr.split("\\|");
        for (int i = 0; i < xssArr.length; i++) {
            if (value.contains(xssArr[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * check xss char escape
     *
     * @param value string
     * @return string after processing
     */
    private String clearXss(String value) {
        if (value == null || "".equals(value)) {
            return value;
        }
        value = value.replaceAll("<", "<").replaceAll(">", ">");
        value = value.replaceAll("\\(", "(").replace("\\)", ")");
        value = value.replaceAll("'", "'");
        value = value.replaceAll("eval\\((.*)\\)", "");
        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']",
                "\"\"");
        value = value.replace("script", "");
        return value;
    }


}
