import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full border-b border-gray-300 select-none mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 bg-white mb-0">
      {/* Logo / Title */}
      <div className="flex gap-5">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
          Dashboard
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex gap-1 md:gap-3">
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Logout
            </button>
          </form>
        ) : (
          <Link
            href="/signin"
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
