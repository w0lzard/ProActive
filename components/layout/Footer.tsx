import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center mb-6">
                            <Image
                                src="/logo.png"
                                alt="ProActive Physiotherapy & Rehabilitation Centre"
                                width={180}
                                height={45}
                                className="h-11 w-auto"
                            />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Empowering you to move better, feel better, and live better through expert physiotherapy care.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.488 2h-.173zM12.315 4.839h-.117c-2.516 0-2.824.01-3.71.05-.884.041-1.363.19-1.683.315-.425.163-.728.358-1.047.677-.319.319-.514.622-.677 1.047-.125.32-.274.799-.315 1.683-.04.886-.05 1.194-.05 3.71v.117c0 2.516.01 2.824.05 3.71.041.884.19 1.363.315 1.683.163.425.358.728.677 1.047.319.319.622.514 1.047.677.32.125.799.274 1.683.315.886.04 1.194.05 3.71.05h.117c2.516 0 2.824-.01 3.71-.05.884-.041 1.363-.19 1.683-.315.425-.163.728-.358 1.047-.677.319-.319.514-.622.677-1.047.125-.32.274-.799.315-1.683.04-.886.05-1.194.05-3.71v-.117c0-2.516-.01-2.824-.05-3.71-.041-.884-.19-1.363-.315-1.683-.163-.425-.358-.728-.677-1.047-.319-.319-.622-.514-1.047-.677-.32-.125-.799-.274-1.683-.315-.886-.04-1.194-.05-3.71-.05zm0 2.7a5.454 5.454 0 110 10.908 5.454 5.454 0 010-10.908zM17.47 5.89a1.44 1.44 0 110 2.879 1.44 1.44 0 010-2.88z" fillRule="evenodd"></path></svg>
                            </Link>
                        </div>
                    </div>
                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-light dark:text-white uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="/">Home</Link></li>
                            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="/services">Services</Link></li>
                            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="/faq">FAQ</Link></li>
                            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-light dark:text-white uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-lg text-primary mt-0.5">location_on</span>
                                <span>Shop no-26, Ground Floor,<br />City square complex, Square, Sai Rd,<br />opposite to Petrol Pump, Baddi,<br />Himachal Pradesh 173205</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-primary">call</span>
                                <span>+917518840048</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-primary">mail</span>
                                <span>proactive@drpronitasinghphysio.com</span>
                            </li>
                        </ul>
                    </div>
                    {/* Map / Location */}
                    <div className="rounded-lg overflow-hidden h-48 bg-gray-200">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/location-map.png')" }}>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 text-center md:text-left">© 2023 ProActive Physiotherapy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">Privacy Policy</Link>
                        <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
