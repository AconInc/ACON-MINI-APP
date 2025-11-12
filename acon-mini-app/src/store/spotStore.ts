import { create } from 'zustand';

interface SpotData {
  id: number;
  spotName: string;
  category: string;
}

interface State {
  spotData: SpotData | null;
  isLoading: boolean;
  error: string | null;
}
interface Actions {
  actions: {
    setSpot: (spotData: SpotData) => void;
    resetState: (keys?: Array<keyof State>) => void;
  };
}

const initialState: State = {
  spotData: null,
  isLoading: false,
  error: null,
};
export const useSpotStore = create<State & Actions>((set) => ({
  ...initialState,
  actions: {
    setSpot: (spotData: SpotData) => set(() => ({ spotData })),
    resetState: (keys) => {
      // 전체 상태 초기화
      if (!keys) {
        set(initialState);
        return;
      }
      // 일부 상태 초기화
      set(keys.reduce((acc, key) => ({ ...acc, [key]: initialState[key] }), {}));
    },
  },
}));
