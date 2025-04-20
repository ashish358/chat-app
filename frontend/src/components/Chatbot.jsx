import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hardcoded API key for development
  const apiKey = "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";

  // Add this new system message for your watch collection website
  const systemMessage = {
    role: "system",
    content: `You are a specialized assistant for a luxury watch collection website called Akinox. 
    You help customers with information about our watch collections, pricing, availability, and purchasing process.
    
    Key watch brands we carry include Rolex, Omega, Patek Philippe, Audemars Piguet, and more.
    Our watch collections range from $1,000 to $50,000+.
    
    When customers ask about watches we don't explicitly mention, suggest similar options from our collection.
    Always be helpful, professional, and knowledgeable about luxury watches.
    Never mention that you're an AI or that you're using OpenRouter - just act as the official company representative.
    
    Website: [YOUR WEBSITE URL]
    Store location: [YOUR STORE LOCATION]
    Contact: [YOUR CONTACT INFORMATION]`
  };

  // Replace your existing handleSubmit with this updated version
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    if (!message.trim()) return;
      
    // Add user message to chat
    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
      
    // Clear input field
    setMessage('');
    setIsLoading(true);
      
    try {
      // Create messages array with system message and all previous messages
      const messages = [
        systemMessage,
        ...chatHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: message }
      ];
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Watch Collection Assistant',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const botMessage = { sender: 'bot', text: data.choices[0].message.content };
        setChatHistory(prev => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl h-[80vh] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        <header className="bg-slate-800 text-white p-4 text-center">
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {chatHistory.length === 0 ? (
            <div className="flex-1 flex justify-center items-center text-gray-400 text-lg">
              <p>Send a message to start chatting!</p>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    chat.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-sm' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form 
          className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button 
            type="submit" 
            className={`px-5 py-3 rounded-full font-medium ${
              isLoading || !message.trim() 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={isLoading || !message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;