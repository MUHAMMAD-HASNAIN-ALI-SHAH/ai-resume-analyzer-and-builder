import { create } from "zustand";

interface SidebarState {
    currentMenu: string;
    setCurrentMenu: (menu: string) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
    currentMenu: "create-resume",
    setCurrentMenu: (menu) => set({ currentMenu: menu }),
}));

export default useSidebarStore;
