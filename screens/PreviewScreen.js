import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";

import { imageToBase64 } from "../lib/gemini";

export default function PreviewScreen({ route, navigation }) {
  const { photoUri } = route.params;

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  async function goAnalyze(promptKey) {
    try {
      const base64Image = await imageToBase64(photoUri);

      navigation.navigate("Result", {
        photoUri,
        base64Image,
        promptKey,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to analyze image.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Preview Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: photoUri }}
          style={[
            styles.preview,
            isTablet && styles.previewTablet,
          ]}
        />
      </View>

      {/* Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.academicButton}
          onPress={() => goAnalyze("academic")}
        >
          <Text style={styles.buttonText}>
            Academic Analysis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.safetyButton}
          onPress={() => goAnalyze("safety")}
        >
          <Text style={styles.buttonText}>
            Safety Analysis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inventoryButton}
          onPress={() => goAnalyze("inventory")}
        >
          <Text style={styles.buttonText}>
            Inventory Analysis
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  previewTablet: {
    width: 600,
  },

  bottomContainer: {
    padding: 20,
    gap: 12,
  },

  retakeButton: {
    backgroundColor: "#6B7280",
    padding: 15,
    borderRadius: 10,
  },

  academicButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },

  safetyButton: {
    backgroundColor: "#EA580C",
    padding: 15,
    borderRadius: 10,
  },

  inventoryButton: {
    backgroundColor: "#7C3AED",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});