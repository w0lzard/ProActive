import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = contactSchema.parse(body);
        const id = uuidv4();

        const db = await getDB();
        await db
            .prepare("INSERT INTO contact_messages (id, firstName, lastName, email, subject, message) VALUES (?, ?, ?, ?, ?, ?)")
            .bind(id, firstName, lastName, email, subject, message)
            .run();

        // Send email notification using Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            try {
                await resend.emails.send({
                    from: "ProActive Physiotherapy <noreply@drpronitasinghphysio.com>",
                    to: [CONTACT_EMAIL],
                    replyTo: email,
                    subject: `New Contact Enquiry: ${subject}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #0df259 0%, #0bbd45 100%); padding: 24px; border-radius: 12px 12px 0 0;">
                                <h1 style="color: #0d1c12; margin: 0; font-size: 24px;">New Contact Enquiry</h1>
                            </div>
                            <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; width: 120px;"><strong>Name:</strong></td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${firstName} ${lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;"><strong>Email:</strong></td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;"><a href="mailto:${email}" style="color: #0df259;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;"><strong>Subject:</strong></td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${subject}</td>
                                    </tr>
                                </table>
                                <div style="margin-top: 20px;">
                                    <p style="color: #6c757d; margin-bottom: 8px;"><strong>Message:</strong></p>
                                    <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e9ecef; color: #212529; line-height: 1.6;">
                                        ${message.replace(/\n/g, '<br>')}
                                    </div>
                                </div>
                                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e9ecef; text-align: center;">
                                    <p style="color: #6c757d; font-size: 12px; margin: 0;">
                                        This message was sent from the contact form on drpronitasinghphysio.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    `,
                });
            } catch (emailError) {
                // Log the error but don't fail the request - message is still saved to DB
                console.error("Failed to send email notification:", emailError);
            }
        }

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid input", errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Contact error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
