package com.wednesday.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
public class User {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid4")
    String _id;

    String username;
    String nickname;
    String sessionId;
    String password;
    @OneToMany
    Set<User> friendList;
    @OneToMany
    Set<User> blockList;
    @OneToMany
    Set<Chat> chatList;

    public User() {

    }

    public User(String username, String nickname, String password) {
        this._id = UUID.randomUUID().toString();
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.friendList = new HashSet<>();
        this.blockList = new HashSet<>();
        this.chatList = new HashSet<>();
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
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

    public Set<User> getFriendList() {
        return friendList;
    }

    public void setFriendList(Set<User> friendList) {
        this.friendList = friendList;
    }

    public Set<User> getBlockList() {
        return blockList;
    }

    public void setBlockList(Set<User> blockList) {
        this.blockList = blockList;
    }

    public Set<Chat> getChatList() {
        return chatList;
    }

    public void setChatList(Set<Chat> chatList) {
        this.chatList = chatList;
    }
}
