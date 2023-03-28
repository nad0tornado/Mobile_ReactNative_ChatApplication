import { View, Text } from "react-native";

export const MessageBubble = ({ name, content }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-" + (name === "You" ? "start" : "end"),
        marginBottom: 5,
      }}
    >
      <View style={{ width: "50%" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{name}</Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text>{content}</Text>
        </View>
      </View>
    </View>
  );
};
