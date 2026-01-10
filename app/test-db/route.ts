import { connectToDatabase } from '@/database/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({ message: 'MongoDB connected successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'MongoDB connection failed' },
            { status: 500 }
        );
    }
}
