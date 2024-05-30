import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Alert, Platform } from 'react-native';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'; // to get the projectId value from the app config.

// config how notifications should be handled by the device.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function App() {
  // fetch the push token from the device.
  useEffect(() => {
    async function configurePushNotifications() {
      // check the current permissions settings related to notifications.
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        // request permissions for notifications.
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission required', 'Push notifications need the appropriate permissions!');
        return;
      }

      // get the push token from the device.
      // this is the Expo token that can be used to send a push notification to the device using Expo's push notifications service.
      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId
      });

      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        // assign given notification channel to a notification channel group.
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C'
        });
      }
    }

    configurePushNotifications();
  }, []);

  // register an event listener to user tapping on notifications.
  useEffect(() => {
    // Listeners registered by this method will be called whenever a notification is received while the app is running.
    const subscriptionReceivedListener = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('NOTIFICATION RECEIVED', notification);
      }
    );

    // Listeners registered by this method will be called whenever a user interacts with a notification.
    const subscriptionResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('NOTIFICATION RESPONSE RECEIVED', response);
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      });

    // useEffect cleanup function.
    // it does not only run when our component wants to unmount — it also runs right before the execution of the next scheduled effect.
    return () => {
      subscriptionReceivedListener.remove();
      subscriptionResponseReceivedListener.remove();
    };
  }, []);

  async function scheduledNotificationHandler() {
    // schedule a notification to be triggered in the future.
    await Notifications.scheduleNotificationAsync({
      content: {
        // notification content
        title: 'My first local notification!',
        body: 'This is the body of the notification!',
        data: {
          // data associated with the notification, not displayed.
          userName: 'Nir'
        }
      },
      trigger: {
        // when to trigger the notification.
        seconds: 5 // number of seconds until this notification is triggered.
      }
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Button title='Schedule Notification' onPress={scheduledNotificationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
