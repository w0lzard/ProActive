import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

interface DBUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const db = await getDB();
                const user = await db
                    .prepare("SELECT * FROM users WHERE email = ?")
                    .bind(credentials.email)
                    .first<DBUser>();

                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            // For OAuth providers, create user in DB if they don't exist
            if (account?.provider === "google" && user.email) {
                try {
                    const db = await getDB();
                    const existingUser = await db
                        .prepare("SELECT id FROM users WHERE email = ?")
                        .bind(user.email)
                        .first<{ id: string }>();

                    if (!existingUser) {
                        // Create new user for OAuth login
                        const id = uuidv4();
                        await db
                            .prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
                            .bind(id, user.name || "User", user.email, "oauth-no-password")
                            .run();
                    }
                } catch (error) {
                    console.error("Error creating OAuth user:", error);
                    // Still allow sign-in even if DB write fails
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            // For OAuth users, get the DB user id
            if (account?.provider === "google" && token.email) {
                try {
                    const db = await getDB();
                    const dbUser = await db
                        .prepare("SELECT id FROM users WHERE email = ?")
                        .bind(token.email)
                        .first<{ id: string }>();
                    if (dbUser) {
                        token.id = dbUser.id;
                    }
                } catch (error) {
                    console.error("Error fetching OAuth user:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
