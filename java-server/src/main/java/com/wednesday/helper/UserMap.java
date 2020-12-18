package com.wednesday.helper;

import com.corundumstudio.socketio.SocketIOClient;
import javafx.util.Pair;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UserMap {

    private final Map<String, Pair<String, SocketIOClient>> userMap;// Pair<SessionId, SocketId>
    private final Map<String, String> sessionMap;
    private final Map<SocketIOClient, String> socketMap;

    public UserMap() {
        userMap = new HashMap<>();
        sessionMap = new HashMap<>();
        socketMap = new HashMap<>();
    }

    /**
     * put user login details into the map
     *
     * @param userId    user id
     * @param client  socket id
     * @param sessionId session id
     */
    public void put(String userId, SocketIOClient client, String sessionId) {
        removeUser(userId);

        userMap.put(userId, new Pair<>(sessionId, client));
        sessionMap.put(sessionId, userId);
        socketMap.put(client, userId);
    }

    public Pair<String, SocketIOClient> get(String userId) {
        return userMap.getOrDefault(userId, null);
    }

    public String getSessionId(String userId) {
        return this.get(userId).getKey();
    }

    public SocketIOClient getClient(String userId) {
        return this.get(userId).getValue();
    }

    public void remove(SocketIOClient client) {
        String userId = socketMap.getOrDefault(client, null);
        if (userId != null) {
            removeUser(userId);
        }
    }

    public boolean checkOnline(String userId) {
        return userMap.containsKey(userId);
    }

    private void removeUser(String userId) {
        Pair<String, SocketIOClient> doc = userMap.getOrDefault(userId, null);
        if (doc != null) {
            sessionMap.remove(doc.getKey());
            socketMap.remove(doc.getValue());
            userMap.remove(userId);
        }
    }

    private boolean trySession(UUID sessionId, String userId) {
        return userId.equals(sessionMap.getOrDefault(sessionId, null));
    }

    public void genuine(UUID sessionId, String userId) {

    }
}
