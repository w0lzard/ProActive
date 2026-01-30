"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    return (
        <main className="flex-grow flex flex-col">
            {/* Hero */}
            <section className="bg-background-dark py-12 lg:py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6">Contact Us</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Have a question or need to schedule a visit? Reach out to our team. We're here to help you get moving again.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <h2 className="text-2xl font-bold text-text-light dark:text-white mb-6">Get in Touch</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-light dark:text-white mb-1">Our Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Showroom no-26, Ground Floor,<br />City square complex, Sai Rd,<br />opposite to Petrol Pump, Baddi,<br />Himachal Pradesh 173205</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-light dark:text-white mb-1">Phone Number</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+917518840048</p>
                                        <p className="text-xs text-gray-500 mt-1">Mon-Fri 8am-8pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-light dark:text-white mb-1">Email Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">proactive@drpronitasinghphysio.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error();

            setStatus("success");
            setFormData({ firstName: "", lastName: "", email: "", subject: "General Inquiry", message: "" });
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">We'll get back to you shortly.</p>
                <button onClick={() => setStatus("idle")} className="text-primary font-bold hover:underline">Send another message</button>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-bold text-text-light dark:text-white">First Name</label>
                    <input
                        required
                        type="text"
                        id="first-name"
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark py-3 px-4 text-sm focus:border-primary focus:ring-primary"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-bold text-text-light dark:text-white">Last Name</label>
                    <input
                        required
                        type="text"
                        id="last-name"
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark py-3 px-4 text-sm focus:border-primary focus:ring-primary"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-text-light dark:text-white">Email</label>
                <input
                    required
                    type="email"
                    id="email"
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark py-3 px-4 text-sm focus:border-primary focus:ring-primary"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-text-light dark:text-white">Subject</label>
                <select
                    id="subject"
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark py-3 px-4 text-sm focus:border-primary focus:ring-primary"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                >
                    <option>General Inquiry</option>
                    <option>Appointment Question</option>
                    <option>Billing Issue</option>
                    <option>Feedback</option>
                </select>
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-text-light dark:text-white">Message</label>
                <textarea
                    required
                    id="message"
                    rows={4}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark py-3 px-4 text-sm focus:border-primary focus:ring-primary"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>
            {status === "error" && <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>}
            <button
                disabled={status === "submitting"}
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
                {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
