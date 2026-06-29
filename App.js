import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Camera">
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Preview" component={PreviewScreen} options={{ title: 'Preview' }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Analysis' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}