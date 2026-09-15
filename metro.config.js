const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    // నువ్వు రాసిన 'resolverMainFields' కరెక్ట్ ప్రాపర్టీ
    resolverMainFields: ['react-native', 'browser', 'main'],
    sourceExts: ['tsx', 'ts', 'jsx', 'js', 'json'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
