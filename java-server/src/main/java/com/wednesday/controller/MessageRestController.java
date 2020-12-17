package com.wednesday.controller;

import com.wednesday.dao.MessageDao;
import com.wednesday.service.manager.MessageManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageRestController {
    @Autowired
    private MessageManager mm;



}
