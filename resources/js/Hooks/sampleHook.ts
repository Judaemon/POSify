import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: (by?: number) => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: (by = 1) => set((state) => ({ bears: state.bears + by })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
