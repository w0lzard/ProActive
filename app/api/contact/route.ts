import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { contactSchema } from "@/lib/validations";

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
