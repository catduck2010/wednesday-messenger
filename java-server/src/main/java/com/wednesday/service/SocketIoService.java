package com.wednesday.service;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.wednesday.helper.UserMap;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

@Service
public class SocketIoService implements ApplicationListener<ContextRefreshedEvent> {

    private SocketIOServer server;
    private UserMap userMap;

    //private final static int PORT = 7777; // fuck Carrie Lam, the virus to Hong Kong
    private final static int PORT = 8085;
    private final static String HOSTNAME = "127.0.0.1";
    private final static String MESSAGE = "message",
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
        });
        server.addDisconnectListener(client -> {

        });
        server.addEventListener(MESSAGE, String.class, (client, str, ackRequest) -> {

        });

    }
}
