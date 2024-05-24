export default {
  module: {
    rules: [
      {
        test: /\.svg$/, // Matches all files ending with .svg
        use: ["@svgr/webpack"], // Uses the @svgr/webpack loader for SVGs
      },
    ],
  },
};
