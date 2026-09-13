import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PASS } from '../constants/app.constants';

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
