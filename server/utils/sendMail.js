import nodemailer from "nodemailer";

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

export const sendEmail = async (targetUserEmail, name, subject, message) => {
    if (!targetUserEmail || !name) {
        console.log("Target user email and name are required");
        return;
    }

    try {
        const transporter = nodemailer.createTransport(emailConfig);

        const mailOptions = {
            from: SENDER_EMAIL,

            to: targetUserEmail,

            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${targetUserEmail}: ${info.response}`);
    } catch (err) {
        console.error(`Failed to send email: ${err.message}`);
    }
};
