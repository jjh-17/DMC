import { create } from "zustand";

type User = {
    id: number;
    name: string;
};

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    incrementUserId: () => void; 
    resetUserId: () => void;
}

const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: (user: User) => set({ user }),

    incrementUserId: () => set(state => {
        if (state.user) {
            // 현재 사용자의 ID에 1을 더해 업데이트
            return { user: { ...state.user, id: state.user.id + 1 } };
        }
        return state;
    }),
    resetUserId: () => set(state => {
        if (state.user) {
            // 현재 사용자의 ID를 0으로 리셋
            return { user: { ...state.user, id: 0 } };
        }
        return state;
    }),
}));

export default useUserStore;