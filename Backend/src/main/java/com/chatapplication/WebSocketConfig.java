package com.chatapplication;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:19006");
  }

  @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        // Do something when a client connects
        System.out.println("Client connected: " + event.getMessage().getHeaders().get("simpSessionId"));
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionSubscribeEvent event) {
        // Do something when a client connects
        System.out.println("Client subscribed: " + event.getMessage().getHeaders().get("simpSessionId"));
    }
}
