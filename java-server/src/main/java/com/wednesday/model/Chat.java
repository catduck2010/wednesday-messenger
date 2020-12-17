package com.wednesday.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "chat")
@Table(name = "chats")
public class Chat {
    public final static String DEFAULT_NAME = "Chat";
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    String id;

    String chatName;
    @ElementCollection
    Set<String> users;

    public Chat() {
        chatName = DEFAULT_NAME;
    }

    public Chat(String chatName){
        this.users = new HashSet<>();
        this.chatName = DEFAULT_NAME;
    }

    public Chat(Set<String> users){
        this.users = users;
        this.chatName = DEFAULT_NAME;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public Set<String> getUsers() {
        return users;
    }

    public void setUsers(Set<String> users) {
        this.users = users;
    }
}
