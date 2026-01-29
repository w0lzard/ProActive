import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { appointmentSchema } from "@/lib/validations";

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
        const id = uuidv4();

        const db = await getDB();
        await db
            .prepare("INSERT INTO appointments (id, userId, service, therapist, date, time) VALUES (?, ?, ?, ?, ?, ?)")
            .bind(id, userId, service, therapist, date, time)
            .run();

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
