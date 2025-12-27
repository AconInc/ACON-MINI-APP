import { SpotCategory } from 'types/spot';

export const LOTTIES = {
  DropAcorn: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/drop5Acorn.json',
} as const;

export const IMAGES = {
  AppIcon: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/app-icon.png',

  HeadAche: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/img-headache.png',

  Loading: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/loading.png',
} as const;

const spotCategoryImages: Record<SpotCategory, string> = {
  SOUTHEAST_ASIAN: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-asian.png',
  DRINKING_PLACE: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-bar.png',
  BUFFET: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-buffet.png',
  BUNSIK: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-bunsik.png',
  CAFE: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-cafe.png',
  CHINESE: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-chinese.png',
  FUSION: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-fusion.png',
  JAPANESE: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-japanese.png',
  KOREAN: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-korean.png',
  WESTERN: 'https://acon-bucket.s3.ap-northeast-2.amazonaws.com/app-in-toss/card-western.png',
};

export const getSpotCategoryImage = (category: string): string => {
  if (category in spotCategoryImages) {
    return spotCategoryImages[category as SpotCategory];
  }

  // 기본 이미지
  return spotCategoryImages.KOREAN;
};
