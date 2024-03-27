import {create} from 'zustand'

export interface CafeState {
    selectedCafeSeq: number;
    setSelectedCafeSeq: (cafeSeq: number) => void;
  }

  const useCafeStore = create<CafeState>((set) => ({
    selectedCafeSeq: -1,
    setSelectedCafeSeq: (cafeSeq) => set({ selectedCafeSeq: cafeSeq }),
  }));

export default useCafeStore;