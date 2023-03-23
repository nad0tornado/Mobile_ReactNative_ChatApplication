import { MessageBubble } from "./messageBubble";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";

export const ChatClient = () => {
  const me = "User 1";

  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState([
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 3", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
    { user: "User 1", text: "Hello" },
    { user: "User 2", text: "Hello" },
  ]);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      handleSendMessage();
      dismissKeyboard();
    }
  };

  const handleSendMessage = () => {
    if (inputText === "") return;

    setInputText("");
    setMessages([...messages, { user: me, text: inputText }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} user={m.user === me ? "You" : m.user} />
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
