require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create transporter object using SMTP
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // Use the service from the environment variables
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'faithrono132@gmail.com',
        subject: `New message from ${name}`,
        text: message,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Email sent successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
