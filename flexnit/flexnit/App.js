import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import axios from "axios";

import registerNNPushToken, {
  getPushDataObject,
  getNotificationInbox,
  getUnreadNotificationInboxCount,
} from "native-notify";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import HomeIcon from "react-native-vector-icons/Ionicons";
import InboxIcon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [url, setUrl] = useState("https://flexnit-ecd34.web.app/");
  const [webKey, setWebKey] = useState(1);
  const [notInboxData, setNotInboxData] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const [visible, setVisible] = useState(false);
  const [screenName, setScreenName] = useState("Home");

  registerNNPushToken(10413, "ttF0OczJyHyQpoHru2hPkL");
  let pushDataObject = getPushDataObject();

  useFonts({ OpenSans_300Light, OpenSans_600SemiBold });

  useEffect(() => {
    async function getUnreadNots() {
      let unreadCount = await getUnreadNotificationInboxCount(
        10413,
        "ttF0OczJyHyQpoHru2hPkL"
      );
      setUnreadNotificationCount(unreadCount);
    }
    getUnreadNots();
    handleAnalytics("Home");
  }, []);

  useEffect(() => {
    if ("newURL" in pushDataObject) {
      setUrl(pushDataObject.newURL);
    }
  }, [pushDataObject]);

  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  };

  const handleAnalytics = (path) => {
    axios.post(`https://app.nativenotify.com/api/analytics`, {
      app_id: 10413,
      app_token: "ttF0OczJyHyQpoHru2hPkL",
      screenName: path,
    });
  };

  const handleGoToInbox = async () => {
    let notifications = await getNotificationInbox(
      10413,
      "ttF0OczJyHyQpoHru2hPkL"
    );
    setNotInboxData(notifications);
    handleAnalytics("Notification Inbox");
    setScreenName("NotificationInbox");
    setUnreadNotificationCount(0);
  };

  return (
    <View style={styles.page}>
      {screenName === "Home" ? (
        <View style={styles.body}>
          <WebView
            key={webKey}
            style={styles.webview}
            source={{ uri: url }}
            onLoadStart={() => setVisible(true)}
            onLoad={() => setVisible(false)}
            onNavigationStateChange={({ url }) => handleAnalytics(url)}
          />
          {visible ? <ActivityIndicatorElement /> : null}
        </View>
      ) : null}
      {screenName === "NotificationInbox" ? (
        <View style={styles.body}>
          <FlatList
            data={notInboxData}
            keyExtractor={(item) => item.notification_id}
            renderItem={({ item }) => {
              return (
                <View style={styles.notInboxCont}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.messageText}>{item.message}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              );
            }}
          />
        </View>
      ) : null}
      <View style={styles.footer}>
        <HomeIcon
          name={screenName === "Home" ? "home" : "home-outline"}
          size={30}
          color={"#141414"}
          onPress={() => {
            setScreenName("Home");
            setWebKey(webKey + 1);
          }}
        />
        <TouchableOpacity style={styles.icon} onPress={() => handleGoToInbox()}>
          <InboxIcon
            name={
              screenName === "NotificationInbox" ? "md-mail" : "md-mail-outline"
            }
            size={30}
            color={"#141414"}
          />

          {unreadNotificationCount ? (
            <View style={styles.redEmptyBubble}></View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: Constants.statusBarHeight,
  },
  body: {
    flex: 9,
    width: "100%",
  },
  footer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#00000020",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // webview
  webview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },

  // notification inbox
  notInboxCont: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 0.75,
    borderColor: "#d8d8d8",
  },
  title: {
    width: "90%",
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 5,
    fontSize: 14,
  },
  messageText: {
    fontFamily: "OpenSans_300Light",
    marginTop: 2,
    fontSize: 14,
    marginTop: 5,
  },
  dateText: {
    fontFamily: "OpenSans_300Light",
    marginTop: 2,
    fontSize: 14,
    marginTop: 5,
    textAlign: "right",
  },
  icon: {
    flexDirection: "row",
  },
  redEmptyBubble: {
    height: 14,
    width: 14,
    padding: 1,
    backgroundColor: "rgb(228, 66, 88)",
    borderRadius: 12,
    position: "absolute",
    right: -5,
    zIndex: 5,
  },
});
