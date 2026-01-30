"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Password strength states
    const [strength, setStrength] = useState(0);
    const [strengthLabel, setStrengthLabel] = useState("");
    const [strengthColor, setStrengthColor] = useState("bg-gray-200");

    const calculateStrength = (pass: string) => {
        let score = 0;
        if (!pass) return 0;

        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        return score;
    };

    useEffect(() => {
        const score = calculateStrength(password);
        setStrength(score);

        switch (score) {
            case 0:
                setStrengthLabel("");
                setStrengthColor("bg-gray-200");
                break;
            case 1:
                setStrengthLabel("Very Weak");
                setStrengthColor("bg-red-500");
                break;
            case 2:
                setStrengthLabel("Weak");
                setStrengthColor("bg-orange-500");
                break;
            case 3:
                setStrengthLabel("Fair");
                setStrengthColor("bg-yellow-500");
                break;
            case 4:
                setStrengthLabel("Good");
                setStrengthColor("bg-blue-500");
                break;
            case 5:
                setStrengthLabel("Strong");
                setStrengthColor("bg-green-500");
                break;
            default:
                setStrengthLabel("");
                setStrengthColor("bg-gray-200");
        }
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (strength < 3) {
            setError("Please choose a stronger password (at least 8 characters with numbers and letters)");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json() as { message?: string };
                throw new Error(data.message || "Something went wrong");
            }

            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 dark:bg-background-dark px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-surface-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-light dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-3 px-3 text-text-light dark:text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Full name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-3 px-3 text-text-light dark:text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-3 px-3 text-text-light dark:text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Password"
                            />

                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="space-y-1">
                                    <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-full flex-1 transition-all duration-300 ${strength >= level ? strengthColor : "bg-transparent"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-xs font-bold transition-colors duration-300`} style={{ color: strengthColor.replace('bg-', '') }}>
                                            Strength: {strengthLabel}
                                        </p>
                                        <p className="text-[10px] text-gray-500">Min. 8 chars + numbers</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-primary py-3 px-3 text-sm font-bold text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Creating account...
                                </span>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
