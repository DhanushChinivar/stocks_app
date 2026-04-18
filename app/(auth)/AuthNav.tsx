'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthNav = () => {
    const pathname = usePathname();
    const isSignIn = pathname === '/sign-in';

    return (
        <div className="flex items-center gap-3">
            {isSignIn ? (
                <>
                    <span className="text-sm text-gray-500 hidden sm:block">New to Rallify?</span>
                    <Link
                        href="/sign-up"
                        className="text-sm font-medium text-white border border-white/20 hover:border-yellow-400/60 hover:text-yellow-400 rounded-lg px-4 py-2 transition-all duration-200"
                    >
                        Create account
                    </Link>
                </>
            ) : (
                <>
                    <span className="text-sm text-gray-500 hidden sm:block">Already a member?</span>
                    <Link
                        href="/sign-in"
                        className="text-sm font-medium text-white border border-white/20 hover:border-yellow-400/60 hover:text-yellow-400 rounded-lg px-4 py-2 transition-all duration-200"
                    >
                        Sign in
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthNav;
