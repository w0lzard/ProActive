import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(1, { message: "Message is required" }),
});

// Schema for authenticated user bookings (used by /book-appointment page and API)
export const appointmentSchema = z.object({
    service: z.string().min(1, { message: "Please select a service" }),
    therapist: z.string().min(1, { message: "Please select a therapist" }),
    date: z.string().min(1, { message: "Please select a date" }),
    time: z.string().min(1, { message: "Please select a time" }),
});

// Schema for guest booking requests (used by /appointments page)
export const guestBookingSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    date: z.string().min(1, { message: "Please select a date" }),
    service: z.string().min(1, { message: "Please select a service" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type GuestBookingFormData = z.infer<typeof guestBookingSchema>;
