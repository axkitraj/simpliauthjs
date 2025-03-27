export type TypeMailer = Mailer;
declare class Mailer {
    private sender;
    private email;
    private password;
    private logoUrl?;
    private from;
    constructor(sender: string, email: string, password: string, logoUrl?: string | undefined);
    private gmailTransporter;
    private sendMail;
    getSender(): string;
    SendGmail(retries: number | 1, to: any, subject: string, text?: string, html?: string): Promise<any>;
}
export default function simpliMailer(sender: string, email: string, password: string, logoUrl?: string): Mailer;
export {};
