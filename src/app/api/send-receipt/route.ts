import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerEmail,
      customerName,
      toolName,
      startDate,
      endDate,
      days,
      totalPaid,
      deposit,
      location,
      accessCode
    } = body

    console.log('📧 Attempting to send email to:', customerEmail)
    console.log('🔑 Using Resend API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing')

    const data = await resend.emails.send({
      from: 'Tool Locker Utah Valley <noreply@toollocker.com>',
      to: [customerEmail],
      subject: `🔧 Tool Rental Confirmation - ${toolName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tool Rental Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🔧 Tool Locker Utah Valley</h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Your Rental Confirmation</p>
            </div>

            <!-- Confirmation Message -->
            <div style="padding: 30px; text-align: center; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; background-color: #10b981; border-radius: 50%; margin-bottom: 20px;">
                <span style="color: white; font-size: 30px;">✓</span>
              </div>
              <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 24px;">Reservation Confirmed!</h2>
              <p style="color: #047857; margin: 0; font-size: 16px;">Hi ${customerName}, your tool rental is all set.</p>
            </div>

            <!-- Access Code Section -->
            <div style="padding: 30px; background-color: #dbeafe; text-align: center;">
              <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📱 Your Access Code</h3>
              <div style="background-color: #ffffff; border: 3px solid #3b82f6; border-radius: 12px; padding: 20px; margin: 0 auto; display: inline-block; min-width: 200px;">
                <div style="color: #1e40af; font-size: 36px; font-weight: bold; letter-spacing: 4px; margin: 0;">${accessCode}</div>
              </div>
              <p style="color: #1e40af; margin: 15px 0 0 0; font-size: 14px;">Use this code at the pickup location kiosk</p>
            </div>

            <!-- Rental Details -->
            <div style="padding: 30px;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📋 Rental Details</h3>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Tool:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${toolName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Rental Period:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${startDate} - ${endDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Duration:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${days} day${days !== 1 ? 's' : ''}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Pickup Location:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${location}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Total Paid:</td>
                  <td style="padding: 12px 0; color: ${totalPaid === 0 ? '#10b981' : '#059669'}; font-weight: bold; text-align: right; font-size: 16px;">
                    ${totalPaid === 0 ? 'FREE' : `$${totalPaid.toFixed(2)}`}
                  </td>
                </tr>
              </table>

              ${deposit > 0 ? `
              <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 20px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  <strong>Security Deposit:</strong> $${deposit.toFixed(2)} has been authorized and will be released after tool return.
                </p>
              </div>
              ` : ''}
            </div>

            <!-- Pickup Instructions -->
            <div style="padding: 30px; background-color: #f8fafc;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">📍 Pickup Instructions</h3>
              <ol style="color: #4b5563; padding-left: 20px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">Go to <strong>${location}</strong> during business hours</li>
                <li style="margin-bottom: 8px;">Find the self-service kiosk</li>
                <li style="margin-bottom: 8px;">Enter your access code: <strong>${accessCode}</strong></li>
                <li style="margin-bottom: 8px;">Follow the on-screen instructions</li>
                <li style="margin-bottom: 8px;">Return the tool to the same location when finished</li>
              </ol>

              <div style="background-color: #e0e7ff; border-left: 4px solid #6366f1; padding: 15px; margin-top: 20px;">
                <p style="color: #3730a3; margin: 0; font-size: 14px;">
                  <strong>Need Help?</strong> Call us at (801) 555-0123 or email support@toollocker.com
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 30px; text-align: center; background-color: #1f2937; color: #9ca3af;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">Thank you for choosing Tool Locker Utah Valley!</p>
              <p style="margin: 0; font-size: 12px;">Visit us at toollocker.com</p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    console.log('✅ Email sent successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('❌ Error sending email:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}