import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  analyzeImage,
  PROMPTS,
} from "../lib/gemini";

export default function ResultScreen({ route }) {
  const { photoUri, base64Image, promptKey } = route.params;

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    runAnalysis();
  }, []);

  async function runAnalysis() {
    setLoading(true);
    setError(null);

    try {
      const prompt = PROMPTS[promptKey];

      const result = await analyzeImage(
        base64Image,
        prompt
      );

      let text =
        result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Empty response from Gemini.");
      }

      // Remove markdown code fences if Gemini returns them
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(text);

      setAnalysis(parsed);
    } catch (err) {
      console.log(err);

      setError(
        "Could not analyze this image.\nPlease try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color="#5B3FA3"
        />

        <Text style={styles.loadingText}>
          Analyzing image...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
     <Text style={styles.title}>
  AI Analysis Result
</Text>

<Image
  source={{ uri: photoUri }}
  style={styles.resultImage}
/>

      <Text style={styles.sectionTitle}>
        Objects
      </Text>

      {analysis.objects &&
        analysis.objects.map((item, index) => (
          <Text
            key={index}
            style={styles.listItem}
          >
            • {item}
          </Text>
        ))}

      <View style={styles.card}>
  <Text style={styles.cardTitle}>Objects</Text>

  {analysis.objects?.map((item, index) => (
    <Text key={index} style={styles.cardText}>
      {item}
    </Text>
  ))}
</View>

      <Text style={styles.bodyText}>
        {analysis.context}
      </Text>

      <Text style={styles.sectionTitle}>
        Activities
      </Text>

      <Text style={styles.bodyText}>
        {analysis.activities}
      </Text>

      <Text style={styles.sectionTitle}>
        Recommendations
      </Text>

      <Text style={styles.bodyText}>
        {analysis.recommendations}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },

  errorText: {
    color: "#B3261E",
    fontSize: 16,
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1F2A44",
    textAlign: "center",
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2A44",
  },

  listItem: {
    fontSize: 16,
    marginBottom: 4,
    color: "#2B2F38",
  },

  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2B2F38",
  },

  resultImage: {
  width: "100%",
  height: 220,
  resizeMode: "contain",
  borderRadius: 10,
  marginBottom: 20,
},

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
});

