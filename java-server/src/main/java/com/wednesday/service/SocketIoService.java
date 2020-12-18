package com.wednesday.service;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.wednesday.helper.UserMap;
import com.wednesday.model.Chat;
import com.wednesday.model.User;
import com.wednesday.service.manager.ChatManager;
import com.wednesday.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

@Service
public class SocketIoService implements ApplicationListener<ContextRefreshedEvent> {

    private SocketIOServer server;
    private UserMap userMap;
    @Autowired
    private UserManager um;
    @Autowired
    private ChatManager cm;

    //private final static int PORT = 7777; // fuck Carrie Lam, the virus to Hong Kong
    private final static int PORT = 8085;
    private final static String HOSTNAME = "127.0.0.1";
    private final static String MESSAGE = "message",
            SUCCESS = "success",
            ERROR_MSG = "error_message",
            NEW_MSG = "new message",
            UPDATE = "update",
            DELETE = "delete",
            SENT = "sent",
            UPDATE_MESSAGE = "update message",
            DELETE_MESSAGE = "delete message";

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

        if (server == null) {
            userMap = new UserMap();
            Configuration config = new Configuration();
            config.setPort(PORT);
            config.setHostname(HOSTNAME);
            server = new SocketIOServer(config);
            addSeveralListeners(server);
        }
    }

    private void addSeveralListeners(SocketIOServer server) {
        server.addConnectListener(client -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user");
            User u = um.getById(userId);
            if (u == null || userId == null) {
                client.sendEvent(ERROR_MSG, "Invalid User");
            } else {
                userMap.put(userId, client, u.getSessionId());
                client.sendEvent(SUCCESS, "User-" + userId + " is connected.");
            }

        });
        server.addDisconnectListener(client -> {
            userMap.remove(client);
        });
        server.addEventListener(MESSAGE, MessageData.class, (client, msgDta, ackRequest) -> {
            try {
                sendInstantMessage(NEW_MSG, msgDta);
                client.sendEvent(SENT, "Message sent to chat!");
            } catch (Exception e) {
                client.sendEvent(ERROR_MSG, e.getMessage());
            }
        });

        addMessageListener(server, UPDATE_MESSAGE, UPDATE);

        addMessageListener(server, DELETE_MESSAGE, DELETE);

    }

    private void addMessageListener(SocketIOServer server, String event, String userEvent) {
        server.addEventListener(event, MessageData.class, (client, msgDta, ackRequest) -> {
            try {
                sendInstantMessage(userEvent, msgDta);
                //client.sendEvent(SENT, "Message sent to chat!");
            } catch (Exception e) {
                client.sendEvent(ERROR_MSG, e.getMessage());
            }
        });
    }

    private void sendInstantMessage(String userEvent, MessageData msgDta) {
        Chat c = cm.getInfo(msgDta.getChatId());
        for (String userId : c.getUsers()) {
            if (!userId.equals(msgDta.getUserId())) {
                SocketIOClient userClient = userMap.getClient(userId);
                userClient.sendEvent(userEvent,
                        new NewMessageNotification(
                                msgDta.getChatId(),
                                msgDta.getMessageId()));
            }
        }
    }

    static class MessageData {
        String userId, sessionId, chatId, messageId;

        MessageData() {
        }

        MessageData(String userId, String sessionId, String chatId, String messageId) {
            this.userId = userId;
            this.sessionId = sessionId;
            this.chatId = chatId;
            this.messageId = messageId;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getSessionId() {
            return sessionId;
        }

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }

        public String getChatId() {
            return chatId;
        }

        public void setChatId(String chatId) {
            this.chatId = chatId;
        }

        public String getMessageId() {
            return messageId;
        }

        public void setMessageId(String messageId) {
            this.messageId = messageId;
        }
    }

    static class NewMessageNotification {
        String chatId, messageId;

        NewMessageNotification() {

        }

        NewMessageNotification(String cId, String mId) {
            this.chatId = cId;
            this.messageId = mId;
        }

        public String getChatId() {
            return chatId;
        }

        public void setChatId(String chatId) {
            this.chatId = chatId;
        }

        public String getMessageId() {
            return messageId;
        }

        public void setMessageId(String messageId) {
            this.messageId = messageId;
        }
    }
}
