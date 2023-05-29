import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: '[Timer][timer1]',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
