import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CameraScreen from "./screens/CameraScreen";
import PreviewScreen from "./screens/PreviewScreen";
import ResultScreen from "./screens/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Camera"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
        />

        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}