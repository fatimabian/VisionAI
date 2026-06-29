import { View, Image, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { imageToBase64 } from '../lib/gemini';

const PROMPTS = {
  academic:
    'Act as a university professor. Looking at this image, provide an academic-style analysis: identify the objects present, the educational context, and one piece of constructive feedback. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
  safety:
    'Act as a workplace safety inspector. Looking at this image, identify any visible hazards, risks, or safety concerns. If none are visible, state that clearly. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
  inventory:
    'Act as an asset management clerk. Looking at this image, list every visible physical asset as a clean inventory list, with no extra commentary. Respond ONLY with valid JSON in this exact shape: {"objects": ["..."], "context": "...", "activities": "...", "recommendations": "..."}. No extra text.',
};

export default function PreviewScreen({ route, navigation }) {
  const { photoUri } = route.params;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  async function handleAnalyze(personaKey) {
    try {
      const base64Image = await imageToBase64(photoUri);
      navigation.navigate('Result', { base64Image, promptKey: personaKey });
    } catch (error) {
      console.error('Failed to convert image to base64:', error);
      // Optionally show an alert
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={[
          styles.preview,
          {
            maxWidth: isTablet ? 600 : '100%',
            alignSelf: 'center',
          },
        ]}
        resizeMode="contain"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.retakeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() => handleAnalyze('academic')}
        >
          <Text style={styles.buttonText}>Academic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.analyzeButton, { backgroundColor: '#D32F2F' }]}
          onPress={() => handleAnalyze('safety')}
        >
          <Text style={styles.buttonText}>Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.analyzeButton, { backgroundColor: '#2E7D32' }]}
          onPress={() => handleAnalyze('inventory')}
        >
          <Text style={styles.buttonText}>Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%', // ensure height fills the space
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1a1a1a',
    flexWrap: 'wrap',
  },
  retakeButton: {
    backgroundColor: '#5A6472',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    minWidth: 70,
  },
  analyzeButton: {
    backgroundColor: '#5B3FA3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    minWidth: 70,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});