require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer");


const port = 3000



app.use(cors())
app.use(express.json())

app.post('/sendEmail', async function (req, res) {
  res.send('Hello World')
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL_USER, // Load from environment variables
        pass: process.env.EMAIL_PASS,
    },
  });
  
  const info = await transporter.sendMail({
    from: `"Client Message" <${process.env.EMAIL_USER}>`, // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: req.body.subject, // Subject line
    html: `<b>Name:</b>${req.body.name}
        <b>Email:</b>${req.body.email}
        <b>Location:</b>${req.body.location}
         <b>Name:</b>${req.body.subject}
        <b>Name:</b>${req.body.message}
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
})









app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})