const nodemailer = require('nodemailer');
const axios = require('axios');
const subscriberModel = require('../models/subscriberModel.js');

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || 'localhost',
	port: parseInt(process.env.SMTP_PORT) || 587,
	secure: process.env.SMTP_SECURE === 'true',
	auth: process.env.SMTP_USER ? {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	} : undefined,
});

const sendEmail = async (to, subject, text) => {
	try {
		await transporter.sendMail({
			from: process.env.SMTP_FROM || 'ServPulse <noreply@servpulse.local>',
			to,
			subject,
			text,
		});
	} catch (error) {
		console.error(`Failed to send email to ${to}:`, error.message);
	}
};

const sendWebhook = async (url, payload) => {
	try {
		await axios.post(url, payload, {
			headers: { 'Content-Type': 'application/json' },
			timeout: 10000,
		});
	} catch (error) {
		console.error(`Failed to send webhook to ${url}:`, error.message);
	}
};

const notifyAll = async (event, data) => {
	const result = await subscriberModel.getConfirmedSubscribers();
	const subscribers = result.rows;
	const baseUrl = process.env.APP_URL || 'http://localhost:8080';

	const subject = `[ServPulse] ${event}`;
	const payload = { event, timestamp: new Date().toISOString(), ...data };

	const promises = subscribers.map((sub) => {
		if (sub.type === 'email' && sub.email) {
			const unsubscribeUrl = `${baseUrl}/unsubscribe/${sub.unsubscribe_token}`;
			const text = formatNotification(event, data, unsubscribeUrl);
			return sendEmail(sub.email, subject, text);
		} else if (sub.type === 'webhook' && sub.webhook_url) {
			return sendWebhook(sub.webhook_url, payload);
		}
	});

	await Promise.allSettled(promises);
};

const formatNotification = (event, data, unsubscribeUrl) => {
	let text = `ServPulse Notification\n${'='.repeat(40)}\n\n`;
	text += `Event: ${event}\n`;
	text += `Time: ${new Date().toISOString()}\n\n`;

	if (data.title) text += `Title: ${data.title}\n`;
	if (data.status) text += `Status: ${data.status}\n`;
	if (data.impact) text += `Impact: ${data.impact}\n`;
	if (data.message) text += `Message: ${data.message}\n`;

	text += `\n${'—'.repeat(40)}\n`;
	text += `Unsubscribe: ${unsubscribeUrl}\n`;

	return text;
};

module.exports = { notifyAll, sendEmail, sendWebhook };
