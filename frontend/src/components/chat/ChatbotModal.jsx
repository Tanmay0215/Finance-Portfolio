import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CornerDownLeft, Bot, User } from 'lucide-react';
import api from '../../utils/api';

const ChatbotModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ type: 'bot', text: "Hello! How can I help you today?" }]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { type: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const backendResponse = await api.post('/api/chat', { prompt: currentInput });
            const botResponseText = backendResponse.data.response;
            // const botResponseText = "hi";
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: botResponseText }]);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-end justify-end p-4 md:p-8 z-10">
            <div className="bg-slate-800 text-slate-100 w-full max-w-sm h-[85vh] max-h-[700px] rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ease-out scale-100 opacity-100">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                        <Bot size={24} className="text-green-400" />
                        <h3 className="text-lg font-semibold">AI Assistant</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 p-1 rounded-full hover:bg-slate-700 transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`p-2 rounded-xl shadow ${msg.type === 'user'
                                    ? 'bg-green-500 text-white rounded-br-none'
                                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-700 text-slate-200 p-3 rounded-lg rounded-bl-none shadow flex items-center space-x-2">
                                <Bot size={18} className="inline mr-1 text-green-400" />
                                <span className="italic">AI is thinking</span>
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center space-x-2 bg-slate-700 rounded-lg p-1">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-grow bg-transparent text-slate-100 p-2 focus:outline-none placeholder-slate-400"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || input.trim() === ''}
                            className="bg-green-500 text-white p-2.5 rounded-md hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <CornerDownLeft size={20} className="animate-ping" />
                            ) : (
                                <Send size={20} />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">AI can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal;

