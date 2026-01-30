import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { appointmentSchema } from "@/lib/validations";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

interface Appointment {
    id: string;
    userId: string;
    service: string;
    therapist: string;
    date: string;
    time: string;
    status: string;
    createdAt: string;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { service, therapist, date, time } = appointmentSchema.parse(body);
        const userId = session.user.id;
        const userName = session.user.name || "Customer";
        const userEmail = session.user.email || "No email provided";
        const id = uuidv4();

        const db = await getDB();
        await db
            .prepare("INSERT INTO appointments (id, userId, service, therapist, date, time) VALUES (?, ?, ?, ?, ?, ?)")
            .bind(id, userId, service, therapist, date, time)
            .run();

        // Send email notification to doctor/admin
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            try {
                await resend.emails.send({
                    from: "ProActive Booking <noreply@drpronitasinghphysio.com>",
                    to: [CONTACT_EMAIL],
                    subject: `New Appointment Booking: ${userName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #0df259 0%, #0bbd45 100%); padding: 32px; text-align: center;">
                                <h1 style="color: #0d1c12; margin: 0; font-size: 24px;">New Appointment Request</h1>
                            </div>
                            <div style="padding: 32px;">
                                <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">You have received a new appointment booking. Below are the details:</p>
                                
                                <div style="background: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold; width: 140px;">Patient Name:</td>
                                            <td style="padding: 8px 0; color: #111827;">${userName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Patient Email:</td>
                                            <td style="padding: 8px 0; color: #111827;">${userEmail}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Service:</td>
                                            <td style="padding: 8px 0; color: #111827;">${service}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Therapist:</td>
                                            <td style="padding: 8px 0; color: #111827;">${therapist}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                                            <td style="padding: 8px 0; color: #111827;">${new Date(date).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                                            <td style="padding: 8px 0; color: #111827;">${time}</td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div style="text-align: center;">
                                    <a href="https://drpronitasinghphysio.com/login" style="display: inline-block; background: #0df259; color: #0d1c12; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none;">View in Admin Panel</a>
                                </div>
                            </div>
                            <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
                                This is an automated notification from ${CONTACT_EMAIL}
                            </div>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error("Failed to send appointment notification email:", emailError);
                // We don't fail the request if email fails, as the appointment is already in DB
            }
        }

        return NextResponse.json(
            { message: "Appointment booked successfully", id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid input", errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Booking error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const db = await getDB();

        const { results: appointments } = await db
            .prepare("SELECT * FROM appointments WHERE userId = ? ORDER BY createdAt DESC")
            .bind(userId)
            .all<Appointment>();

        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Fetch appointments error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
