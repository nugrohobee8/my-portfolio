import { logout } from '@/lib/actions/auth'

export function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-red-100"
            >
                Logout
            </button>
        </form>
    )
}