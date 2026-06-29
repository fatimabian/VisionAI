import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PreviewScreen({ route, navigation }) {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retake</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#2E5BBA',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});