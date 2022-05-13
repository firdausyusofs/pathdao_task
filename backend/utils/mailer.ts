import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import moment from "moment";

import { EmailVerification } from '../models/emailVerification';

dotenv.config();

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

class Mailer {

    static async sendVerificationEmail(email: string) {
        var salt = bcrypt.genSaltSync(10);
        var hashedToken = bcrypt.hashSync(email+moment(), salt);

        await EmailVerification.create({
            email,
            token: hashedToken,
            expires_at: moment().add(1, "hour")
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM, // Sender address
            to: email, // List of recipients
            subject: 'Verify Email Address', // Subject line
            text: `http://localhost:4000/api/v1/email/verify?token=${hashedToken}`,
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }

}

module.exports = Mailer;