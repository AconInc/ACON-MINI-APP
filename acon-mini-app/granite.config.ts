import { appsInToss } from '@apps-in-toss/framework/plugins';
import { defineConfig } from '@granite-js/react-native/config';
import { router } from '@granite-js/plugin-router';

import { IMAGES } from './src/constants/assets';

export default defineConfig({
  scheme: 'intoss',
  appName: 'acon-mini-app',
  plugins: [
    router(),
    appsInToss({
      brand: {
        displayName: 'Acon',
        primaryColor: '#FF4A02', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
        icon: IMAGES.AppIcon, // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
        bridgeColorMode: 'basic',
      },
      permissions: [],
    }),
  ],
});
