package com.wednesday.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Chat {
    @Id
    String _id;
    String chatName;
    @OneToMany
    Set<User> users;
    public Chat(Set<User> users){
        this.users = users;
    }

    public Chat() {

    }
}
