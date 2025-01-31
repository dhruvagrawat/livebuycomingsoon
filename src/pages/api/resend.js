import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        // Add email validation
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        try {
            // Email to user
            const userEmailResult = await resend.emails.send({
                from: 'Livebuy <onboarding@resend.dev>',
                to: email,
                subject: 'Thanks for Joining Livebuy!',
                html: `
                    <h1>Thank you for your interest!</h1>
                    <p>We'll notify you as soon as our services are available.</p>
                `
            });

            // Email to internal team
            const internalEmailResult = await resend.emails.send({
                from: 'Livebuy <onboarding@resend.dev>',
                to: 'devlivebuy8@gmail.com',
                subject: 'New Livebuy Early Access Signup',
                html: `
                    <h2>New User Signup Details</h2>
                    <p>Email: ${email}</p>
                    <p>Signed up for early access</p>
                `
            });

            // Check for errors in either email send
            if (userEmailResult.error || internalEmailResult.error) {
                console.error('Email Send Error:', userEmailResult.error || internalEmailResult.error);
                return res.status(500).json({ error: 'Failed to send emails' });
            }

            return res.status(200).json({ message: 'Emails sent successfully' });
        } catch (error) {
            console.error('Unexpected Error:', error);
            return res.status(500).json({ error: 'Failed to send emails', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

// Simple email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}