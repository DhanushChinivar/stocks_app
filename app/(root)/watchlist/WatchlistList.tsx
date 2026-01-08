"use client";

import Link from "next/link";
import { useState } from "react";
import WatchlistButton from "@/components/WatchlistButton";

const formatDate = (value: Date | string) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const WatchlistList = ({ initialItems }: { initialItems: StockWithData[] }) => {
    const [items, setItems] = useState<StockWithData[]>(initialItems);

    const handleWatchlistChange = (symbol: string, isAdded: boolean) => {
        if (isAdded) return;
        setItems((prev) => prev.filter((item) => item.symbol !== symbol));
    };

    if (items.length === 0) {
        return (
            <div className="watchlist-empty-container">
                <div className="watchlist-empty">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="watchlist-star"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                        />
                    </svg>
                    <h2 className="empty-title">Your watchlist is empty</h2>
                    <p className="empty-description">
                        Add stocks from the dashboard or search to start tracking them here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="watchlist-table">
            <table className="w-full">
                <thead className="table-header-row">
                    <tr>
                        <th className="table-header py-3 text-left">Symbol</th>
                        <th className="table-header py-3 text-left">Company</th>
                        <th className="table-header py-3 text-left">Added</th>
                        <th className="table-header py-3 text-right pr-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={`${item.userId}-${item.symbol}`} className="table-row">
                            <td className="table-cell py-4 pl-4">
                                <Link href={`/stocks/${item.symbol}`} className="hover:text-yellow-500">
                                    {item.symbol}
                                </Link>
                            </td>
                            <td className="table-cell py-4">{item.company}</td>
                            <td className="table-cell py-4">{formatDate(item.addedAt)}</td>
                            <td className="table-cell py-4 pr-4">
                                <div className="w-48 ml-auto">
                                    <WatchlistButton
                                        symbol={item.symbol}
                                        company={item.company}
                                        isInWatchlist={true}
                                        showTrashIcon
                                        onWatchlistChange={handleWatchlistChange}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WatchlistList;
