import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-background-light dark:bg-background-dark">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-dark dark:text-primary mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            Accepting New Patients
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-text-light dark:text-white sm:text-6xl mb-6 leading-tight">
                            Get Back to Moving <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Your Best.</span>
                        </h1>
                        <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8">
                            Expert physiotherapy care tailored to your recovery goals. Whether it's sports injury, post-op recovery, or chronic pain, we build the path to your wellness.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/book-appointment">
                                <button className="bg-primary text-white hover:bg-primary-dark rounded-lg px-6 py-3 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                    Book Your Assessment
                                </button>
                            </Link>
                            <Link href="/services">
                                <button className="group flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark px-6 py-3 text-base font-semibold text-text-light dark:text-white transition-all hover:border-primary/50">
                                    View Our Services
                                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </button>
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex -space-x-2">
                                <Image width={32} height={32} alt="Patient portrait" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj_XJsGz2wMrOc1vMVu3rmHfa-TNx3BqEkiuwOfnoNbMk_-Qn-QM3mVdvhSIq3CBC1uwN36iDFqiEGsVE_weI4ka2iAGYzSt4Ubs12_OnbD55fDcREylcDdgbVptNUgfkK98nmitGfgtBElkATdFlwltmtSOWdEFbFZ6igsoIgIncF9u5HJqIudLasQGuyn48J1rTZoMKf6v__ty8PXUWvbFEUdYs1tiyiLu9w9svzZxLH2B1bKKBseecDiIIJAVoj1Wl7wbXxwi1b" />
                                <Image width={32} height={32} alt="Patient portrait" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcU5tm_SMrWxk24nCLkDofHVy1U9Yrz7BIVsKFC_-XfZNOaSkewsKO_8gkT5W4FofZuHiUZQSAudv4ulxi5CGRWnVLmLEUn2Vyuc0kaw4TwIqk3Bfc9jtcHCP1eP_SEkUmeTPHJ4rdVUIVNLO7jOUgVjuvTvqdjRSFn_adrqfMnJ-JR9qaM-tdC6dhXku1hmLIaqEMGp7qMLNKb6WHGZeYoy5EorxNNZaT-b2Y7LIrRLXxIUmnToJzOT30pLbR36jCkGo0lhwMsDug" />
                                <Image width={32} height={32} alt="Patient portrait" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8m-DhoFukegZStXLxQeglcFLArTfbv9DKXnyfjQ6xcMluJ8F4rk8vNV8qwXp7f0obTHuItGEUhp1Ytw4z8ujwzv_BRPH3fLjPXDsfZkphXwyDUAOCcKwYy8mJtCuEpzSUFTtN1RQdrNgv7fSFS2XAjwzzrRD1G04syRayYydRz7QhozXILroLlInOTesGOsJ0vPxTxyKoZEHk5ZYOUWPmqnXLspP_ZKhAIHddNZrSuTXGk-Yvbw_ZQJvJBaqL6yUlSoXp4Hq-qBP7" />
                            </div>
                            <p>Trusted by 500+ patients this month</p>
                        </div>
                    </div>
                    <div className="relative lg:h-full min-h-[300px] lg:w-[85%] mx-auto">
                        <div className="absolute -right-20 -top-20 -z-10 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl dark:bg-primary/10"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 aspect-[4/3] lg:aspect-square">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANpCSkVIu4Sl7AD7tvuDoA1CP5Kx7gAtRlTJnWnTrAgtLCtOQ_WEV3MqG0W5WybpwBI5D7geS4JcDknOFC7r2YZhSxMnfEbNEFkoGQwrrQfoemGo8PgfFvBWByYv6fFpUss_feU9ObY8jL7SGt1ThxAr6H6lqK5tBAxQLAcZVEj7JM8LRHSNB-Sey1aQ6z5qFFoS0Of-X11DwcWnn2SZLyOrKSdjJXFnujbe5hz5b7j5YUXWmXKNFRwevRWyfFUlpky0toNRrKPSe-')" }}></div>
                            <div className="absolute bottom-6 left-6 right-6 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary-dark dark:text-primary">
                                        <span className="material-symbols-outlined">star</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-light dark:text-white">Top Rated Clinic</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Voted #1 in City Wellness Awards</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
