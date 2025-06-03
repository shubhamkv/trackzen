import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  name: string;
  createdAt: Date;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: ({ user, token }) => set({ user, token }),
      logout: () => {
        set({ user: null, token: null });
        toast.success("Logout successfully");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
