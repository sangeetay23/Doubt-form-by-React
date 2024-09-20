import React, { useState } from 'react';

const DoubtForm = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to send question to backend or API
    console.log(question);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question">Your Question:</label>
      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DoubtForm;
