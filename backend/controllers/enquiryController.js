import Enquiry from '../models/Enquiry.js';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enquiries' });
    }
};

export const createEnquiry = async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json(newEnquiry);
    } catch (error) {
        res.status(400).json({ message: 'Error sending enquiry' });
    }
};

export const updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedEnquiry);
    } catch (error) {
        res.status(400).json({ message: 'Error updating enquiry' });
    }
};

export const deleteEnquiry = async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting enquiry' });
    }
};

export const getEnquiryStats = async (req, res) => {
    try {
        const total = await Enquiry.countDocuments();
        const unresolved = await Enquiry.countDocuments({ status: 'new' });
        res.status(200).json({ total, unresolved });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enquiry stats' });
    }
};

export const sendReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;

        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        const mailOptions = {
            from: `"NK Engineering Bureau" <${process.env.EMAIL_USER}>`,
            to: enquiry.email,
            subject: `Re: ${enquiry.subject} - NK Engineering`,
            text: `Dear ${enquiry.name},\n\nThank you for reaching out to NK Engineering. Regarding your enquiry about "${enquiry.subject}", here is our response:\n\n${replyMessage}\n\nBest Regards,\nNK Engineering Lead Bureau`,
            html: `
                <div style="font-family: 'Inter', Arial, sans-serif; padding: 40px; color: #535434; background-color: #fcfcf9;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-top: 8px solid #535434; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                        <h2 style="color: #535434; font-size: 24px; margin-bottom: 30px; letter-spacing: -0.02em;">NK Engineering Hub</h2>
                        <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${enquiry.name}</strong>,</p>
                        <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to NK Engineering. Regarding your enquiry about <strong>"${enquiry.subject}"</strong>, here is our response from the Lead Bureau:</p>
                        <div style="background-color: #f9f9f4; padding: 30px; border-left: 4px solid #535434; margin: 30px 0; font-style: italic; font-size: 15px; line-height: 1.8;">
                            ${replyMessage.replace(/\n/g, '<br>')}
                        </div>
                        <p style="font-size: 16px; line-height: 1.6; margin-top: 40px;">Best Regards,<br><strong>NK Engineering Lead Bureau</strong></p>
                        <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 0.2em;">
                            Secure Structural Mastery // Confidential Official Response
                        </div>
                    </div>
                </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-email@gmail.com') {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('--- EMAIL SIMULATION ---');
            console.log('To:', enquiry.email);
            console.log('Subject:', mailOptions.subject);
            console.log('Message:', replyMessage);
            console.log('------------------------');
        }

        enquiry.status = 'resolved';
        await enquiry.save();

        res.status(200).json({ message: 'Reply dispatched and enquiry archived.' });
    } catch (error) {
        console.error('Email Dispatch Error:', error);
        res.status(500).json({ message: 'Communication failure during email dispatch.' });
    }
};
