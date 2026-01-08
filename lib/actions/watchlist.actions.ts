'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

const getSessionUser = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return null;

    return {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || '',
    };
};

const normalizeSymbol = (symbol: string) => symbol.trim().toUpperCase();

export async function addToWatchlist({ symbol, company }: { symbol: string; company: string }) {
    try {
        const user = await getSessionUser();
        if (!user) return { success: false, error: 'Not authenticated' };

        const cleanSymbol = normalizeSymbol(symbol);
        const cleanCompany = company?.trim() || cleanSymbol;

        await connectToDatabase();
        await Watchlist.updateOne(
            { userId: user.id, symbol: cleanSymbol },
            {
                $setOnInsert: {
                    userId: user.id,
                    symbol: cleanSymbol,
                    company: cleanCompany,
                    addedAt: new Date(),
                },
            },
            { upsert: true }
        );

        return { success: true };
    } catch (err) {
        console.error('addToWatchlist error:', err);
        return { success: false, error: 'Failed to add to watchlist' };
    }
}

export async function removeFromWatchlist(symbol: string) {
    try {
        const user = await getSessionUser();
        if (!user) return { success: false, error: 'Not authenticated' };

        const cleanSymbol = normalizeSymbol(symbol);

        await connectToDatabase();
        await Watchlist.deleteOne({ userId: user.id, symbol: cleanSymbol });

        return { success: true };
    } catch (err) {
        console.error('removeFromWatchlist error:', err);
        return { success: false, error: 'Failed to remove from watchlist' };
    }
}

export async function isInWatchlist(symbol: string): Promise<boolean> {
    try {
        const user = await getSessionUser();
        if (!user) return false;

        const cleanSymbol = normalizeSymbol(symbol);

        await connectToDatabase();
        const count = await Watchlist.countDocuments({ userId: user.id, symbol: cleanSymbol });
        return count > 0;
    } catch (err) {
        console.error('isInWatchlist error:', err);
        return false;
    }
}

export async function getWatchlistItemsForUser(): Promise<StockWithData[]> {
    try {
        const user = await getSessionUser();
        if (!user) return [];

        await connectToDatabase();
        const items = await Watchlist.find({ userId: user.id })
            .sort({ addedAt: -1 })
            .lean();

        return items.map((item) => ({
            userId: String(item.userId),
            symbol: String(item.symbol),
            company: String(item.company),
            addedAt: item.addedAt ? new Date(item.addedAt) : new Date(),
        }));
    } catch (err) {
        console.error('getWatchlistItemsForUser error:', err);
        return [];
    }
}

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        // Better Auth stores users in the "user" collection
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}
