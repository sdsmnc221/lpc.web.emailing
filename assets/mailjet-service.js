// MAILJET INTEGRATION
const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

async function sendNewsletterMailjet(htmlContent, recipients) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "newsletter@yourcompany.com",
          Name: "Your Company Newsletter",
        },
        To: recipients.map((email) => ({ Email: email })),
        Subject: "Your Weekly Newsletter",
        HTMLPart: htmlContent,
        // Optional: Add custom variables
        Variables: {
          first_name: "John",
          cta_link: "https://yourwebsite.com/article",
          unsubscribe_link: "https://yourwebsite.com/unsubscribe",
          manage_preferences_link: "https://yourwebsite.com/preferences",
        },
      },
    ],
  });

  try {
    const result = await request;
    console.log("Newsletter sent successfully:", result.body);
    return result;
  } catch (error) {
    console.error("Error sending newsletter:", error);
    throw error;
  }
}

// MAILERLITE INTEGRATION
const axios = require("axios");

class MailerLiteNewsletter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.mailerlite.com/api/v2";
  }

  async createCampaign(htmlContent, subject, groupId) {
    try {
      // Create campaign
      const campaignResponse = await axios.post(
        `${this.baseURL}/campaigns`,
        {
          type: "regular",
          subject: subject,
          groups: [groupId],
          content: htmlContent,
        },
        {
          headers: {
            "X-MailerLite-ApiKey": this.apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      return campaignResponse.data;
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data || error);
      throw error;
    }
  }

  async sendCampaign(campaignId) {
    try {
      const response = await axios.post(
        `${this.baseURL}/campaigns/${campaignId}/actions/send`,
        {},
        {
          headers: {
            "X-MailerLite-ApiKey": this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending campaign:", error.response?.data || error);
      throw error;
    }
  }
}

// SENDGRID INTEGRATION
const sgMail = require("@sendgrid/mail");

async function sendNewsletterSendGrid(htmlContent, recipients) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    from: "newsletter@yourcompany.com",
    subject: "Your Weekly Newsletter",
    html: htmlContent,
    personalizations: recipients.map((email) => ({
      to: [{ email }],
      substitutions: {
        "{{first_name}}": "Subscriber",
        "{{cta_link}}": "https://yourwebsite.com/article",
        "{{unsubscribe_link}}": "https://yourwebsite.com/unsubscribe",
        "{{manage_preferences_link}}": "https://yourwebsite.com/preferences",
      },
    })),
  };

  try {
    const response = await sgMail.sendMultiple(msg);
    console.log("Newsletter sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending newsletter:", error);
    throw error;
  }
}

// NODEMAILER (Self-hosted/SMTP)
const nodemailer = require("nodemailer");

async function sendNewsletterNodemailer(htmlContent, recipients) {
  // Create transporter (example with Gmail)
  let transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send to each recipient
  const promises = recipients.map(async (email) => {
    // Replace template variables
    let personalizedHTML = htmlContent
      .replace(/\{\{first_name\|default:"there"\}\}/g, "there")
      .replace(
        /\{\{cta_link\|default:'#'\}\}/g,
        "https://yourwebsite.com/article"
      )
      .replace(
        /\{\{unsubscribe_link\}\}/g,
        `https://yourwebsite.com/unsubscribe?email=${email}`
      )
      .replace(
        /\{\{manage_preferences_link\}\}/g,
        `https://yourwebsite.com/preferences?email=${email}`
      );

    const mailOptions = {
      from: '"Your Newsletter" <newsletter@yourcompany.com>',
      to: email,
      subject: "Your Weekly Newsletter",
      html: personalizedHTML,
    };

    return transporter.sendMail(mailOptions);
  });

  try {
    const results = await Promise.all(promises);
    console.log("All newsletters sent successfully");
    return results;
  } catch (error) {
    console.error("Error sending newsletters:", error);
    throw error;
  }
}

// USAGE EXAMPLES
async function main() {
  const htmlTemplate = `<!-- Your HTML template here -->`;
  const recipients = ["user1@example.com", "user2@example.com"];

  // Choose your preferred service:

  // 1. Mailjet
  // await sendNewsletterMailjet(htmlTemplate, recipients);

  // 2. MailerLite
  // const mailerLite = new MailerLiteNewsletter('your-api-key');
  // const campaign = await mailerLite.createCampaign(htmlTemplate, 'Weekly Newsletter', 'group-id');
  // await mailerLite.sendCampaign(campaign.id);

  // 3. SendGrid
  // await sendNewsletterSendGrid(htmlTemplate, recipients);

  // 4. Nodemailer
  // await sendNewsletterNodemailer(htmlTemplate, recipients);
}

// Export functions for use in your application
module.exports = {
  sendNewsletterMailjet,
  MailerLiteNewsletter,
  sendNewsletterSendGrid,
  sendNewsletterNodemailer,
};
