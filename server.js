// server.js (Node.js/Express example)
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = 'https://ucusngylouypldsoltnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const accountSid = 'ACef6725e10a77ded5d21f7998399cd37f';
const authToken = 'bd2b84ed55741ac6d4c4e4d244852c42';
const client = twilio(accountSid, authToken);

let otps = {}; // Store OTPs with expiration times

app.use(bodyParser.json());

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  const expires = Date.now() + 300000; // OTP valid for 5 minutes
  otps[phoneNumber] = { otp, expires };

  client.messages
    .create({
      body: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      from: '+your-twilio-number',
      to: phoneNumber,
    })
    .then(message => res.status(200).json({ message: 'OTP sent', sid: message.sid }))
    .catch(error => res.status(500).json({ error: 'Failed to send OTP' }));
});

app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  const storedOtp = otps[phoneNumber];

  if (!storedOtp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  if (storedOtp.expires < Date.now()) {
    delete otps[phoneNumber];
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  delete otps[phoneNumber];
  res.status(200).json({ message: 'OTP verified' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
