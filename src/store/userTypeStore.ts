import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserType = "privat" | "bedrift";

interface UserTypeState {
    userType: UserType;
    setUserType: (type: UserType) => void;
}

export const useUserTypeStore = create<UserTypeState>()(
    persist(
        (set) => ({
            userType: "privat",
            setUserType: (type) => set({ userType: type }),
        }),
        {
            name: "user-type-storage",
        }
    )
);
