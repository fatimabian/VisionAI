const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

import * as FileSystem from 'expo-file-system';

export async function imageToBase64(uri) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
}