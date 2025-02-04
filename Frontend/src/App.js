import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function DocumentQABot() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadDocument = async () => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setAnswer('File size exceeds 10MB limit.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData);
        setContent(response.data.content);
      } catch (error) {
        setAnswer('Error: ' + error.response.data.error);
      }
    }
  };

  const askQuestion = () => {
    if (!question || !content) {
      setAnswer('Please upload a document and enter a question.');
      return;
    }

    const index = content.toLowerCase().indexOf(question.toLowerCase());
    if (index !== -1) {
      const result = content.substring(index, Math.min(index + 200, content.length));
      setAnswer('Answer: ' + result);
    } else {
      setAnswer('No relevant information found.');
    }
  };

  return (
    <div className="qa-bot-container full-screen">
      <h1 className="qa-bot-title">📄 Document Q&A Bot 🤖</h1>
      <div className="qa-bot-upload-section">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="qa-bot-file-input"
        />
        <button 
          onClick={uploadDocument} 
          className="qa-bot-upload-button"
        >
          Upload Document
        </button>
      </div>

      <textarea
        value={content}
        readOnly
        className="qa-bot-content"
        placeholder="Document content will appear here"
      ></textarea>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="💬 Enter your question here..."
        className="qa-bot-question-input"
      />

      <button 
        onClick={askQuestion} 
        className="qa-bot-ask-button"
      >
        Ask Question
      </button>

      <textarea
        value={answer}
        readOnly
        className="qa-bot-answer"
        placeholder="📝 Answer will appear here"
      ></textarea>
    </div>
  );
}
