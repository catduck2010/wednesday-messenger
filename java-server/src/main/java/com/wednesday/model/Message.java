package com.wednesday.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Proxy;
import org.springframework.stereotype.Indexed;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity(name = "message")
@Table(name = "messages")
@Proxy(lazy = false)
@Indexed
public class Message {
    public final static String DEFAULT_TYPE = "text";
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    String userId;
    String chatId;
    String type;
    String content;
    Timestamp time;

    public Message() {
        this.type = DEFAULT_TYPE;
    }

    public Message(String userId, String chatId, String content) {
        this.userId = userId;
        this.chatId = chatId;
        this.type = DEFAULT_TYPE;
        this.content = content;
        this.time = new Timestamp(System.currentTimeMillis());
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
