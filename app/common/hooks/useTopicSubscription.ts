import { useEffect, useRef } from "react";
import fcm from "@/app/common/utils/fcm";

type Options = {
  subscribeOnMount?: boolean;
};

// Subscribes the provided FCM token to the `pooling-posts` topic via Cloud Functions.
// Caller is responsible for acquiring a valid FCM/device token for the current platform.
export default function useTopicSubscription(token?: string, opts?: Options) {
  const unsubscribedRef = useRef(false);

  useEffect(() => {
    if (!token) return;
    let mounted = true;

    const doSubscribe = async () => {
      try {
        await fcm.subscribeTokenToTopic(token);
        if (!mounted) return;
        unsubscribedRef.current = false;
        console.log("Subscribed token to pooling-posts topic");
      } catch (err) {
        console.error("Failed to subscribe token:", err);
      }
    };

    doSubscribe();

    return () => {
      mounted = false;
      if (!unsubscribedRef.current) {
        fcm
          .unsubscribeTokenFromTopic(token)
          .catch((err) => console.error("Failed to unsubscribe token:", err));
        unsubscribedRef.current = true;
      }
    };
  }, [token]);
}
