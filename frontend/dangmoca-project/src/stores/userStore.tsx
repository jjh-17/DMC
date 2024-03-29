import { create } from "zustand";

export type User = {
  memberSeq: number;
  nickname: string;
  profileImageUrl: string | null;
  title: string;
  mileage: number;
  titleList: string[];
  preferenceTag: string[];
  deleted: boolean;
};

interface LoginUserState {
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  logout: () => void;
}

const useLoginUserStore = create<LoginUserState>((set) => ({
  loginUser: localStorage.getItem("loginUser")
    ? JSON.parse(localStorage.getItem("loginUser")!)
    : null,
  setLoginUser: (loginUser) => {
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    set({ loginUser });
  },
  logout: () => {
    localStorage.removeItem("loginUser");
    set({ loginUser: null })},
}));




export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

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

export { useLoginUserStore, useTokenStore };

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
