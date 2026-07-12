import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import SidebarElements from "./SidebarElements";
import { auth, signOut } from "@/lib/auth";

export async function AppSidebar() {
    const session = await auth();
    console.log("Session in AppSidebar:", session);

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-3 mt-5 px-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />

                    <h1 className="text-2xl font-bold text-black">
                        JobX
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarElements />

            <SidebarFooter>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        ) : (
                            <User size={20} />
                        )}
                    </div>

                    <div>
                        <p className="font-medium text-sm">
                            {session?.user?.name || "Guest User"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {session?.user?.email || "guest@example.com"}
                        </p>
                    </div>
                </div>

                <form
                    action={async () => {
                        "use server";
                        await signOut({
                            redirectTo: "/",
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 cursor-pointer hover:bg-red-100 transition"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </form>
            </SidebarFooter>
        </Sidebar>
    );
}