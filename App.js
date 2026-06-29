import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ title: 'Preview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}