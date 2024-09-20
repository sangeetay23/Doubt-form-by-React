const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle doubts submission
app.post('/api/submit-doubts', async (req, res) => {
    const { doubts, email } = req.body;

    // Here you can process the doubts, e.g., send them to a Google Sheet or use the Gemini API

    // Example: Send an email with the doubts (optional)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password', // Your email password or app password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Academic Doubts Answered',
        text: `Here are your doubts:\n${doubts.join('\n')}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Doubts submitted successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to submit doubts.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
