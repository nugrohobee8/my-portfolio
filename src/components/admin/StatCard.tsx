// components/admin/StatCard.tsx
interface StatCardProps {
    label: string;
    value: number | string;
    accent?: "forest" | "amber" | "neutral";
    icon?: React.ReactNode;
}

const accentClasses: Record<
    NonNullable<StatCardProps["accent"]>,
    { bar: string; icon: string }
> = {
    forest: { bar: "bg-[#2F5D50]", icon: "bg-[#2F5D50]/10 text-[#2F5D50]" },
    amber: { bar: "bg-amber-500", icon: "bg-amber-100 text-amber-700" },
    neutral: { bar: "bg-[#1B1B18]/20", icon: "bg-[#1B1B18]/5 text-[#1B1B18]/70" },
};

export default function StatCard({
    label,
    value,
    accent = "neutral",
    icon,
}: StatCardProps) {
    const styles = accentClasses[accent];

    return (
        <div className="group relative overflow-hidden rounded-lg border border-[#1B1B18]/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <span
                className={`absolute inset-x-0 top-0 h-1 ${styles.bar}`}
                aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-[#1B1B18]/60">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[#1B1B18]">
                        {value}
                    </p>
                </div>
                {icon && (
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${styles.icon}`}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
