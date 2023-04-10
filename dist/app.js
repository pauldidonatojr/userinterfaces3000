const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const https = require('https');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const emailUser = process.env.EMAIL_USER; // Use environment variable for email user
const emailPassword = process.env.EMAIL_PASSWORD; // Use environment variable for email password
const recipient = process.env.RECIPIENT_EMAIL; // Use environment variable for recipient's email

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});
function sendEmail(tokenPrice) {
  const mailOptions = {
    from: emailUser,
    to: recipient,
    subject: 'Token Price',
    text: tokenPrice,
    html: `
      <p>${tokenPrice}</p>
      <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
<a href="" target="_blank" style="color: white; text-decoration: none;">Sell Now</a>      </button>
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email: ${error.message}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/fetch-value', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    // Navigate to the Dextools page for the token
    await page.goto('https://www.dextools.io/app/en/ether/pair-explorer/0x34b6f33a5d88fca1b8f78a510bc81673611a68f0');

    // Wait for the element with the class 'token-price ng-tns-c187-98 ng-star-inserted' to appear and extract its text content
    const element = await page.waitForSelector('strong.ng-tns-c169-3');
    const textContent = await page.evaluate(element => element.textContent, element);
    const floatValue = parseFloat(textContent.replace('$', '')); // Remove the dollar sign and convert to integer

    if (floatValue) {
      const message = `The price is (${textContent})`;
      sendEmail(message);
    }
    if (floatValue >= 0.013) {
      console.log('the price is above 0.01300');
    }
    if (floatValue <= 0.02) {
      console.log('the price is below 0.02000');
    }
    if (floatValue >= 0.02) {
      console.log('the price is above 0.0200');
    }
    await browser.close();
    res.send(textContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the value');
  }
});

// route handler for form submission
app.post('/validate', (req, res) => {
  const {
    username,
    password
  } = req.body;

  // handle form submission
  if (username === 'admin' && password === 'password123') {
    res.set('Authorization', 'Bearer mytoken');
    res.redirect('./token.html');
  } else {
    res.status(401).send('Incorrect username or password.');
  }
});
module.exports = app;
