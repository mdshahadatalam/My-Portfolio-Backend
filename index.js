// const express = require('express')
// const app = express()
// const cors = require('cors')
// const nodemailer = require("nodemailer");


// const port = 3000



// app.use(cors())
// app.use(express.json())

// app.post('/sendEmail', async function (req, res) {
//   res.send('Hello World')
//   console.log(req.body);
//   const transporter = nodemailer.createTransport({
//     service:"gmail",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: "mdshahadatalam25@gmail.com",
//       pass: "bmgy sbbw ctbm prdi",
//     },
//   });
  
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: req.body.subject, // Subject line
//     html: `<b>Name:</b>${req.body.name}
//         <b>Email:</b>${req.body.email}
//         <b>Location:</b>${req.body.location}
//          <b>Name:</b>${req.body.subject}
//         <b>Name:</b>${req.body.message}
//     `, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
  
// })









// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })




const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to send emails
app.post('/sendEmail', async function (req, res) {
  try {
    const { name, email, location, subject, message } = req.body;

    if (!name || !email || !location || !subject || !message) {
      return res.status(400).send("All fields are required");
    }

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Load from .env
        pass: process.env.EMAIL_PASS, // Load from .env
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`, // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: subject, // Subject line
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `, // Email body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
