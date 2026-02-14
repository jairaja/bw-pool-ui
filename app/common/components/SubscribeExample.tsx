import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import useTopicSubscription from "@/app/common/hooks/useTopicSubscription";

// Example component: accepts a token (or let user paste one) and subscribes it.
// In a real app you should obtain the token programmatically per-platform.
export default function SubscribeExample() {
  const [token, setToken] = useState<string>("");
  const [subscribed, setSubscribed] = useState(false);

  useTopicSubscription(subscribed ? token : undefined);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 8 }}>
        FCM token (paste or obtain programmatically)
      </Text>
      <TextInput
        value={token}
        onChangeText={setToken}
        placeholder="Paste FCM token here"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button
        title={subscribed ? "Unsubscribe" : "Subscribe"}
        onPress={() => setSubscribed((s) => !s)}
      />
      <Text style={{ marginTop: 8 }}>
        {subscribed ? "Subscribed" : "Not subscribed"}
      </Text>

      <Text style={{ marginTop: 12, fontWeight: "bold" }}>Notes</Text>
      <Text>- Obtain FCM token differently by platform:</Text>
      <Text>
        - Web: use `firebase/messaging` and your VAPID key to call `getToken()`.
      </Text>
      <Text>
        - Native: use your preferred native FCM library (react-native-firebase
        or Expo-notifications + native FCM) to get the device token.
      </Text>
      <Text>
        - Then pass that token into this component to subscribe it to the
        `pooling-posts` topic.
      </Text>
    </View>
  );
}
