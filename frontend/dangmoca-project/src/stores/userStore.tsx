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