const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    arch: ['x64', 'arm64']
  },
  extendInfo: {
    NSMicrophoneUsageDescription: 'This app requires microphone access to record audio.',
    NSCameraUseContinuityCameraDeviceType: true,
  },
  osxSign: {
    optionsForFile: (filePath) => {
      // Here, we keep it simple and return a single entitlements.plist file.
      // You can use this callback to map different sets of entitlements
      // to specific files in your packaged app.
      return {
        entitlements: './entitlements.mac.plist',
        entitlementsInherit: './entitlements.mac.plist'
      };
    }
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     arch: ['x64', 'arm64'],
    //     // name: 'agents',
    //     // authors: 'akdev',
    //     // // setupIcon: './assets/icon.ico',
    //     // // loadingGif: './assets/installer.gif',
    //     // setupIcon: false,
    //     // loadingGif: false,
    //     // setupExe: 'AgentsInstaller.exe',
    //     // // certificateFile: "./certificate.pfx",
    //     // // certificatePassword: "homehome",
    //     // noMsi: true
    //   },
    // },

    // MacOS M1 & Intel
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        arch: ['x64', 'arm64']
      },
    },

    // Windows application
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['win32'],
    //   config: {
    //     name: "your-app-name",
    //     arch: ['x64']
    //   }
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {},
      config: {
        arch: ['x64', 'arm64']
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
      config: {
        arch: ['x64', 'arm64']
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
