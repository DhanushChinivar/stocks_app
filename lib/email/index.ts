import { Resend } from 'resend';
import {NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const html = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    await resend.emails.send({
        from: 'Rallify <hello@rallify.app>',
        to: email,
        subject: 'Welcome to Rallify - your stock market toolkit is ready!',
        html,
    });
};

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const html = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    await resend.emails.send({
        from: 'Rallify Stock News <hello@rallify.app>',
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        html,
    });
};