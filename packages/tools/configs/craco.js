const dotenv = require("dotenv");
const { readFileSync } = require("fs");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const plugins = [];
dotenv.config();
if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}
try {
  const overrideFile = dotenv.parse(
    readFileSync(`${process.cwd()}/.env.override`)
  );
  for (const value in overrideFile) {
    process.env[value] = overrideFile[value];
  }
} catch (e) {
  console.log("No Override file detected");
}

module.exports = (options = {}) => ({
  webpack: {
    plugins,
  },
  // Suppress compile errors,
  typescript: {
    enableTypeChecking: false,
  },
  // Disable eslint error logs
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      "transform-css-import-to-string",
      "babel-plugin-styled-components",
      ...(process.env.REACT_APP_PRESERVE_TEST_ATTRIBUTES == "true"
        ? []
        : ["react-remove-properties"]),
    ],
  },
  // Import styles on demand
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#4DA789",
              "@font-size-base": "13px",
              "@slider-handle-size": "10px",
              "@slider-handle-margin-top": "-2.8px",
              "@collapse-header-padding": "@padding-xs - 2px @padding-md",
              "@collapse-header-arrow-left": "16px",
            },
            javascriptEnabled: true,
          },
        },
        customizeThemeLessPath:
          options.customizeThemeLessPath ||
          path.resolve(__dirname, "../../ui/build/theme/variables.less"),
      },
    },
  ],
  jest: {
    configure: (config) => {
      return {
        ...config,
        transformIgnorePatterns: ["node_modules/(?!@ucraft|antd|codemirror)"],
      };
    },
  },
});
