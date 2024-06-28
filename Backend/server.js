const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConfig = require("./config/db");

const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(express.json());

// Database Connection
dbConfig();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-otp', (req, res) => {
    const { method, contact } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (method === 'sms') {
        client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            body: `Your OTP code is ${otp}`,
            to: contact
        }).then(message => {
            res.status(200).send({ otp, message: 'OTP sent via SMS' });
        }).catch(err => {
            console.error('Failed to send OTP via SMS:', err);
            res.status(500).send({ error: 'Failed to send OTP via SMS' });
        });
    } else if (method === 'email') {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: contact,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send OTP via Email:', error);
                return res.status(500).send({ error: 'Failed to send OTP via Email' });
            }
            res.status(200).send({ otp, message: 'OTP sent via Email' });
        });
    } else {
        res.status(400).send({ error: 'Invalid method' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
