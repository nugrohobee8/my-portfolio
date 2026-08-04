import { logout } from '@/lib/actions/auth'

type LogoutButtonProps = {
    compact?: boolean
}

export function LogoutButton({ compact }: LogoutButtonProps) {
    return (
        <form action={logout}>
            <button
                type="submit"
                className={`inline-flex items-center justify-center gap-2 border border-red-200 bg-red-50 text-sm font-medium text-red-700 transition hover:bg-red-100 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-red-900 dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900 dark:hover:text-white ${compact ? 'h-10 w-10 rounded-full px-0 py-0' : 'rounded-2xl px-4 py-2'}`}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <path
                        d="M16 17l5-5-5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21 12H9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className={`${compact ? 'hidden' : 'inline'}`}>Logout</span>
            </button>
        </form>
    )
}