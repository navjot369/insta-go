import { useState } from "react";
import "./ChatBot.css";
import chatbotData from "./chatbotData.json";  // Import the chatbot data from the JSON file

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [isThinking, setIsThinking] = useState(false);  // New state to track thinking

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleAskQuestion = (query) => {
    if (!query) return;

    // Set thinking state to true when the user submits a query
    setIsThinking(true);
    setResponse("");  // Clear previous response
    setIsResponseVisible(false);

    const lowerCaseQuery = query.toLowerCase();

    // Try to find an exact match for the user's query with the question field
    const match = chatbotData.find((data) =>
      lowerCaseQuery === data.question.toLowerCase()
    );

    // Simulate thinking time (delay the response)
    setTimeout(() => {
      if (match) {
        // If a match is found, set the response randomly from the available answers
        const randomAnswer = match.answers[Math.floor(Math.random() * match.answers.length)];
        setResponse(randomAnswer);
      } else {
        // If no exact match is found, provide a default response
        setResponse("Sorry, I don't have an answer for that.");
      }

      // Trigger response animation and stop thinking
      setIsThinking(false);
      setIsResponseVisible(true);
    }, 2000); // 2 seconds of "thinking" time (you can adjust this)
  };

  const handleSuggestedQuery = (suggestion) => {
    setUserQuery(suggestion); // Set the user's query to the suggestion
    handleAskQuestion(suggestion); // Directly get the answer for the suggestion
  };

  // Function to provide dynamic suggestions based on user input
  const getSuggestedQuestions = () => {
    const suggestions = [];
    const lowerCaseQuery = userQuery.toLowerCase();

    if (lowerCaseQuery.includes("what is")) {
      suggestions.push("What is Instago?");
      suggestions.push("What happens if I return the vehicle late?");
      suggestions.push("What vehicles are available?");
    }
    if (lowerCaseQuery.includes("rent")) {
      suggestions.push("How can I rent a vehicle?");
    }
    if (lowerCaseQuery.includes("cancel")) {
      suggestions.push("Can I cancel my rental?");
      suggestions.push("Can I modify my rental booking?");
    }
    return suggestions;
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button onClick={toggleChat} className="chatbot-toggle-button">
        Chat
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className={`chatbot-window ${isChatOpen ? "open" : ""}`}>
          <div className="chatbot-header">
            <span className="chatbot-title">Instago Help</span>
            <button onClick={toggleChat} className="chatbot-close-button">
              X
            </button>
          </div>
          <div className="chatbot-body">
            <h1>&quot;Any Query?&quot;</h1>
            <div className="chat-box">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask a question..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
              <button className="chat-button" onClick={() => handleAskQuestion(userQuery)}>
                Ask
              </button>
            </div>

            {/* Dynamic Suggested Questions */}
            {userQuery && (
              <div className="suggested-questions">
                <h3>Suggested Questions:</h3>
                <ul>
                  {getSuggestedQuestions().map((suggestion, index) => (
                    <li key={index}>
                      <button onClick={() => handleSuggestedQuery(suggestion)}>
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Thinking Message */}
            {isThinking && (
              <div className="thinking-message">
                <p>Thinking...</p>
              </div>
            )}

            {/* Response Area */}
            <div className={`response-area ${isResponseVisible ? "show" : ""}`}>
              {response && <p>{response}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
