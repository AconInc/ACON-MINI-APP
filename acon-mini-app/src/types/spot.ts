export interface SpotData {
  id: number;
  spotName: string;
  category: string;
}

export type SpotCategory =
  | 'KOREAN'
  | 'CHINESE'
  | 'JAPANESE'
  | 'WESTERN'
  | 'SOUTHEAST_ASIAN'
  | 'FUSION'
  | 'BUNSIK'
  | 'BUFFET'
  | 'DRINKING_PLACE'
  | 'CAFE';
