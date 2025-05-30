import React from 'react';
import { MessageCircle, MessageCircleIcon } from 'lucide-react';

const ChatButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg focus:outline-none transition-transform duration-150 ease-in-out hover:scale-110 z-50"
        >
            <MessageCircleIcon size={24} />
        </button>
    );
};

export default ChatButton;
