"use client"

import {
    SidebarContent,
} from "@/components/ui/sidebar"
import useSidebarStore from "@/store/useSidebarStore";
import { FilePlus, FileSearch } from "lucide-react";

const SidebarElements = () => {
    const { setCurrentMenu, currentMenu } = useSidebarStore();
    return (
        <SidebarContent>
            <div className="flex flex-col gap-2 px-2 py-4">

                <button
                    onClick={() => setCurrentMenu("create-resume")}
                    className={`flex items-center cursor-pointer gap-3 rounded-lg px-3 py-2 transition ${currentMenu === "create-resume"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100"
                        }`}
                >
                    <FilePlus size={20} />
                    <span>Create Resume</span>
                </button>

                <button
                    onClick={() => setCurrentMenu("analyze-resume")}
                    className={`flex items-center cursor-pointer gap-3 rounded-lg px-3 py-2 transition ${currentMenu === "analyze-resume"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100"
                        }`}
                >
                    <FileSearch size={20} />
                    <span>Analyze Resume</span>
                </button>
            </div>
        </SidebarContent>
    )
}

export default SidebarElements
