export const chatbotResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("Sending request to OpenRouter with message:", message);
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://your-app-domain.com",
        "X-Title": "Chat App",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: message }],
        max_tokens: 1000  // Add explicit token limit
      }),
    });

    const data = await response.json();
    
    console.log("OpenRouter API Response:", JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      const content = data.choices[0].message.content.trim();
      
      if (content === "") {
        console.log("API returned empty content");
        res.status(200).json({ 
          reply: "Sorry, I couldn't generate a response. Please try again with a different question.",
          debug: data
        });
      } else {
        res.json({ reply: content });
      }
    } else {
      console.log("Invalid or unexpected API response structure");
      res.status(500).json({ 
        error: "Invalid response from AI",
        details: data 
      });
    }
  } catch (error) {
    console.error("Chatbot API Error:", error);
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
};