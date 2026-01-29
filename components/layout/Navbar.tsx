"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                    {/* LOGO – LEFT */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="ProActive Physiotherapy & Rehabilitation Centre"
                            width={300}
                            height={75}
                            className="h-[72px] w-auto"
                            priority
                        />
                    </Link>

                    {/* RIGHT SIDE – PUSHED USING ml-auto */}
                    <div className="ml-auto flex items-center gap-6">
                        {/* NAV LINKS – NOW NEXT TO LOGIN */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/" className="text-sm font-medium text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="/services" className="text-sm font-medium text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-primary transition-colors">
                                Services
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-primary transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-primary transition-colors">
                                Contact
                            </Link>
                            {session && (
                                <Link href="/my-bookings" className="text-sm font-medium text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-primary transition-colors">
                                    My Bookings
                                </Link>
                            )}
                        </nav>

                        {/* LOGIN + CTA */}
                        {session ? (
                            <div className="hidden md:flex items-center gap-4">
                                <span className="text-sm font-medium text-text-light dark:text-white">
                                    Hi, {session.user?.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                                >
                                    Sign Out
                                </button>
                                <Link href="/book-appointment">
                                    <Button>Book Now</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <Link href="/login" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                                    Login
                                </Link>
                                <Link href="/book-appointment">
                                    <Button>Book Appointment</Button>
                                </Link>
                            </div>
                        )}

                        {/* MOBILE MENU */}
                        <button
                            className="md:hidden p-2 text-text-light dark:text-text-dark"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <Link href="/" className="block py-2 text-base font-medium hover:text-primary">Home</Link>
                        <Link href="/services" className="block py-2 text-base font-medium hover:text-primary">Services</Link>
                        <Link href="/about" className="block py-2 text-base font-medium hover:text-primary">About</Link>
                        <Link href="/contact" className="block py-2 text-base font-medium hover:text-primary">Contact</Link>

                        {session ? (
                            <>
                                <Link href="/my-bookings" className="block py-2 text-base font-medium hover:text-primary">
                                    My Bookings
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="block w-full text-left py-2 text-base font-medium text-red-500 hover:text-red-600"
                                >
                                    Sign Out
                                </button>
                                <div className="pt-2">
                                    <Link href="/book-appointment" className="block w-full">
                                        <Button className="w-full">Book Now</Button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block py-2 text-base font-medium text-primary">
                                    Login
                                </Link>
                                <div className="pt-2">
                                    <Link href="/book-appointment" className="block w-full">
                                        <Button className="w-full">Book Appointment</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
