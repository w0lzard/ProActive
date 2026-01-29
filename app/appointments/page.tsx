"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guestBookingSchema, type GuestBookingFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function AppointmentsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GuestBookingFormData>({
        resolver: zodResolver(guestBookingSchema),
    });

    const onSubmit = async (data: GuestBookingFormData) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to book appointment");

            setSubmitStatus("success");
            reset();
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark min-h-screen">
            <section className="bg-primary py-12 px-6">
                <div className="max-w-[1280px] mx-auto text-center text-white">
                    <span className="material-symbols-outlined text-5xl mb-4">calendar_clock</span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Book Your Appointment</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Take the first step towards recovery. Schedule your assessment or treatment session online.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 lg:px-20 max-w-[800px] mx-auto">
                <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                error={errors.name?.message}
                                {...register("name")}
                            />
                            <Input
                                label="Email Address"
                                placeholder="john@example.com"
                                type="email"
                                error={errors.email?.message}
                                {...register("email")}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Phone Number"
                                placeholder="(555) 123-4567"
                                error={errors.phone?.message}
                                {...register("phone")}
                            />
                            <Input
                                label="Preferred Date"
                                type="date"
                                error={errors.date?.message}
                                {...register("date")}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Required</label>
                            <select
                                className={`w-full rounded-md border h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-dark dark:border-gray-700 dark:text-white ${errors.service ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                                {...register("service")}
                            >
                                <option value="">Select a service...</option>
                                <option value="Initial Assessment">Initial Assessment</option>
                                <option value="Manual Therapy">Manual Therapy</option>
                                <option value="Sports Rehab">Sports Rehabilitation</option>
                                <option value="Post-Op Care">Post-Op Care</option>
                                <option value="Massage Therapy">Massage Therapy</option>
                            </select>
                            {errors.service && <span className="text-sm text-red-500">{errors.service.message}</span>}
                        </div>

                        <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>

                        {submitStatus === "success" && (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium text-center border border-green-100">
                                <p className="font-bold text-lg mb-1">Booking Request Received!</p>
                                <p>We'll confirm your appointment time via email shortly.</p>
                            </div>
                        )}
                        {submitStatus === "error" && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium text-center border border-red-100">
                                Something went wrong. Please check your details and try again.
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </main>
    );
}
