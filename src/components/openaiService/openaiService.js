// src/openaiService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; //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

const openaiService = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

// 1. Updated endpoint to 'chat/completions'
// const CHAT_ENDPOINT = '/chat/completions';

export const getOpenAIResponse = async (userPrompt) => {
  try {
    const response = await openaiService.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userPrompt }],
      max_tokens: 500,
    });

    // Extracting the specific 'content' string from the nested response
    const aiText = response.data.choices[0].message.content;
    
    return aiText.trim(); 
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error('Check your API quota or Model permissions.');
  }
};