import { User } from "@/utils/type";
import { create } from "zustand";

interface UserStore {
    user: User | null;
    updateUser: (newUser: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    updateUser: (newUser: User | null) => set({ user: newUser }),
}));

export default useUserStore;
  