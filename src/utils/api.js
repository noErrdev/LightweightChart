//const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "default_key";
// Never expose your API key in production code
console.log(API_KEY);
export const sendPromptToChatGPT = async (prompt) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo', // or 'gpt-4', depending on your model
            messages: [{ role: 'user', content: prompt }],
          }),
        });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};