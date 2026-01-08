import WatchlistList from "./WatchlistList";
import { getWatchlistItemsForUser } from "@/lib/actions/watchlist.actions";

const WatchlistPage = async () => {
    const items = await getWatchlistItemsForUser();

    return (
        <section className="space-y-6">
            <h1 className="watchlist-title">Your Watchlist</h1>
            <WatchlistList initialItems={items} />
        </section>
    );
};

export default WatchlistPage;
