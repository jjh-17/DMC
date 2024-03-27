import { create } from "zustand";

export type User = {
  id: number;
  name: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  removeTokens: () => void;
}

const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  removeTokens: () => set({ accessToken: null, refreshToken: null }),
}));

export { useUserStore, useTokenStore };

// import { create } from "zustand";

// export type User = {
//     id: number;
//     name: string;
//     accessToken: string;
//     refreshToken: string;
// };

// interface UserState {
//     user: User | null;
//     setUser: (user: User) => void;
//     incrementUserId: () => void;
//     resetUserId: () => void;
//     setTokens: (accessToken: string, refreshToken: string) => void;
// }

// const useUserStore = create<UserState>((set) => ({
//     user: null,
//     setUser: (user) => {
//         set({ user })
//     },
//     incrementUserId: () => set((state) => {
//         if (state.user) {
//             return { user: { ...state.user, id: state.user.id + 1 } };
//         }
//         return state;
//     }),
//     resetUserId: () => set((state) => {
//         if (state.user) {
//             return { user: { ...state.user, id: 0 } };
//         }
//         return state;
//     }),
//     setTokens: (accessToken, refreshToken) => set((state) => {
//         if (state.user) {
//             return { user: { ...state.user, accessToken, refreshToken } };
//         }
//         return state;
//     }),
// }));

// export default useUserStore;

// // import { create } from "zustand";

// // export type User = {
// //     id: number;
// //     name: string;
// //     accessToken: string,
// //     refreshToken: string,
// // };

// // interface UserState {
// //     user: User | null;
// //     setUser: (user: User) => void;
// //     incrementUserId: () => void;
// //     resetUserId: () => void;
// // }

// // const useUserStore = create<UserState>(set => ({
// //     user: null,
// //     setUser: (newState) => {
// //         set(() => ({ user: newState}))
// //     },

// //     accessToken: "",
// //     refreshToken: "",
// //     setRefreshToken: (),

// //     incrementUserId: () => set(state => {
// //         if (state.user) {
// //             // 현재 사용자의 ID에 1을 더해 업데이트
// //             return { user: { ...state.user, id: state.user.id + 1 } };
// //         }
// //         return state;
// //     }),
// //     resetUserId: () => set(state => {
// //         if (state.user) {
// //             // 현재 사용자의 ID를 0으로 리셋
// //             return { user: { ...state.user, id: 0 } };
// //         }
// //         return state;
// //     }),
// // }));

// // export default useUserStore;
