import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);

        // Real Email Existence Check
        const { validateEmailReal } = await import("@/lib/email-validator");
        const emailCheck = await validateEmailReal(email);
        if (!emailCheck.valid) {
            return NextResponse.json(
                { message: emailCheck.message },
                { status: 400 }
            );
        }

        const db = await getDB();

        const existingUser = await db
            .prepare("SELECT id FROM users WHERE email = ?")
            .bind(email)
            .first();

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        await db
            .prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
            .bind(id, name, email, hashedPassword)
            .run();

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
