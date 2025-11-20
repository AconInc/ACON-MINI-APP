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
  error: string | null;
  rawError: any | null;
}

interface Actions {
  setLoading: () => void;
  setSuccess: (data: SpotData) => void;
  setError: (message: string, raw?: any) => void;
  resetState: (keys?: Array<keyof State>) => void;
}

/* initial state */
const initialState: State = {
  spotData: null,
  status: 'idle',
  error: null,
  rawError: null,
};

/* store */
export const useSpotStore = create<State & Actions>((set) => ({
  ...initialState,

  setLoading: () =>
    set(() => ({
      status: 'loading',
      error: null,
      rawError: null,
      spotData: null,
    })),

  setSuccess: (spotData: SpotData) =>
    set(() => ({
      status: 'success',
      spotData,
      error: null,
      rawError: null,
    })),

  setError: (message: string, raw?: any) =>
    set(() => ({
      status: 'error',
      error: message,
      rawError: raw ?? null,
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
