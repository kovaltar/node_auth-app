/* eslint-disable no-console */
import 'dotenv/config';
import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function send({ email, subject, html }) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

function sendActivationEmail(email, token) {
  // href for frontend
  const href = `${process.env.CLIENT_HOST}/activate/${token}`;
  // href for backend
  // const href = `${process.env.SERVER_HOST}/activation/${token}`;
  const html = `
  <h1>Activate account</h1>
  <a href="${href}">${href}</a>`;

  return send({
    email,
    html,
    subject: 'Activate',
  });
}

export const emailService = {
  sendActivationEmail,
  send,
};
// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     // from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//     to: 'hisotod862@daupload.com',
//     subject: 'Hello ✔',
//     text: 'Hello world?', // plain‑text body
//     html: '<b>Hello world?</b>', // HTML body
//   });

//   console.log('Email is sent');
//   console.log('Message sent:', info.messageId);
// })();
