'use server';

import { connectToDatabase } from "@/database/mongoose";
import { User } from "@/database/models/user.model";

export const getAllUsersForNewsEmail = async () => {
    try {
        await connectToDatabase();
        const users = await User.find(
            { email: { $exists: true, $ne: null } },
            { _id: 1, id: 1, email: 1, name: 1, country: 1 }
        ).lean();

        return users.filter((user) =>user.email && user.name).map((user) => ({
            id: user.id || user._id?.toString() || '',
            email: user.email,
            name: user.name
        }))
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}
