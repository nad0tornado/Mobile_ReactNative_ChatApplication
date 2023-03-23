import { View, Text } from "react-native";

export const MessageBubble = ({ user, text }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-" + (user === "You" ? "start" : "end"),
        marginBottom: 5,
      }}
    >
      <View style={{ width: "50%" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{user}</Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
};
