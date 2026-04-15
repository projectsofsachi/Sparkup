import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = process.env.PORT || 3001;

// Initialize Resend with API key
const resend = new Resend('re_4q54b2g9_4rxJzXAJkoNrGMyy8sNYT5Ut');

// Middleware
app.use(cors());
app.use(express.json());

// Email endpoint for main registration
app.post('/api/send-registration-email', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      isSiliconStudent,
      sic,
      branch,
      year,
      teamSize,
      members,
      eventName
    } = req.body;

    // Build member details
    const memberDetails = members && members.length
      ? members
          .map(
            (member, idx) =>
              `<li><strong>Member ${idx + 2}</strong>: ${member.name || "N/A"} — SIC: ${member.sic || "N/A"} — Branch: ${member.branch || "N/A"}</li>`
          )
          .join("")
      : "<li>No additional team members.</li>";

    const html = `
      <h1>New Registration Received</h1>
      <p>A new user has registered for <strong>${eventName || 'Event'}</strong>.</p>
      <ul>
        <li><strong>Name:</strong> ${name || "N/A"}</li>
        <li><strong>Email:</strong> ${email || "N/A"}</li>
        <li><strong>Phone:</strong> ${phone || "N/A"}</li>
        <li><strong>Silicon Student:</strong> ${isSiliconStudent || "N/A"}</li>
        <li><strong>SIC:</strong> ${sic || "N/A"}</li>
        <li><strong>Branch:</strong> ${branch || "N/A"}</li>
        <li><strong>Year:</strong> ${year || "N/A"}</li>
        <li><strong>Team Size:</strong> ${teamSize || "N/A"}</li>
      </ul>
      <h2>Team Members</h2>
      <ul>${memberDetails}</ul>
      <p>Registration timestamp: <strong>${new Date().toISOString()}</strong></p>
    `;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['sachidanandapc3@gmail.com'],
      subject: `New registration for ${eventName || 'Event'}`,
      html: html,
      reply_to: email || 'noreply@example.com'
    });

    console.log('Email sent successfully:', data);
    res.json({ success: true, data });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Email endpoint for Skill Upgrade registration
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      siliconId,
      siliconMailId,
      password
    } = req.body;

    const html = `
      <h1>New Skill Upgrade Registration</h1>
      <p>A new user has registered for Skill Upgrade workshops and mentorship.</p>
      <ul>
        <li><strong>Silicon ID:</strong> ${siliconId || "N/A"}</li>
        <li><strong>Silicon Mail ID:</strong> ${siliconMailId || "N/A"}</li>
        <li><strong>Password:</strong> ${password || "N/A"}</li>
      </ul>
      <p>Registration timestamp: <strong>${new Date().toISOString()}</strong></p>
    `;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['sachidanandapc3@gmail.com'],
      subject: 'New Skill Upgrade Registration',
      html: html,
      reply_to: siliconMailId || 'noreply@example.com'
    });

    console.log('Skill Upgrade email sent successfully:', data);
    res.json({ success: true, data });

  } catch (error) {
    console.error('Error sending Skill Upgrade email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});