import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import DashboardNavbar from './dashboard-navbar';
import Sidebar from './sidebar';
import Footer from '../footer';

const Messages = () => {
  const { theme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  // 🔹 Liste de mots toxiques
  const toxicWords = ['idiot', 'stupide', 'nul', 'hate', 'fool'];

  const messages = [
    {
      id: 1,
      sender: 'Kevinn',
      avatar: 'MD',
      subject: 'Kevinn',
      preview: 'Bonjour, est ce que cava ',
      time: '10:30',
      unread: true,
      fullMessage: 'Bonjour, est ce que cava',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 2,
      sender: 'Karen',
      avatar: 'SY',
      subject: 'Rappel de cours',
      preview: 'Cours React Hooks demain...',
      time: '09:15',
      unread: false,
      fullMessage: 'Cours React Hooks demain à 14h.',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 ENVOI MESSAGE AVEC DÉTECTION TOXIQUE
  const handleSend = () => {
    if (!replyText.trim()) return;

    const lowerText = replyText.toLowerCase();
    const foundToxic = toxicWords.some(word => lowerText.includes(word));

    if (foundToxic) {
      setAlertMessage('⚠️ Le message contient des mots interdits et ne peut pas être envoyé.');
      return;
    }

    setReplies((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setReplyText('');
    setAlertMessage('');
  };

  return (
    <>
      <DashboardNavbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <div className={`h-[calc(100vh-4rem)] flex`}>
          {/* LISTE DES MESSAGES */}
          <div className="w-96 border-r">
            <div className="p-4">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  setReplies([]);
                  setAlertMessage('');
                }}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                <h3 className="font-semibold">{message.sender}</h3>
                <p className="text-sm text-gray-500">{message.preview}</p>
              </motion.div>
            ))}
          </div>

          {/* CONVERSATION */}
          <div className="flex-1 flex flex-col">
            {selectedMessage ? (
              <>
                {/* HEADER */}
                <div className="p-4 border-b">
                  <h2 className="font-bold">{selectedMessage.subject}</h2>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  <div className="max-w-md bg-gray-200 p-3 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">
                      {selectedMessage.fullMessage}
                    </pre>
                  </div>

                  {replies.map((reply) => (
                    <div key={reply.id} className="flex justify-end">
                      <div className="max-w-md bg-blue-500 text-white p-3 rounded-lg">
                        <p className="text-sm">{reply.text}</p>
                        <p className="text-xs text-right opacity-70 mt-1">
                          {reply.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-3 border-t flex flex-col gap-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tapez un message..."
                    className="flex-1 p-2 border rounded-lg resize-none"
                  />
                  {alertMessage && (
                    <p className="text-red-500 text-sm">{alertMessage}</p>
                  )}
                  <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Envoyer
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Sélectionnez un message
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Messages;
