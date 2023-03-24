package com.chatapplication.models;

public class ExampleModel {
    
    private final long id;
    private final String content;

    public ExampleModel(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
