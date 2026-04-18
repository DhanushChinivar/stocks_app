import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthNav from "./AuthNav";
import ImageCarousel from "./ImageCarousel";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const tickerItems = [
    { symbol: "AAPL",  name: "Apple",      price: "$233.16",  change: "+1.54%", up: true  },
    { symbol: "MSFT",  name: "Microsoft",  price: "$520.42",  change: "-0.24%", up: false },
    { symbol: "GOOGL", name: "Alphabet",   price: "$201.56",  change: "+2.65%", up: true  },
    { symbol: "NVDA",  name: "NVIDIA",     price: "$875.39",  change: "+3.21%", up: true  },
    { symbol: "TSLA",  name: "Tesla",      price: "$339.62",  change: "+1.72%", up: true  },
    { symbol: "META",  name: "Meta",       price: "$762.96",  change: "-2.54%", up: false },
    { symbol: "AMZN",  name: "Amazon",     price: "$244.16",  change: "-1.53%", up: false },
    { symbol: "NFLX",  name: "Netflix",    price: "$1220.48", change: "+0.89%", up: true  },
    { symbol: "AMD",   name: "AMD",        price: "$108.32",  change: "+4.12%", up: true  },
    { symbol: "CRM",   name: "Salesforce", price: "$298.74",  change: "-0.67%", up: false },
];

const stats = [
    { value: "500+",  label: "Stocks"     },
    { value: "Live",  label: "Data"       },
    { value: "AI",    label: "Insights"   },
    { value: "24/7",  label: "Monitoring" },
];

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) redirect("/");

    return (
        <main className="min-h-screen bg-[#080808] flex flex-col overflow-hidden">

            {/* ── Top nav ── */}
            <nav className="relative z-20 flex items-center justify-between px-8 xl:px-14 py-5">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Rallify" width={120} height={30} className="h-7 w-auto" />
                </Link>
                <AuthNav />
            </nav>

            {/* ── Ticker strip ── */}
            <div className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-3">
                <div className="flex gap-0 ticker-track">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 px-5 border-r border-white/[0.07] flex-shrink-0">
                            <span className="text-xs font-bold text-white">{item.symbol}</span>
                            <span className="text-xs text-gray-500">{item.name}</span>
                            <span className="text-xs font-medium text-white">{item.price}</span>
                            <span className={`text-xs font-semibold flex items-center gap-0.5 ${item.up ? "text-green-400" : "text-red-400"}`}>
                                {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Body ── */}
            <div className="relative flex-1 flex items-stretch gap-0 px-8 xl:px-14 pb-8 overflow-hidden">

                {/* Ambient glows */}
                <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[130px]" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-green-500/6 blur-[110px]" />

                {/* Dot grid */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />

                {/* ── Left – hero + carousel ── */}
                <div className="relative z-10 flex flex-col w-full lg:w-[55%] xl:w-[58%] pr-0 lg:pr-10 xl:pr-14">

                    {/* Hero text */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/25 rounded-full px-4 py-1.5 mb-5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-yellow-400 text-sm font-medium">Live market data</span>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
                            Invest smarter,<br />
                            <span className="text-yellow-400">trade with confidence</span>
                        </h1>
                        <p className="text-gray-400 text-base max-w-md leading-relaxed">
                            Real-time tracking, AI-powered insights, and smart alerts — everything you need to stay ahead.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-8 mb-6">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-lg font-bold text-white">{value}</p>
                                <p className="text-xs text-gray-500">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Image carousel */}
                    <div className="flex-1 min-h-0">
                        <ImageCarousel />
                    </div>
                </div>

                {/* ── Right – form card ── */}
                <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] items-center justify-center relative z-10 pl-4">
                    <div className="w-full max-w-[400px] bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                        {children}
                    </div>
                </div>

                {/* Mobile form (no card) */}
                <div className="lg:hidden w-full relative z-10 mt-6">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;
