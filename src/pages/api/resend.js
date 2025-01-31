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
            const { data, error } = await resend.emails.send({
                from: 'Livebuy <onboarding@resend.dev>', // Use a verified sender
                to: email,
                subject: 'Livebuy Early Access Notification',
                html: `
                    <h1>Get ready for easy renting with Livebuy!</h1>
                    <p>We'll notify you as soon as our services are back.</p>
                `
            });

            if (error) {
                console.error('Resend API Error:', error);
                return res.status(500).json({ error: 'Failed to send email', details: error });
            }

            return res.status(200).json({ message: 'Email sent successfully', data });
        } catch (error) {
            console.error('Unexpected Error:', error);
            return res.status(500).json({ error: 'Failed to send email', details: error.message });
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