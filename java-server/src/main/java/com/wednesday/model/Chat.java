package com.wednesday.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity(name = "chat")
@Table(name = "chats")
public class Chat {
    @Id
    String id;
    String chatName;
    @OneToMany
    Set<User> users;
    public Chat(Set<User> users){
        this.users = users;
    }

    public Chat() {

    }
}
