import Link from "next/link";
import { Logo } from "./logo";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Logo />
                <div className="flex items-center gap-6 text-sm text-zinc-300">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/audit">
                        Audit
                    </Link>
                </div>
            </div>
        </nav>
    );
}