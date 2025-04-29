// src/api/translation.api.js
import axios from 'axios';

// Base URL for the LibreTranslate API
const LIBRE_TRANSLATE_API_URL = "https://libretranslate.de";

// Create axios instance for translation API
const translationApi = axios.create({
  baseURL: LIBRE_TRANSLATE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Translate text between languages using LibreTranslate API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code (e.g., "mr", "en")
 * @param {string} targetLang - Target language code (e.g., "mr", "en")
 * @returns {Promise<string>} - Translated text
 */
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await translationApi.post('/translate', {
      q: text,
      source: sourceLang,
      target: targetLang,
    });
    
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation API error:', error);
    throw new Error(error.response?.data?.message || 'Translation failed');
  }
};

/**
 * Get supported languages from the translation API
 * @returns {Promise<Array>} - List of supported languages
 */
export const getSupportedLanguages = async () => {
  try {
    const response = await translationApi.get('/languages');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch supported languages:', error);
    throw new Error('Failed to fetch supported languages');
  }
};

// Export language codes for Marathi and English for easy reference
export const LANGUAGE_CODES = {
  MARATHI: 'mr',
  ENGLISH: 'en',
};