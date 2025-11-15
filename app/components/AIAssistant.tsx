'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAssistant({ compact }: { compact: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! I'm your AI assistant. I can help you with productivity tips, health advice, and insights based on your data. What would you like to know?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    // Productivity responses
    if (lower.includes('productive') || lower.includes('focus') || lower.includes('task')) {
      const responses = [
        "Try the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout.",
        "Based on your patterns, you're most productive in the morning. Schedule your most important tasks between 9-11 AM.",
        "Consider breaking large tasks into smaller, manageable chunks. This makes them less overwhelming and easier to complete.",
        "I noticed you complete more tasks on days when you start with a clear priority list. Try setting your top 3 priorities each morning.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Health responses
    if (lower.includes('health') || lower.includes('sleep') || lower.includes('exercise') || lower.includes('water')) {
      const responses = [
        "Aim for 7-9 hours of sleep each night. Your productivity data shows a 30% improvement on days following good sleep.",
        "Staying hydrated is crucial! Try drinking a glass of water first thing in the morning to kickstart your metabolism.",
        "Regular exercise boosts both physical and mental health. Even 20 minutes of walking can improve your mood and focus.",
        "Your health streak is looking good! Consistency is key - small daily habits compound into significant results over time.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Goal-related responses
    if (lower.includes('goal') || lower.includes('improve') || lower.includes('better')) {
      const responses = [
        "Set SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound. This framework increases your success rate significantly.",
        "Track your progress daily. Visual feedback keeps you motivated and helps identify patterns that work for you.",
        "Celebrate small wins! Acknowledging progress, no matter how small, reinforces positive habits and keeps you motivated.",
        "Consider creating a morning routine. People with consistent morning routines report 40% higher productivity levels.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Stress/wellness responses
    if (lower.includes('stress') || lower.includes('tired') || lower.includes('overwhelmed')) {
      const responses = [
        "Take regular breaks throughout your day. Your brain needs rest to maintain peak performance. Try a 5-minute walk or stretching.",
        "Practice mindful breathing: inhale for 4 counts, hold for 4, exhale for 4. This simple technique can quickly reduce stress.",
        "Remember to disconnect from screens at least 1 hour before bed. Blue light can interfere with your sleep quality.",
        "Consider time-blocking your day. Having a clear schedule reduces decision fatigue and the feeling of being overwhelmed.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Insights
    if (lower.includes('insight') || lower.includes('data') || lower.includes('pattern')) {
      const responses = [
        "Your data shows you complete 40% more tasks on days when you exercise. Physical activity directly boosts cognitive performance!",
        "I've noticed a correlation between your water intake and task completion rate. Stay hydrated for better focus!",
        "Your productivity peaks mid-week (Tuesday-Thursday). Consider scheduling important meetings and deep work during these days.",
        "You maintain a 15-day health streak on average. Let's aim for 30 days this month - you're already halfway there!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! I'm here to help you optimize your productivity and health. Ask me about your habits, goals, or patterns.",
      "I can provide insights on your productivity trends, suggest health improvements, or help you set achievable goals. What interests you most?",
      "Let's work together to build better habits! Would you like tips on productivity, health, or insights from your tracked data?",
      "Great question! I can help with productivity strategies, health advice, or analyzing your progress patterns. What would you like to explore?",
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col ${compact ? 'h-96' : 'h-[600px]'}`}>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-xl">
        <div className="flex items-center gap-2 text-white">
          <Brain className="w-6 h-6" />
          <div>
            <h3 className="font-bold">AI Assistant</h3>
            <p className="text-xs opacity-90">Powered by smart insights</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">AI</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
