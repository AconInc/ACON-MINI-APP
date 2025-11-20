import { create } from 'zustand';

/* type */
type SpotStatus = 'idle' | 'loading' | 'success' | 'error';

/* interface */
interface SpotData {
  id: number;
  spotName: string;
  category: string;
}

interface State {
  spotData: SpotData | null;
  status: SpotStatus;
}

interface Actions {
  setLoading: () => void;
  setSuccess: (data: SpotData) => void;
  setError: () => void;
  resetState: (keys?: Array<keyof State>) => void;
}

/* initial state */
const initialState: State = {
  spotData: null,
  status: 'idle',
};

/* store */
export const useSpotStore = create<State & Actions>((set) => ({
  ...initialState,

  setLoading: () =>
    set(() => ({
      status: 'loading',
      spotData: null,
    })),

  setSuccess: (spotData: SpotData) =>
    set(() => ({
      status: 'success',
      spotData,
    })),

  setError: () =>
    set(() => ({
      status: 'error',
      spotData: null,
    })),

  resetState: (keys) => {
    if (!keys) {
      set(initialState);
      return;
    }
    set(keys.reduce((acc, key) => ({ ...acc, [key]: initialState[key] }), {}));
  },
}));
