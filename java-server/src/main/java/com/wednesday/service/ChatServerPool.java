package com.wednesday.service;

import com.corundumstudio.socketio.SocketIOClient;

import java.util.Collection;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicInteger;

public class ChatServerPool {

    //会话集合
    private static final ConcurrentSkipListMap<String, SocketIOClient> webSocketMap = new ConcurrentSkipListMap<>();
    //静态变量，用来记录当前在线连接数。（原子类、线程安全）
    public static AtomicInteger onLineCount = new AtomicInteger();

    /**
     * SocketIOClient
     */
    public static SocketIOClient getSocketIOClientByClientID(String clientID){
        SocketIOClient sc = webSocketMap.get(clientID);
        return sc;
    }

    /**
     * 向连接池中添加连接
     */
    public static void addUser(String clientID, SocketIOClient conn){
        if(conn !=null) {
            webSocketMap.put(clientID, conn);    //添加连接
            onLineCount.incrementAndGet();
        }
    }

    /**
     * 获取所有的在线用户
     * @return
     */
    public static Collection<String> getOnlineUser(){
        Set<String> setUsers = webSocketMap.keySet();
        return setUsers;
    }

    /**
     * 移除连接池中的连接
     */
    public static boolean removeUser(String clientID){
        if(webSocketMap.containsKey(clientID)){
            webSocketMap.remove(clientID);  //移除连接
            return true;
        }else{
            return false;
        }
    }

    /**
     * 向特定的用户发送数据
     */
    public static void sendMessageToUser(String clientId,String event,String msg){
        if(webSocketMap.containsKey(clientId) && !"".equals(msg)){
            webSocketMap.get(clientId).sendEvent(event, msg);
        }
    }
    /**
     * 向特定的用户发送数据
     */
    public static void sendMessageToUserBySocketClient(SocketIOClient conn,String event,String msg){
        if(conn !=null && !"".equals(msg)){
            conn.sendEvent(event, msg);
        }
    }
    /**
     * 向所有的用户发送消息
     * @param message
     */
    public static void sendMessageAll(String event,String message){
        Collection<SocketIOClient> cs = webSocketMap.values();
        synchronized (cs) {
            if(event !=null && !"".equals(event)){
                for (SocketIOClient conn : cs) {
                    if(conn != null){
                        conn.sendEvent(event,message);
                    }
                }
            }else{
                for (SocketIOClient conn : cs) {
                    if(conn != null){
                        conn.sendEvent(message);
                    }
                }
            }

        }
    }
}
