import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

interface DBUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
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

                try {
                    const db = await getDB();
                    const user = await db
                        .prepare("SELECT * FROM users WHERE email = ?")
                        .bind(credentials.email)
                        .first<DBUser>();

                    if (!user) {
                        return null;
                    }

                    // For security, we don't allow login for placeholder OAuth accounts
                    if (user.password.startsWith("oauth-no-password")) {
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
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
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

export const getAuthOptions = () => authOptions;
