import { formatTimeAgo } from "@/lib/utils";

const WatchlistNews = ({ news }: WatchlistNewsProps) => {
    if (!news || news.length === 0) {
        return (
            <div className="text-gray-500">
                No watchlist news yet. Add more stocks to personalize this feed.
            </div>
        );
    }

    return (
        <div className="watchlist-news">
            {news.map((item) => (
                <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="news-item"
                >
                    <span className="news-tag">{item.category || "Market"}</span>
                    <h3 className="news-title">{item.headline}</h3>
                    <div className="news-meta">
                        {item.source} • {formatTimeAgo(item.datetime)}
                    </div>
                    <p className="news-summary">{item.summary}</p>
                    <span className="news-cta">Read more</span>
                </a>
            ))}
        </div>
    );
};

export default WatchlistNews;
