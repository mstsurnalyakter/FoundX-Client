import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Force Node.js runtime
export const runtime = 'nodejs';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    
    const body: ContactFormData = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASS, // App password, not regular password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP verification failed:', error);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email to admin/support team
    const adminMailOptions = {
      from: `"FoundX Contact Form" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL, // Send to your email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-top: 0;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
              <p style="margin: 10px 0;"><strong>📋 Subject:</strong> ${subject}</p>
              <p style="margin: 10px 0;"><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">💬 Message:</h3>
              <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
              <p style="margin: 0; color: #1976d2;">
                <strong>📧 To reply:</strong> Simply respond to this email or contact ${email} directly.
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; text-align: center; padding: 20px;">
            <p style="margin: 0; font-size: 16px;">FoundX - Reuniting people with their belongings</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Contact form submission received</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `"FoundX Support" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: '✅ Thank you for contacting FoundX',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Hi ${firstName}! 👋</h2>
            
            <p style="line-height: 1.6; color: #555; font-size: 16px;">
              Thank you for reaching out to FoundX! We've successfully received your message and our team will get back to you within <strong>24 hours</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">📋 Your Message Summary:</h3>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 4px; line-height: 1.5; color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
              <p style="margin: 0; color: #2e7d32; font-size: 16px;">
                <strong>✅ What's Next?</strong><br><br>
                📞 Our support team will review your inquiry and respond to: <strong>${email}</strong><br>
                ⏰ Expected response time: Within 24 hours<br>
                📧 Please check your inbox (and spam folder) for our reply
              </p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">🔍 In the meantime...</h3>
              <p style="color: #555; margin-bottom: 15px;">Feel free to explore our platform:</p>
              <div style="display: inline-block;">
                <a href="${process.env.NEXT_PUBLIC_URL}/found-items" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; display: inline-block;">Browse Found Items</a>
                <a href="${process.env.NEXT_PUBLIC_URL}/about" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; display: inline-block;">About FoundX</a>
              </div>
            </div>
          </div>
          
          <div style="background: #333; color: white; text-align: center; padding: 20px;">
            <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">FoundX</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">Reuniting people with their belongings</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
              🌐 Visit: <a href="${process.env.NEXT_PUBLIC_URL}" style="color: #87ceeb;">www.foundx.com</a> | 
              📧 Email: <a href="mailto:${process.env.SENDER_EMAIL}" style="color: #87ceeb;">support@foundx.com</a>
            </p>
          </div>
        </div>
      `,
    };

    console.log('Sending emails...');

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Admin email sent:', adminResult.messageId);
    console.log('User confirmation email sent:', userResult.messageId);

    return NextResponse.json(
      { 
        message: 'Emails sent successfully! We\'ll get back to you within 24 hours.',
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Detailed error:', error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API endpoint is working with Nodemailer',
      runtime: 'nodejs',
      timestamp: new Date().toISOString(),
      env: {
        hasEmail: !!process.env.SENDER_EMAIL,
        hasPassword: !!process.env.SENDER_APP_PASS,
        email: process.env.SENDER_EMAIL?.replace(/(.{3}).*(@.*)/, '$1***$2') // Partially hide email
      }
    },
    { status: 200 }
  );
}