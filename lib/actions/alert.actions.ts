'use server';

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { connectToDatabase } from "@/database/mongoose";
import { Alert as AlertModel } from "@/database/models/alert.model";

const getSessionUser = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return null;

    return {
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.name || "",
    };
};

const normalizeSymbol = (symbol: string) => symbol.trim().toUpperCase();

export async function getAlertsForUser(): Promise<Alert[]> {
    try {
        const user = await getSessionUser();
        if (!user) return [];

        await connectToDatabase();
        const alerts = await AlertModel.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

        return alerts.map((alert) => ({
            id: String(alert._id),
            symbol: String(alert.symbol),
            company: String(alert.company),
            alertName: String(alert.alertName),
            alertType: alert.alertType as "upper" | "lower",
            threshold: Number(alert.threshold),
            currentPrice: undefined,
        }));
    } catch (err) {
        console.error("getAlertsForUser error:", err);
        return [];
    }
}

export async function createAlert(data: AlertData) {
    try {
        const user = await getSessionUser();
        if (!user) return { success: false, error: "Not authenticated" };

        const threshold = Number(data.threshold);
        if (!data.symbol || !data.company || !data.alertName || !Number.isFinite(threshold)) {
            return { success: false, error: "Invalid alert data" };
        }

        await connectToDatabase();
        const created = await AlertModel.create({
            userId: user.id,
            symbol: normalizeSymbol(data.symbol),
            company: data.company.trim(),
            alertName: data.alertName.trim(),
            alertType: data.alertType,
            threshold,
            createdAt: new Date(),
        });

        return {
            success: true,
            data: {
                id: String(created._id),
                symbol: created.symbol,
                company: created.company,
                alertName: created.alertName,
                alertType: created.alertType as "upper" | "lower",
                threshold: created.threshold,
            },
        };
    } catch (err) {
        console.error("createAlert error:", err);
        return { success: false, error: "Failed to create alert" };
    }
}

export async function updateAlert(alertId: string, data: AlertData) {
    try {
        const user = await getSessionUser();
        if (!user) return { success: false, error: "Not authenticated" };

        const threshold = Number(data.threshold);
        if (!alertId || !data.symbol || !data.company || !data.alertName || !Number.isFinite(threshold)) {
            return { success: false, error: "Invalid alert data" };
        }

        await connectToDatabase();
        const updated = await AlertModel.findOneAndUpdate(
            { _id: alertId, userId: user.id },
            {
                $set: {
                    symbol: normalizeSymbol(data.symbol),
                    company: data.company.trim(),
                    alertName: data.alertName.trim(),
                    alertType: data.alertType,
                    threshold,
                },
            },
            { new: true }
        ).lean();

        if (!updated) return { success: false, error: "Alert not found" };

        return {
            success: true,
            data: {
                id: String(updated._id),
                symbol: String(updated.symbol),
                company: String(updated.company),
                alertName: String(updated.alertName),
                alertType: updated.alertType as "upper" | "lower",
                threshold: Number(updated.threshold),
            },
        };
    } catch (err) {
        console.error("updateAlert error:", err);
        return { success: false, error: "Failed to update alert" };
    }
}

export async function deleteAlert(alertId: string) {
    try {
        const user = await getSessionUser();
        if (!user) return { success: false, error: "Not authenticated" };

        if (!alertId) return { success: false, error: "Missing alert id" };

        await connectToDatabase();
        await AlertModel.deleteOne({ _id: alertId, userId: user.id });
        return { success: true };
    } catch (err) {
        console.error("deleteAlert error:", err);
        return { success: false, error: "Failed to delete alert" };
    }
}
