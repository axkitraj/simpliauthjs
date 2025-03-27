import nodemailer from 'nodemailer';
class Mailer {
    constructor(sender, email, password, logoUrl) {
        this.sender = sender;
        this.email = email;
        this.password = password;
        this.logoUrl = logoUrl;
        if (!sender || !email || !password) {
            throw new Error('All required arguments must be provided.'.red);
        }
        this.from = `${this.sender} <${this.email}>`;
    }
    gmailTransporter() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.email,
                pass: this.password,
            },
        });
        return transporter;
    }
    async sendMail(transporter, mailOptions, retries) {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`Message sent: ${info.response}`.green);
            return info;
        }
        catch (error) {
            if (retries > 0) {
                console.error(`Failed to send email. Retrying... ${retries} attempts left.`.yellow);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.sendMail(transporter, mailOptions, retries - 1);
            }
            else {
                console.error(`Failed to send email after multiple attempts:`.red, error);
                throw error;
            }
        }
    }
    getSender() {
        return this.sender;
    }
    SendGmail(retries, to, subject, text, html) {
        const from = this.from;
        const info = this.sendMail(this.gmailTransporter(), {
            from, to, subject, text, html
        }, retries);
        return info;
    }
}
export default function simpliMailer(sender, email, password, logoUrl) {
    return new Mailer(sender, email, password, logoUrl);
}
