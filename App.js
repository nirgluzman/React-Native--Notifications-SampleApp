import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

import * as Notifications from 'expo-notifications';

// config how notifications should be handled by the device.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function App() {
  // register an event listner to user tapping on notifications.
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
