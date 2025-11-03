require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory OTP storage
const emailOtps = {};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,      // your Gmail address
    pass: process.env.GMAIL_APP_PASS,  // the App Password
  },
});

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
app.post('/api/send-email-otp', async (req, res) => {
  const { to_email } = req.body;

  if (!to_email) return res.status(400).json({ message: 'Email is required' });

  const otp = generateOtp();
  emailOtps[to_email] = otp;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to_email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/api/verify-email-otp', (req, res) => {
  const { to_email, otp } = req.body;

  if (emailOtps[to_email] && emailOtps[to_email] === otp) {
    delete emailOtps[to_email];
    return res.json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
