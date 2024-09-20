import React, { useState } from 'react';
import axios from 'axios';

const DoubtForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [doubts, setDoubts] = useState(['']);

  const handleDoubtChange = (index, event) => {
    const newDoubts = doubts.slice();
    newDoubts[index] = event.target.value;
    setDoubts(newDoubts);
  };

  const addDoubtField = () => {
    if (doubts.length < 5) {
      setDoubts([...doubts, '']);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      doubts: doubts.filter(doubt => doubt.trim() !== '')
    };

    axios.post('https://script.google.com/macros/s/AKfycbwZcuBCmokv_J7Hz0LS1SkQhtIPJbM4ulcHCgQh8FVE4abkRjtGU_1E3RpHpbid4iIOeQ/exec', formData)
      .then(response => {
        alert('Doubts submitted successfully!');
      })
      .catch(error => {
        alert('Error submitting doubts');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {doubts.map((doubt, index) => (
        <div key={index}>
          <label>Doubt {index + 1}:</label>
          <input type="text" value={doubt} onChange={(e) => handleDoubtChange(index, e)} required />
        </div>
      ))}
      {doubts.length < 5 && <button type="button" onClick={addDoubtField}>Add Another Doubt</button>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DoubtForm;
