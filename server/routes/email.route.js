import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Email Configuration
const SENDER_EMAIL = "";
const SENDER_PASWD = "";

const emailConfig = {
    service: "gmail",
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASWD,
    },
};


const sendEmail = async (req, res) => {
    const { targetUserEmail, name } = req.body;

    if (!targetUserEmail || !name) {
        return res.status(400).json({ error: "Target user email and name are required" });
    }

    try {
        const transporter = nodemailer.createTransport(emailConfig);

        const mailOptions = {
            from: SENDER_EMAIL,
            to: targetUserEmail,
            subject: `Activity Points Update for ${name}`,
            text: `Dear ${name},\n\nYou have low activity points.\n\nRegards,\nCounsellor`,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${targetUserEmail}: ${info.response}`);
        res.status(200).json({ message: `Email sent to ${targetUserEmail}` });
    } catch (err) {
        console.error(`Failed to send email: ${err.message}`);
        res.status(500).json({ error: `Failed to send email: ${err.message}` });
    }
};

router.route("/send-email").post(sendEmail);

export default router;
