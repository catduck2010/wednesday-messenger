package com.wednesday.helper;

import javafx.util.Pair;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UserMap {

    private final Map<String, Pair<UUID, UUID>> userMap;// Pair<SessionId, SocketId>
    private final Map<UUID, String> sessionMap;
    private final Map<UUID, String> socketMap;

    public UserMap() {
        userMap = new HashMap<>();
        sessionMap = new HashMap<>();
        socketMap = new HashMap<>();
    }

    /**
     * put user login details into the map
     * @param userId user id
     * @param socketId socket id
     * @param sessionId session id
     */
    public void put(String userId, UUID socketId, UUID sessionId) {
        removeUser(userId);

        userMap.put(userId, new Pair<>(sessionId, socketId));
        sessionMap.put(sessionId, userId);
        socketMap.put(socketId, userId);
    }

    public Pair<UUID, UUID> get(String userId) {
        return userMap.getOrDefault(userId, null);
    }

    public UUID getSessionId(String userId){
        return this.get(userId).getKey();
    }

    public UUID getSocketId(String userId){
        return this.get(userId).getValue();
    }

    public void remove(UUID socketId) {
        String userId = socketMap.getOrDefault(socketId, null);
        if (userId != null) {
            removeUser(userId);
        }
    }

    public boolean checkOnline(String userId) {
        return userMap.containsKey(userId);
    }

    private void removeUser(String userId) {
        Pair<UUID, UUID> doc = userMap.getOrDefault(userId, null);
        if (doc != null) {
            sessionMap.remove(doc.getKey());
            socketMap.remove(doc.getValue());
            userMap.remove(userId);
        }
    }

    private boolean trySession(UUID sessionId, String userId) {
        return userId.equals(sessionMap.getOrDefault(sessionId, null));
    }

    public void genuine(UUID sessionId, String userId){

    }
}
