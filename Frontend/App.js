import "expo-dev-client";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ChatClient } from "./components/chatClient";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatClient />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "red",
  },
});
