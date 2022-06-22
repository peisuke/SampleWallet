module.exports = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("@tradle/react-native-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("react-native-os"),
      stream: require.resolve("readable-stream"),
    },
  }
};
