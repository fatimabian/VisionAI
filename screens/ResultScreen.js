import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ANALYSIS_PROMPT } from '../lib/gemini';

export default function ResultScreen({ route }) {
  const { base64Image } = route.params;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    analyzeImage();
  }, []);

  async function analyzeImage() {
    try {
      setLoading(true);

      // 🔥 TEMP: fake response first (we will replace with Gemini in Phase 5.3)
      const fakeResponse = {
        objects: ['Laptop', 'Notebook'],
        context: 'Student studying',
        activities: 'Reading and taking notes',
        recommendations: 'Keep taking notes',
      };

      setResult(fakeResponse);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Objects:</Text>
      {result.objects.map((item, i) => (
        <Text key={i}>• {item}</Text>
      ))}

      <Text style={styles.title}>Context:</Text>
      <Text>{result.context}</Text>

      <Text style={styles.title}>Activities:</Text>
      <Text>{result.activities}</Text>

      <Text style={styles.title}>Recommendations:</Text>
      <Text>{result.recommendations}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});