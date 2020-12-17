package com.wednesday.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity(name = "user")
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    String id;
    String username;
    String nickname;
    String sessionId;
    String password;
    @ElementCollection
    Set<String> friendList;
    @ElementCollection
    Set<String> blockList;
    @ElementCollection
    Set<String> chatList;

    public User() {

    }

    public User(String username, String nickname, String password) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.friendList = new HashSet<>();
        this.blockList = new HashSet<>();
        this.chatList = new HashSet<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getFriendList() {
        return friendList;
    }

    public void setFriendList(Set<String> friendList) {
        this.friendList = friendList;
    }

    public Set<String> getBlockList() {
        return blockList;
    }

    public void setBlockList(Set<String> blockList) {
        this.blockList = blockList;
    }

    public Set<String> getChatList() {
        return chatList;
    }

    public void setChatList(Set<String> chatList) {
        this.chatList = chatList;
    }
}
