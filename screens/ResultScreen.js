// screens/ResultScreen.jsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,  // <-- ADD THIS
} from 'react-native';
import { analyzeImage } from '../lib/gemini';

const PROMPTS = {
  academic:
    'Act as a university professor. Looking at this image, provide an academic-style analysis: identify the objects present, the educational context, and one piece of constructive feedback. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
  safety:
    'Act as a workplace safety inspector. Looking at this image, identify any visible hazards, risks, or safety concerns. If none are visible, state that clearly. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
  inventory:
    'Act as an asset management clerk. Looking at this image, list every visible physical asset as a clean inventory list, with no extra commentary. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
};

export default function ResultScreen({ route }) {
  const { base64Image, promptKey } = route.params;
  const prompt = PROMPTS[promptKey] || PROMPTS.academic;

  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runAnalysis();
  }, []);

  async function runAnalysis() {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeImage(base64Image, prompt);
      const textPart = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textPart) {
        throw new Error('Empty response from Gemini');
      }
      const parsed = JSON.parse(textPart);
      setAnalysis(parsed);
    } catch (err) {
      console.error('Analysis error:', err);
      let message = 'Could not analyze this image. Please try again.';
      if (err.message.includes('429')) {
        message = 'Quota exceeded. Please wait a few minutes or use a different API key.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2E5BBA" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={runAnalysis}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!analysis) {
    return (
      <View style={styles.centered}>
        <Text>No analysis available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Objects</Text>
      {Array.isArray(analysis.objects) && analysis.objects.length > 0 ? (
        analysis.objects.map((obj, i) => (
          <Text key={i} style={styles.listItem}>• {obj}</Text>
        ))
      ) : (
        <Text style={styles.bodyText}>No objects listed.</Text>
      )}

      <Text style={styles.sectionTitle}>Context</Text>
      <Text style={styles.bodyText}>{analysis.context || 'Not provided.'}</Text>

      <Text style={styles.sectionTitle}>Activities</Text>
      <Text style={styles.bodyText}>{analysis.activities || 'Not provided.'}</Text>

      <Text style={styles.sectionTitle}>Recommendations</Text>
      <Text style={styles.bodyText}>{analysis.recommendations || 'Not provided.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingTop: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 12, color: '#5A6472' },
  errorText: { color: '#B3261E', textAlign: 'center', fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#1F2A44' },
  listItem: { fontSize: 15, marginTop: 4, marginLeft: 8 },
  bodyText: { fontSize: 15, marginTop: 4, color: '#2B2F38' },
  retryButton: { backgroundColor: '#2E5BBA', padding: 12, borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});