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
                            width={600}
                            height={150}
                            className="h-36 w-auto"
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

                        {/* MOBILE MENU TOGGLE */}
                        <button
                            className="md:hidden p-2 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div
                className={`fixed inset-0 z-50 md:hidden bg-surface-light/98 dark:bg-surface-dark/98 backdrop-blur-md transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={120}
                                height={30}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <button
                            className="p-2 text-text-light dark:text-text-dark"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                    </div>

                    {/* Mobile Nav Links */}
                    <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Services', href: '/services' },
                            { name: 'About', href: '/about' },
                            { name: 'Contact', href: '/contact' },
                            ...(session ? [{ name: 'My Bookings', href: '/my-bookings' }] : []),
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-2xl font-bold text-text-light dark:text-white hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Footer Area */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                        {session ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {session.user?.name?.[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-light dark:text-white">{session.user?.name}</p>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                signOut({ callbackUrl: "/" });
                                            }}
                                            className="text-xs text-red-500 font-medium"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                                <Link href="/book-appointment" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full py-6 text-lg">Book Now</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-3 text-sm font-bold text-primary border border-primary rounded-lg">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/book-appointment" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full py-3 text-sm">Book Now</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
