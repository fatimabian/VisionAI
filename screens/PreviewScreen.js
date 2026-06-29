import {
  View,
 Image,
  TouchableOpacity,
  Text,
  StyleSheet,
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
        base64Image,
        promptKey,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={[
          styles.preview,
          {
            maxWidth: isTablet ? 600 : "100%",
          },
        ]}
      />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>
            Retake
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.personaContainer}>
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
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  preview: {
    flex: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  retakeButton: {
    backgroundColor: "#5A6472",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  personaContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  academicButton: {
    backgroundColor: "#2E5BBA",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  safetyButton: {
    backgroundColor: "#D97706",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  inventoryButton: {
    backgroundColor: "#5B3FA3",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});