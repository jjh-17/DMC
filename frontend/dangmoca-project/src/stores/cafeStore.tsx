import { create } from "zustand";

export interface CafeState {
  selectedCafeSeq: number;
  setSelectedCafeSeq: (cafeSeq: number) => void;
}

const useCafeStore = create<CafeState>((set) => ({
  selectedCafeSeq: localStorage.getItem("selectedCafeSeq")
    ? parseInt(localStorage.getItem("selectedCafeSeq")!)
    : -1,
  setSelectedCafeSeq: (cafeSeq) => {
    localStorage.setItem("selectedCafeSeq", cafeSeq.toString());
    set({ selectedCafeSeq: cafeSeq });
  },
}));

export default useCafeStore;
