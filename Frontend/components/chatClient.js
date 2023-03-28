import { MessageBubble } from "./messageBubble";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import { Client } from "@stomp/stompjs";

import secret from "../_dat";

export const ChatClient = () => {
  const [meUsername, setMeUsername] = useState("User 1");

  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState([
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 3", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
    { name: "User 1", content: "Hello" },
    { name: "User 2", content: "Hello" },
  ]);
  const [client, setClient] = useState();

  const scrollViewRef = useRef();

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket(`ws://${secret}:8080/chat`);

    // Create a STOMP client over the WebSocket connection
    const client = new Client({
      brokerURL: `ws://${secret}:8080/chat`,
      onConnect: () => doWelcome(),
      webSocketFactory: () => socket,
      debug: function (msg) {
        console.log(msg);
      },
    });

    const doWelcome = () => {
      // Subscribe to the "/topic/messages" topic to receive broadcasted messages
      client.subscribe("/topic/messages", function (message) {
        console.log("Received: " + message.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      });

      setClient(client);
    };

    // Connect to the STOMP server
    client.activate();

    // Disconnect from the STOMP server and close the WebSocket connection when the component unmounts
    return function cleanup() {
      client.deactivate();
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      handleSendMessage();
      typeof dismissKeyboard === "function" && dismissKeyboard();
    }
  };

  const handleUsernameKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      handleSendMessage();
      typeof dismissKeyboard === "function" && dismissKeyboard();
    }
  };

  const handleSendMessage = () => {
    if (inputText === "") return;

    // Send a message to the "/app/hello" endpoint
    const message = { name: meUsername, content: inputText };
    client.publish({
      destination: "/topic/messages",
      body: JSON.stringify(message),
    });

    setInputText("");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Your Username</Text>
      <View
        style={{
          ...styles.chatInputContainer,
          alignItems: "left",
          flex: 1 / 20,
          marginBottom: 5,
          marginTop: 0,
        }}
      >
        <TextInput
          value={meUsername}
          style={{ width: "100%" }}
          onChangeText={setMeUsername}
          onKeyPress={handleUsernameKeyDown}
        />
      </View>
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer}>
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            {...m}
            name={m.name === meUsername ? "You" : m.name}
          />
        ))}
      </ScrollView>
      <View style={styles.chatInputContainer}>
        <TextInput
          placeholder="Enter a Message"
          value={inputText}
          style={styles.chatInputTextbox}
          onChangeText={setInputText}
          onKeyPress={handleKeyDown}
        />
        <Pressable style={styles.chatInputButton} onPress={handleSendMessage}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#DDD",
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    userSelect: "none",
    maxHeight: Dimensions.get("window").height * 0.9,
  },
  chatInputContainer: {
    flex: 1 / 10,
    marginTop: 10,
    backgroundColor: "#DDD",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  chatInputTextbox: {
    flex: 3 / 4,
    display: "flex",
    justifyContent: "center",
    minHeight: 50,
  },
  usernameInputTextbox: {
    display: "flex",
    justifyContent: "center",
    minHeight: 50,
  },
  chatInputButton: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: -10,
    height: "80%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "white",
    userSelect: "none",
  },
});
