"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookAppointmentPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedService, setSelectedService] = useState("Physiotherapy");
    const [selectedTherapist, setSelectedTherapist] = useState("Dr. Pronita Singh");
    const [selectedTime, setSelectedTime] = useState("10:00 AM");
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    });

    // Form loading/error
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleBooking = async () => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/book-appointment");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service: selectedService,
                    therapist: selectedTherapist,
                    date: selectedDate,
                    time: selectedTime
                })
            });

            if (!res.ok) throw new Error("Failed to book appointment");

            router.push("/my-bookings");
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };




    // Therapist Image Logic
    const getTherapistImage = (name: string) => {
        if (name === "Dr. Pronita Singh") return "/dr-sarah-jenkins.jpg";
        return "";
    };

    return (
        <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
            {/* Page Heading */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-text-light dark:text-white">Book Your Recovery Session</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Select a service, choose your therapist, and pick a time that works for you.</p>
            </div>

            {/* Progress Stepper */}
            <div className="mb-10 overflow-x-auto">
                <div className="flex min-w-max items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
                        <span>Service</span>
                    </div>
                    <div className="h-px w-8 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">2</span>
                        <span>Therapist</span>
                    </div>
                    <div className="h-px w-8 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">3</span>
                        <span>Time</span>
                    </div>
                    <div className="h-px w-8 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">4</span>
                        <span>Details</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-10">
                    {/* Step 1: Services */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text-light dark:text-white">
                            <span className="material-symbols-outlined text-primary">spa</span>
                            1. Select a Service
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div
                                onClick={() => setSelectedService("Physiotherapy")}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all ${selectedService === "Physiotherapy" ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-primary/50"}`}
                            >
                                {selectedService === "Physiotherapy" && (
                                    <div className="absolute right-3 top-3 text-primary">
                                        <span className="material-symbols-outlined filled">check_circle</span>
                                    </div>
                                )}
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${selectedService === "Physiotherapy" ? "bg-primary/20 text-primary-dark" : "bg-background-light dark:bg-background-dark text-gray-500"}`}>
                                    <span className="material-symbols-outlined text-2xl">self_improvement</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-text-light dark:text-white">Physiotherapy</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Initial assessment and treatment plan.</p>
                            </div>

                            {/* Card 2 */}
                            <div
                                onClick={() => setSelectedService("Manual Therapy")}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all ${selectedService === "Manual Therapy" ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-primary/50"}`}
                            >
                                {selectedService === "Manual Therapy" && (
                                    <div className="absolute right-3 top-3 text-primary">
                                        <span className="material-symbols-outlined filled">check_circle</span>
                                    </div>
                                )}
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${selectedService === "Manual Therapy" ? "bg-primary/20 text-primary-dark" : "bg-background-light dark:bg-background-dark text-gray-500"}`}>
                                    <span className="material-symbols-outlined text-2xl">massage</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-text-light dark:text-white">Manual Therapy</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Deep tissue release and relaxation.</p>
                            </div>

                            {/* Card 3 */}
                            <div
                                onClick={() => setSelectedService("Acupuncture")}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all ${selectedService === "Acupuncture" ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-primary/50"}`}
                            >
                                {selectedService === "Acupuncture" && (
                                    <div className="absolute right-3 top-3 text-primary">
                                        <span className="material-symbols-outlined filled">check_circle</span>
                                    </div>
                                )}
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${selectedService === "Acupuncture" ? "bg-primary/20 text-primary-dark" : "bg-background-light dark:bg-background-dark text-gray-500"}`}>
                                    <span className="material-symbols-outlined text-2xl">acupuncture</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-text-light dark:text-white">Acupuncture</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Targeted pain relief therapy.</p>
                            </div>
                        </div>
                    </section>

                    {/* Step 2: Therapist */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text-light dark:text-white">
                            <span className="material-symbols-outlined text-primary">clinical_notes</span>
                            2. Choose Professional
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`relative flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all border-primary bg-primary/5`}>
                                <input
                                    className="peer sr-only"
                                    name="therapist"
                                    type="radio"
                                    checked={true}
                                    readOnly
                                />
                                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                    <Image fill style={{ objectFit: "cover" }} src="/dr-sarah-jenkins.jpg" alt="Dr. Pronita Singh" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-light dark:text-white">Dr. Pronita Singh</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Senior Physiotherapist</p>
                                </div>
                                <div className="ml-auto text-primary">
                                    <span className="material-symbols-outlined">radio_button_checked</span>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Step 3: Date & Time */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text-light dark:text-white">
                            <span className="material-symbols-outlined text-primary">calendar_month</span>
                            3. Date & Time
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-6 shadow-sm">
                            {/* Calendar (Static for visual) */}
                            <div className="w-full md:w-1/2">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-text-light dark:text-white">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                                    <div className="flex gap-2 text-text-light dark:text-white">
                                        <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Calendar Grid (Simplified) */}
                                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2 text-gray-500">
                                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm text-text-light dark:text-white">
                                    <span className="py-2 text-gray-300">29</span><span className="py-2 text-gray-300">30</span>
                                    {[...Array(31)].map((_, i) => (
                                        <button key={i} className={`rounded-full py-2 hover:bg-background-light dark:hover:bg-background-dark ${i + 1 === 24 ? "bg-primary text-white font-bold shadow-md" : ""}`}>
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-6">
                                <h3 className="text-lg font-bold mb-4 text-text-light dark:text-white">Available Slots</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "01:30 PM"].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`rounded-lg py-2 px-3 text-sm font-medium transition-all ${selectedTime === time ? "bg-primary text-white font-bold shadow-md" : "border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary text-text-light dark:text-white"}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                    <button className="rounded-lg border border-gray-200 dark:border-gray-700 py-2 px-3 text-sm font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed">11:00 AM</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Step 4: Your Details */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text-light dark:text-white">
                            <span className="material-symbols-outlined text-primary">person</span>
                            4. Your Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-6 shadow-sm">
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-text-light dark:text-white">First Name</label>
                                <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 text-sm focus:border-primary focus:ring-primary dark:text-white" placeholder="e.g. John" type="text" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-text-light dark:text-white">Last Name</label>
                                <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 text-sm focus:border-primary focus:ring-primary dark:text-white" placeholder="e.g. Doe" type="text" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-text-light dark:text-white">Email Address</label>
                                <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 text-sm focus:border-primary focus:ring-primary dark:text-white" placeholder="john@example.com" type="email" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-text-light dark:text-white">Phone Number</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 text-sm focus:border-primary focus:ring-primary dark:text-white"
                                    placeholder="9876543210"
                                    type="tel"
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    title="Please enter a 10-digit phone number"
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        target.value = target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                    }}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold mb-2 text-text-light dark:text-white">Reason for Visit (Optional)</label>
                                <textarea className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 text-sm focus:border-primary focus:ring-primary dark:text-white" placeholder="Briefly describe your symptoms..." rows={3}></textarea>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Summary */}
                <div className="lg:col-span-4 relative h-full">
                    <div className="sticky top-24 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-6 text-text-light dark:text-white">Appointment Summary</h3>
                        <div className="space-y-6">
                            {/* Service */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined">self_improvement</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</p>
                                    <p className="font-bold text-text-light dark:text-white">{selectedService}</p>
                                </div>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            {/* Therapist */}
                            <div className="flex gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                                    {getTherapistImage(selectedTherapist) ? (
                                        <Image fill style={{ objectFit: "cover" }} src={getTherapistImage(selectedTherapist)} alt="Therapist" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-background-light dark:bg-background-dark text-gray-500">
                                            <span className="material-symbols-outlined">group</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Therapist</p>
                                    <p className="font-bold text-text-light dark:text-white">{selectedTherapist}</p>
                                </div>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            {/* Date */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark text-gray-500 border border-gray-200 dark:border-gray-700">
                                    <span className="material-symbols-outlined">event</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</p>
                                    <p className="font-bold text-text-light dark:text-white">{selectedDate}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedTime}</p>
                                </div>
                            </div>



                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                                    {error}
                                </div>
                            )}
                            <button
                                onClick={handleBooking}
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Confirming..." : "Confirm Booking"}
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                <span>Secure booking. No payment until visit.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
