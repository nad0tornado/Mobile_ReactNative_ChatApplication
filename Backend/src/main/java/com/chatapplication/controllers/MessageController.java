package com.chatapplication.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.chatapplication.models.Message;

@Controller
public class MessageController {
  @MessageMapping("/topic/messages")
  @SendTo("/topic/messages")
  public void broadcastMessage(@Payload Message message) throws Exception {
    // .. TODO: broadcast incoming messages to the rest of the chat
    //return message;
  }

  @MessageMapping("/topic/hello")
  @SendTo("/topic/messages")
  public Message broadcastGreeting(@Payload Message message) throws Exception {
    return new Message("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!","Server");
  }
}
