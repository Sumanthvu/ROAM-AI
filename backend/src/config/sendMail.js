 import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (to, sub, msg) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = sub;
    sendSmtpEmail.htmlContent = msg;
    sendSmtpEmail.sender = { 
      name: "ROAM AI", 
      email: process.env.SMTP_EMAIL || "sumanthveslavath07@gmail.com" 
    };
    sendSmtpEmail.to = [{ email: to }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err.message };
  }
};