package com.wednesday.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class Message {

    @Id
    private String _id;
    String userId;
    String chatId;
    String type;
    String content;
    Timestamp time;

    public Message() {

    }

    public Message(String userId, String chatId, String content) {
        this._id = UUID.randomUUID().toString();
        this.userId = userId;
        this.chatId = chatId;
        this.type = "text";
        this.content = content;
        this.time = new Timestamp(System.currentTimeMillis());
    }

    public void setId(String id) {
        this._id = id;
    }

    public String getId() {
        return _id;
    }
}
