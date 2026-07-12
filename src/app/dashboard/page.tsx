import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/component/dashboard/AppSidebar";
import MainContent from "@/component/dashboard/MainContent";

const page = async () => {
  const user = await auth();

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
        <p className="mt-3 text-gray-500 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <MainContent />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default page;

