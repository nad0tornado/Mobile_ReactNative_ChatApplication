package com.chatapplication.controllers;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.chatapplication.models.ExampleModel;

@RestController
public class ExampleController {
    
    private static final String template = "Hello, %s";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/exampleEndpoint")
    public ExampleModel exampleEndpoint(@RequestParam(value = "name", defaultValue= "World") String name) {
        return new ExampleModel(counter.incrementAndGet(), String.format(template, name));
    }
}
