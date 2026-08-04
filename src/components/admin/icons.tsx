// components/admin/icons.tsx
// Inline SVG icons, hand-rolled to avoid adding an icon library dependency.

type IconProps = {
    className?: string;
};

export function ArticleIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M5 2.5h7.5L17 7v10a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 .5-.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d="M12 2.5V7h4.5M7 10.5h6M7 13.5h6M7 7.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ProjectIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M2.5 6.5A1.5 1.5 0 0 1 4 5h3.086a1 1 0 0 1 .707.293L9 6.5H16a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SkillIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M10 2.5 12 7l4.5.6-3.3 3.2.8 4.6L10 13.2l-4 2.2.8-4.6L3.5 7.6 8 7l2-4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ExperienceIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M2.5 7.5A1.5 1.5 0 0 1 4 6h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d="M7 6V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6M2.5 10.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function PublishedIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M7 10.2 9 12.2l4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function DraftIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M12.5 3.5 16 7l-8 8H4.5v-3.5l8-8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function PlusIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ArrowRightIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function DashboardIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M2.5 3.5h6v6h-6v-6ZM11.5 3.5h6v3.5h-6v-3.5ZM11.5 9.5h6v7h-6v-7ZM2.5 12h6v4.5h-6V12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ChevronLeftIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M12.5 4.5 7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function LogoutIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M7.5 17H4.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 13.5 17 10l-4-3.5M17 10H7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SearchIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M13.5 13.5 17.5 17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export function StarIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2.5 12 7l4.5.6-3.3 3.2.8 4.6L10 13.2l-4 2.2.8-4.6L3.5 7.6 8 7l2-4.5Z" />
        </svg>
    );
}

export function InboxIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M2.5 11 5 4.5h10L17.5 11M2.5 11v4a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4M2.5 11h4.2l.8 1.8h4.9l.8-1.8h4.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}
