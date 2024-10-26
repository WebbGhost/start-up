// .dependency-cruiser.js
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "shared-modules-rules",
      comment: "Shared modules can only import from other shared modules",
      severity: "error",
      from: {
        path: "^src/(components|data|drizzle|hooks|lib|server)/",
      },
      to: {
        path: "^src/(?!(components|data|drizzle|hooks|lib|server)/)",
      },
    },
    {
      name: "feature-boundaries",
      comment: "Features can only import from shared or themselves",
      severity: "error",
      from: {
        path: "^src/features/([^/]+)/",
      },
      to: {
        pathNot: [
          "^src/(components|data|drizzle|hooks|lib|server)/",
          "^src/features/\\1/",
        ],
      },
    },
    {
      name: "app-rules",
      comment: "App can only import from shared and features",
      severity: "error",
      from: {
        path: "^src/app/",
      },
      to: {
        pathNot: [
          "^src/(components|data|drizzle|hooks|lib|server)/",
          "^src/features/",
          "^src/app/.*\\.css$",
        ],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    tsConfig: {
      fileName: "./tsconfig.json",
    },
    enhancedResolveOptions: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  },
};
