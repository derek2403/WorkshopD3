import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hi there! 👋 How can I help you with data visualization today?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to handle user sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newUserMessage = { text: inputText, sender: 'user' };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Prepare messages for the API
    // The API expects roles: 'user', 'assistant', or 'system'
    // We also need to map our 'text' field to 'content'
    const apiMessages = updatedMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }), // Send the whole history
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        // Add an error message to the chat
        const botErrorMessage = { text: `Error: ${errorData.error || 'Could not connect to the AI assistant.'}` , sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botErrorMessage]);
        setIsTyping(false);
        return;
      }

      const data = await response.json();
      const botResponse = { text: data.reply, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error('Failed to send message:', error);
      const botErrorMessage = { text: 'Error: Could not reach the AI assistant. Please check your connection or API setup.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botErrorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>WorkshopD3 - Chat with us</title>
        <meta name="description" content="Chat with us about D3.js and data visualization" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <Link href="/" legacyBehavior>
          <a className="logo">WorkshopD3</a>
        </Link>
        <nav className="nav">
          <Link href="/#features" legacyBehavior>
            <a className="navLink">Features</a>
          </Link>
          <Link href="/#testimonials" legacyBehavior>
            <a className="navLink">Testimonials</a>
          </Link>
          <Link href="/#pricing" legacyBehavior>
            <a className="navLink">Pricing</a>
          </Link>
          <Link href="/chatbot" legacyBehavior>
            <a className="navLinkActive">Chatbot</a>
          </Link>
          <Link href="/#contact" legacyBehavior>
            <a className="ctaButton">Get Started</a>
          </Link>
        </nav>
      </header>

      <main className="main">
        <h1 className="title">
          Chat with our AI Assistant
        </h1>
        
        <div className="chatContainer">
          <div className="messagesContainer">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.sender === 'user' ? 'userMessage' : 'botMessage'}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="botMessage">
                <div className="typingIndicator">
                  <span className="typingDot" style={{ animationDelay: '0s' }}>.</span>
                  <span className="typingDot" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="typingDot" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="chatForm">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="chatInput"
            />
            <button
              type="submit"
              disabled={isTyping}
              className={`sendButton ${isTyping ? 'disabled' : ''}`}
            >
              Send
            </button>
          </form>
        </div>
        
        <div className="footer">
          <p>Our chatbot is here to help with questions about our D3.js workshops and data visualization.</p>
          <p>For more complex inquiries, please <Link href="/#contact" legacyBehavior><a className="footerLink">contact our team</a></Link>.</p>
        </div>
      </main>

      <style jsx>{`
        .container {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #333;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          background-color: rgba(255, 255, 255, 0.95);
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3182ce;
          text-decoration: none;
        }
        
        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .navLink {
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .navLink:hover {
          color: #3182ce;
        }
        
        .navLinkActive {
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          color: #3182ce;
        }
        
        .ctaButton {
          padding: 0.5rem 1rem;
          background-color: #3182ce;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        
        .ctaButton:hover {
          background-color: #2c5282;
        }
        
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #2d3748;
        }
        
        .chatContainer {
          display: flex;
          flex-direction: column;
          flex: 1;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .messagesContainer {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 400px;
          background-color: #f8fafc;
        }
        
        .userMessage {
          align-self: flex-end;
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 1rem 1rem 0 1rem;
          background-color: #3182ce;
          color: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .botMessage {
          align-self: flex-start;
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 1rem 1rem 1rem 0;
          background-color: white;
          color: #4a5568;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .typingIndicator {
          display: flex;
          gap: 0.25rem;
        }
        
        .typingDot {
          font-size: 2rem;
          display: inline-block;
          animation: typing 1s infinite;
        }
        
        @keyframes typing {
          0% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 0.3; transform: translateY(0); }
        }
        
        .chatForm {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
          background-color: white;
        }
        
        .chatInput {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          margin-right: 0.5rem;
          font-size: 1rem;
        }
        
        .sendButton {
          padding: 0.75rem 1.5rem;
          background-color: #3182ce;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .sendButton:hover {
          background-color: #2c5282;
        }
        
        .sendButton.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .footer {
          margin-top: 2rem;
          text-align: center;
          color: #718096;
        }
        
        .footerLink {
          color: #3182ce;
          text-decoration: none;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
} 