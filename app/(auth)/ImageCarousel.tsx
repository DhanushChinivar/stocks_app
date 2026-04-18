'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, Bell, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

const watchlistStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.',  price: '$233.16', change: '+1.54%', up: true  },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$875.39', change: '+3.21%', up: true  },
    { symbol: 'TSLA', name: 'Tesla Inc.',  price: '$339.62', change: '+1.72%', up: true  },
    { symbol: 'META', name: 'Meta Platforms', price: '$762.96', change: '-2.54%', up: false },
];

const alertItems = [
    { symbol: 'AAPL', label: 'Price above $240',  type: 'upper', active: false },
    { symbol: 'NVDA', label: 'Price above $900',  type: 'upper', active: true  },
    { symbol: 'TSLA', label: 'Price below $320',  type: 'lower', active: false },
    { symbol: 'MSFT', label: 'Price above $530',  type: 'upper', active: true  },
];

const slides = [
    { id: 'dashboard',  label: 'Live Dashboard'   },
    { id: 'watchlist',  label: 'Watchlist'         },
    { id: 'alerts',     label: 'Smart Alerts'      },
    { id: 'overview',   label: 'Market Overview'   },
];

export default function ImageCarousel() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % slides.length), 4000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col">

            {/* Slides */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.08]">

                {/* Slide 0 – Dashboard screenshot */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${active === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                        src="/assets/images/dashboard-preview.png"
                        alt="Dashboard"
                        fill
                        className="object-cover object-top rounded-2xl"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent rounded-2xl" />
                </div>

                {/* Slide 1 – Watchlist mockup */}
                <div className={`absolute inset-0 transition-opacity duration-700 bg-[#0f0f0f] p-6 ${active === 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">Your Watchlist</span>
                        <span className="ml-auto text-xs text-gray-500">{watchlistStocks.length} stocks</span>
                    </div>
                    <div className="space-y-3">
                        {watchlistStocks.map((s) => (
                            <div key={s.symbol} className="flex items-center gap-4 bg-white/[0.04] hover:bg-white/[0.07] transition-colors rounded-xl px-4 py-3 border border-white/[0.06]">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-yellow-400">{s.symbol[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white">{s.symbol}</p>
                                    <p className="text-xs text-gray-500 truncate">{s.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{s.price}</p>
                                    <p className={`text-xs font-medium flex items-center justify-end gap-0.5 ${s.up ? 'text-green-400' : 'text-red-400'}`}>
                                        {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {s.change}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <p className="text-xs text-green-400">Your portfolio is up <span className="font-bold">+2.1%</span> today</p>
                    </div>
                </div>

                {/* Slide 2 – Alerts mockup */}
                <div className={`absolute inset-0 transition-opacity duration-700 bg-[#0f0f0f] p-6 ${active === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-5">
                        <Bell className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">Price Alerts</span>
                        <span className="ml-auto text-xs bg-yellow-500/15 text-yellow-400 rounded-full px-2 py-0.5">2 active</span>
                    </div>
                    <div className="space-y-3">
                        {alertItems.map((a, i) => (
                            <div key={i} className={`flex items-center gap-4 rounded-xl px-4 py-3 border transition-colors ${a.active ? 'bg-yellow-500/8 border-yellow-500/20' : 'bg-white/[0.03] border-white/[0.06]'}`}>
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.active ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">{a.symbol}</p>
                                    <p className="text-xs text-gray-500">{a.label}</p>
                                </div>
                                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.type === 'upper' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                                    {a.type === 'upper' ? '↑ Upper' : '↓ Lower'}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <p className="text-xs text-gray-400">Monitoring prices in real-time 24/7</p>
                    </div>
                </div>

                {/* Slide 3 – Market overview screenshot */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${active === 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                        src="/assets/images/dashboard.png"
                        alt="Market Overview"
                        fill
                        className="object-cover object-top rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent rounded-2xl" />
                </div>

                {/* Slide label */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs text-gray-300 font-medium">{slides[active].label}</span>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`transition-all duration-300 rounded-full ${i === active ? 'w-6 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
