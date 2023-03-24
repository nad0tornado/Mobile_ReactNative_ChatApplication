package com.chatapplication.models;

public class Message {
  private String content;
  private String name;

  public Message(String content, String name) {
    this.content = content;
    this.name = name;
  }

  public String getContent() {
    return content;
  }

  public String getName() {
    return name;
  }
}
