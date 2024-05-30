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
  async function scheduledNotificationHandler() {
    // schedule a notification to be triggered in the future.
    await Notifications.scheduleNotificationAsync({
      content: {
        // notification content
        title: 'My first local notification!',
        body: 'This is the body of the notification!',
        data: {
          // Data associated with the notification, not displayed.
          data: 'This is some data!'
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
