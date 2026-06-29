import { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);

  const insets = useSafeAreaInsets();

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          {Platform.OS === "ios"
            ? 'VisionAI needs camera access. Tap below, then choose "Allow" in the dialog.'
            : "VisionAI needs camera access. Tap below to grant permission."}
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (!cameraRef.current) return;

    const result = await cameraRef.current.takePictureAsync({
      quality: 0.3,
    });

    navigation.navigate("Preview", {
      photoUri: result.uri,
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />

      <TouchableOpacity
        style={[
          styles.captureButton,
          {
            bottom: insets.bottom + 24,
          },
        ]}
        onPress={takePicture}
      >
        <Text style={styles.captureButtonText}>
          Capture
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  permissionText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  permissionButton: {
    backgroundColor: "#2E5BBA",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  captureButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#2E5BBA",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },

  captureButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});