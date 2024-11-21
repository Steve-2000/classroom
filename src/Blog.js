import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QAComponent = ({ userEmail }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePostQuestion = async () => {
    try {
      await axios.post('http://localhost:3001/questions', { userEmail, question: newQuestion });
      setNewQuestion('');
      fetchQuestions();
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handlePostReply = async (id) => {
    try {
      await axios.post(`http://localhost:3001/questions/${id}/replies`, { userEmail, reply: newReply });
      setNewReply('');
      fetchQuestions();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div>
      <h2>Q&A System</h2>
      <div>
        <textarea
          placeholder="Ask a question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={handlePostQuestion}>Post Question</button>
      </div>
      <div>
        {questions.map((q) => (
          <div key={q._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{q.question}</h3>
            <p>Asked by: {q.userEmail}</p>
            {q.replies.map((r, index) => (
              <div key={index} style={{ marginLeft: '20px', backgroundColor: '#f9f9f9', padding: '5px' }}>
                <p>{r.reply} - {r.userEmail}</p>
              </div>
            ))}
            <textarea
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <button onClick={() => handlePostReply(q._id)}>Post Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Blog = () => {
  const [userEmail, setUserEmail] = useState('student1@example.com'); // Simulate login

  return (
    <div>
      <h1>Welcome to the Q&A Platform</h1>
      <QAComponent userEmail={userEmail} />
    </div>
  );
};

export default Blog;
