import WatchlistList from "./WatchlistList";
import WatchlistNews from "./WatchlistNews";
import AlertsPanel from "./AlertsPanel";
import { getWatchlistItemsForUser } from "@/lib/actions/watchlist.actions";
import { getNews, getQuotesForSymbols } from "@/lib/actions/finnhub.actions";
import { getAlertsForUser } from "@/lib/actions/alert.actions";
import { formatChangePercent, formatPrice } from "@/lib/utils";

const WatchlistPage = async () => {
    const items = await getWatchlistItemsForUser();
    const alerts = await getAlertsForUser();
    const symbols = Array.from(
        new Set([...items.map((item) => item.symbol), ...alerts.map((alert) => alert.symbol)])
    );
    const quotes = await getQuotesForSymbols(symbols);
    let news: MarketNewsArticle[] = [];
    try {
        news = await getNews(items.map((item) => item.symbol));
    } catch {
        news = [];
    }
    const enriched = items.map((item) => {
        const quote = quotes[item.symbol];
        const currentPrice = quote?.c;
        const changePercent = quote?.dp;

        return {
            ...item,
            currentPrice,
            changePercent,
            priceFormatted: typeof currentPrice === "number" ? formatPrice(currentPrice) : "—",
            changeFormatted: typeof changePercent === "number" ? formatChangePercent(changePercent) : "—",
        };
    });
    const enrichedAlerts = alerts.map((alert) => {
        const quote = quotes[alert.symbol];
        return {
            ...alert,
            currentPrice: quote?.c,
            changePercent: quote?.dp,
        };
    });

    return (
        <section className="space-y-6">
            <h1 className="watchlist-title">Your Watchlist</h1>
            <div className="watchlist-container">
                <div className="watchlist space-y-8">
                    <WatchlistList initialItems={enriched} />
                    <div className="space-y-4">
                        <h2 className="watchlist-title">Watchlist News</h2>
                        <WatchlistNews news={news} />
                    </div>
                </div>
                <AlertsPanel
                    initialAlerts={enrichedAlerts}
                    watchlistOptions={items.map((item) => ({ symbol: item.symbol, company: item.company }))}
                    quotesBySymbol={quotes}
                />
            </div>
        </section>
    );
};

export default WatchlistPage;
