## React Native - Notifications

### GitHub repo

- https://github.com/nirgluzman/React-Native-Notifications-SampleApp.git

- https://github.com/academind/react-native-practical-guide-code.git (course)

### Start a new React Native project with Expo

https://reactnative.dev/docs/environment-setup, https://docs.expo.dev/

```bash
npx create-expo-app <project name> --template
```

### Expo Notifications -> supports BOTH Local and Push notifications

https://docs.expo.dev/versions/latest/sdk/notifications/

- A library that provides an API to fetch push notification tokens and to present, schedule, receive
  and respond to notifications.

### Local Notifications with `scheduleNotificationAsync()`

https://docs.expo.dev/versions/latest/sdk/notifications/#schedulenotificationasyncrequest

https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/31510260#questions/8567716

### Push Notifications

https://docs.expo.dev/push-notifications/overview/

- Setup, https://docs.expo.dev/push-notifications/push-notifications-setup/

- `PushToken` - string which is unique for every physical device = device's address

- `getExpoPushTokenAsync()` - returns an Expo token that can be used to send a push notification to
  the device using Expo's push notifications service.

- Send notifications with Expo's Push API,
  https://docs.expo.dev/push-notifications/sending-notifications/

- Push notifications tool, https://expo.dev/notifications
