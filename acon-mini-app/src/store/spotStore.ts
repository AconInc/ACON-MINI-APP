import { create } from 'zustand';

/* interface */
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


/* initialState */
const initialState: State = {
  spotData: null,
  isLoading: false,
  error: null,
};


/* store */
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
