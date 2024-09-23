import React, { useState } from "react";
import Editor from "./components/Editor";
import Compiler from "./components/Compiler";
import { LanguageProvider } from "./utils/LanguageContext";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("// Write your code here...");
  const [suggestion, setSuggestion] = useState("");

  const handleSuggest = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        contents: [
          {
            parts: [
              {
                text: code,
              },
            ],
          },
        ],
      });

      console.log(response.data); // Log the entire response to see its structure

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const suggestionText = response.data.candidates[0].content.parts[0].text;
        const formattedSuggestion = suggestionText
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
          .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
          .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>') // Code block
          .replace(/\n/g, '<br>'); // Line breaks
        setSuggestion(formattedSuggestion);
      } else {
        setSuggestion("No suggestion available");
      }
    } catch (error) {
      setSuggestion("Error getting suggestion: " + error.message);
    }
  };

  return (
    <LanguageProvider>
      <div className="app">
        <h1>AI-Assisted Code Editor</h1>
        <Editor code={code} setCode={setCode} />
        <button className="suggest-button" onClick={handleSuggest}>
          Get AI Suggestion
        </button>
        {suggestion && (
          <div className="suggestion-box">
            <h3>AI Suggestion:</h3>
            <p dangerouslySetInnerHTML={{ __html: suggestion }}></p>
          </div>
        )}
        <Compiler code={code} />
      </div>
    </LanguageProvider>
  );
}

export default App;
