import { View, Text, Image, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { photoUri } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Result Screen</Text>

      <Image source={{ uri: photoUri }} style={styles.image} />

      <Text style={styles.subtitle}>
        Ready for Gemini analysis (Phase 4)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
  },
});