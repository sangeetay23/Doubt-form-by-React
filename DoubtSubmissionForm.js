import React, { useState } from 'react';
import './Form.css'; 
import {GoogleGenerativeAI} from '@google/generative-ai';

function DoubtSubmissionForm() {
    const [doubt1, setDoubt1] = useState('');
    const [doubt2, setDoubt2] = useState('');
    const [doubt3, setDoubt3] = useState('');
    const [doubt4, setDoubt4] = useState('');
    const [doubt5, setDoubt5] = useState(''); 
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            doubt1,
            doubt2,
            doubt3,
            doubt4,
            doubt5,
            email,
        };
        
        console.log(formData);
        const genAI = new GoogleGenerativeAI("AIzaSyAGAH9uuJptu0HQcdyVOUNZoSZ-Blfu714");

        
        async function analyzeData() {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            
            const prompt = `Please provide detailed explanations for the following doubts: ${doubt1}, ${doubt2}, ${doubt3}, ${doubt4}, ${doubt5}. After each response, leave some space to separate it from the next one.`;

            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text(); 
            console.log(text);
            

            const Sheet_Url="https://script.google.com/macros/s/AKfycbx58IS8147isamYYg-HqYlkexzyt5iTpAq-rqCwgf2bMwZq2Q6WrWM3uvKAHeNECzge/exec"
            try {
                await fetch(Sheet_Url, {
                  method: 'POST',
                  mode: 'no-cors',
                  body: JSON.stringify({email,text}),
                  muteHttpExceptions: true,
                });
              } catch (error) {
                console.log(error);
              }
        
        };
        analyzeData();

    
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doubt1">Doubt 1</label>
                    <input
                        type="text"
                        id="doubt1"
                        value={doubt1}
                        onChange={(e) => setDoubt1(e.target.value)}
                        placeholder="Enter your doubt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="doubt2">Doubt 2</label>
                    <input
                        type="text"
                        id="doubt2"
                        value={doubt2}
                        onChange={(e) => setDoubt2(e.target.value)}
                        placeholder="Enter your doubt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="doubt3">Doubt 3</label>
                    <input
                        type="text"
                        id="doubt3"
                        value={doubt3}
                        onChange={(e) => setDoubt3(e.target.value)}
                        placeholder="Enter your doubt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="doubt4">Doubt 4</label>
                    <input
                        type="text"
                        id="doubt4"
                        value={doubt4}
                        onChange={(e) => setDoubt4(e.target.value)}
                        placeholder="Enter your doubt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="doubt5">Doubt 5</label>
                    <input
                        type="text"
                        id="doubt5"
                        value={doubt5}
                        onChange={(e) => setDoubt5(e.target.value)}
                        placeholder="Enter your doubt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit Doubts</button>
            </form>
        </div>
    );
}

export default DoubtSubmissionForm;

