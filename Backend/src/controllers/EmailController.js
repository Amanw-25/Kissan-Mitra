import nodemailer from "nodemailer";
import { appconfig } from "../config/appconfig.js";

export const sendEmailController = async (req, res) => {
  try {
    // Ensure the user is authenticated
    const userId = req.user._id;
    if (!userId) {
      console.error("User ID not found in request");
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Extract details from req.body
    const { firstName, lastName, email, contactNumber, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !contactNumber || !message) {
      console.error("One or more required fields are missing in the request");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail SMTP service
      auth: {
        user: appconfig.EMAILJS_USER_ID, // Your Gmail address
        pass: appconfig.EMAILJS_USER_SECRET, // Your Gmail app password
      },
      tls: {
        rejectUnauthorized: false, // Optional: Can help with some SSL issues
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "amanwairagkar25@gmail.com",
      subject: `Message from ${firstName} ${lastName}`,
      text: `
        Message from Farmer:
        -------------------
        Name: ${firstName} ${lastName}
        Email: ${email}
        Contact Number: ${contactNumber}

        Message Content:
        ${message}
      `,
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
