import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // your mail address
    pass: process.env.NODEMAILER_APP_PASSWORD, // your 16 didgit app password
  },
});


// function to send email
export const sendOtpMail = async (to,otp, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from:  process.env.EMAIL,
      to,
      subject : 'Reset your password',
    //   text,  // plain text version
      html: `<p> Your OTP for password  reset is <b> ${otp} </b>. It is valid for 5 minutes only.</p>`
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};