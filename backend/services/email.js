// Email Service for sending booking notifications
const nodemailer = require('nodemailer');

// TODO: Configure your email service credentials
// You can use Gmail, SendGrid, Mailgun, or any SMTP service

const transporter = nodemailer.createTransport({
  // TODO: Add your email service configuration
  // Example for Gmail:
  // service: 'gmail',
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASSWORD
  // }
  
  // Example for custom SMTP:
  // host: process.env.SMTP_HOST,
  // port: process.env.SMTP_PORT,
  // secure: true,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASSWORD
  // }
  
  // For testing, you can use ethereal.email or mailtrap.io
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER || 'your-test-email@ethereal.email',
    pass: process.env.EMAIL_PASSWORD || 'your-test-password'
  }
});

const sendBookingEmail = async (bookingData) => {
  const { name, email, phone, date, time, service, packageType, notes } = bookingData;
  
  // TODO: Replace with actual admin email
  const adminEmail = process.env.ADMIN_EMAIL || 'chetansen2004@gmail.com';
  
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #444; padding-bottom: 10px;">
        New Booking Received - He & She Hairfix Salon
      </h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #444; margin-top: 0;">Customer Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #444; margin-top: 0;">Booking Details</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${packageType ? `<p><strong>Package:</strong> ${packageType}</p>` : ''}
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      </div>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This is an automated notification from He & She Hairfix Salon booking system.
      </p>
    </div>
  `;
  
  const mailOptions = {
    from: `"He & She Hairfix Salon" <${process.env.EMAIL_USER || 'noreply@salon.com'}>`,
    to: adminEmail,
    subject: `New Booking: ${name} - ${service} on ${formattedDate}`,
    html: emailContent
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

module.exports = {
  sendBookingEmail,
  testEmailConfig
};
