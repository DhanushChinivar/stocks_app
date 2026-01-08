"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createAlert, deleteAlert, updateAlert } from "@/lib/actions/alert.actions";
import { formatChangePercent, formatPrice, getAlertText, getChangeColorClass } from "@/lib/utils";

type AlertsPanelProps = {
    initialAlerts: Alert[];
    watchlistOptions: Array<{ symbol: string; company: string }>;
    quotesBySymbol: Record<string, QuoteData | undefined>;
};

const AlertsPanel = ({ initialAlerts, watchlistOptions, quotesBySymbol }: AlertsPanelProps) => {
    const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<AlertData>({
        symbol: watchlistOptions[0]?.symbol || "",
        company: watchlistOptions[0]?.company || "",
        alertName: "",
        alertType: "upper",
        threshold: "",
    });
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const symbolToCompany = useMemo(() => {
        const map = new Map<string, string>();
        watchlistOptions.forEach((item) => map.set(item.symbol, item.company));
        return map;
    }, [watchlistOptions]);

    const resetForm = () => {
        setForm({
            symbol: watchlistOptions[0]?.symbol || "",
            company: watchlistOptions[0]?.company || "",
            alertName: "",
            alertType: "upper",
            threshold: "",
        });
        setActiveId(null);
        setIsEditing(false);
    };

    const openCreate = () => {
        resetForm();
        setOpen(true);
    };

    const openEdit = (alert: Alert) => {
        setForm({
            symbol: alert.symbol,
            company: alert.company,
            alertName: alert.alertName,
            alertType: alert.alertType,
            threshold: String(alert.threshold),
        });
        setActiveId(alert.id);
        setIsEditing(true);
        setOpen(true);
    };

    const attachQuoteData = (alert: Alert) => {
        const quote = quotesBySymbol[alert.symbol];
        return {
            ...alert,
            currentPrice: alert.currentPrice ?? quote?.c,
            changePercent: alert.changePercent ?? quote?.dp,
        };
    };

    const handleSubmit = () => {
        if (!form.symbol || !form.alertName || !form.threshold) {
            toast.error("Fill out all fields");
            return;
        }

        startTransition(async () => {
            const payload: AlertData = {
                ...form,
                company: symbolToCompany.get(form.symbol) || form.company || form.symbol,
            };

            const result = isEditing && activeId
                ? await updateAlert(activeId, payload)
                : await createAlert(payload);

            if (!result?.success || !result.data) {
                toast.error(result?.error || "Alert update failed");
                return;
            }

            const nextAlert: Alert = attachQuoteData({
                id: result.data.id,
                symbol: result.data.symbol,
                company: result.data.company,
                alertName: result.data.alertName,
                alertType: result.data.alertType,
                threshold: result.data.threshold,
                currentPrice: undefined,
            });

            setAlerts((prev) => {
                if (!isEditing) return [nextAlert, ...prev];
                return prev.map((alert) => (alert.id === nextAlert.id ? nextAlert : alert));
            });

            setOpen(false);
            resetForm();
        });
    };

    const handleDelete = (alertId: string) => {
        startTransition(async () => {
            const result = await deleteAlert(alertId);
            if (!result?.success) {
                toast.error(result?.error || "Failed to delete alert");
                return;
            }
            setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
        });
    };

    return (
        <div className="watchlist-alerts">
            <div className="flex items-center justify-between">
                <h2 className="watchlist-title">Alerts</h2>
                <button className="add-alert" onClick={openCreate} disabled={watchlistOptions.length === 0}>
                    Add Alert
                </button>
            </div>

            <div className="alert-list">
                {alerts.length === 0 ? (
                    <div className="alert-empty">
                        No alerts yet. Add one to get notified when a price hits your target.
                    </div>
                ) : (
                    alerts.map((alert) => {
                        const currentPrice = alert.currentPrice;
                        const changePercent = alert.changePercent;
                        return (
                            <div key={alert.id} className="alert-item">
                                <div className="alert-name">{alert.alertName}</div>
                                <div className="alert-details">
                                    <div>
                                        <div className="alert-company">
                                            {alert.company} • {alert.symbol}
                                        </div>
                                        <div className="text-sm text-gray-500">{getAlertText(alert)}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="alert-price">
                                            {typeof currentPrice === "number" ? formatPrice(currentPrice) : "—"}
                                        </div>
                                        <div className={getChangeColorClass(changePercent)}>
                                            {typeof changePercent === "number" ? formatChangePercent(changePercent) : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="alert-actions">
                                    <span className="text-sm text-gray-500">
                                        {alert.alertType === "upper" ? "Above" : "Below"} {formatPrice(alert.threshold)}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="alert-update-btn"
                                            onClick={() => openEdit(alert)}
                                            aria-label={`Edit alert ${alert.alertName}`}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="alert-delete-btn"
                                            onClick={() => handleDelete(alert.id)}
                                            aria-label={`Delete alert ${alert.alertName}`}
                                            disabled={isPending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <Dialog open={open} onOpenChange={(value) => {
                if (!value) resetForm();
                setOpen(value);
            }}>
                <DialogContent className="alert-dialog">
                    <DialogHeader>
                        <DialogTitle className="alert-title">
                            {isEditing ? "Update Alert" : "Create Alert"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Stock</label>
                            <Select
                                value={form.symbol}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        symbol: value,
                                        company: symbolToCompany.get(value) || prev.company,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    {watchlistOptions.map((option) => (
                                        <SelectItem key={option.symbol} value={option.symbol}>
                                            {option.symbol} • {option.company}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Alert name</label>
                            <Input
                                value={form.alertName}
                                onChange={(e) => setForm((prev) => ({ ...prev, alertName: e.target.value }))}
                                placeholder="Example: Breakout alert"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Condition</label>
                            <Select
                                value={form.alertType}
                                onValueChange={(value) =>
                                    setForm((prev) => ({ ...prev, alertType: value as "upper" | "lower" }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upper">Price goes above</SelectItem>
                                    <SelectItem value="lower">Price goes below</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Target price</label>
                            <Input
                                type="number"
                                value={form.threshold}
                                onChange={(e) => setForm((prev) => ({ ...prev, threshold: e.target.value }))}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={isPending}>
                            {isEditing ? "Save Alert" : "Create Alert"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AlertsPanel;
