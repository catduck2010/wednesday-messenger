package com.wednesday.service.manager;

import com.wednesday.dao.MessageDao;
import com.wednesday.model.Message;
import org.hibernate.annotations.Proxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
@Proxy(lazy = false)
@Repository("messageManager")
public class MessageManager {
    @Autowired
    private MessageDao mDao;

    public void create(Message m){
        mDao.persist(m);
    }

    public void update(Message m){
        mDao.merge(m);
    }

    public void delete(String mId){
        mDao.delete(mId);
    }

    public Message get(String mId){
        return mDao.get(mId);
    }
}
