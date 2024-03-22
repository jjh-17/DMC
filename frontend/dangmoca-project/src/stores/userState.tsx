import { create } from "zustand";

const useUserStore = create(set => ({
    userId: 0,
    increasUserId: () => set((state: { userId: number; }) => ({ userId: state.userId + 1 })),
    resetUserId: () => set({ userId: 0}),
}));

export default useUserStore;