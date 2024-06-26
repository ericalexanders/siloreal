module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "no-var": "error",
    semi: "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "import/no-unresolved": [
      "error",
      {
        plugins: [
          "module-resolve",
          {
            alias: {
              "@config": "./src/config",
              "@services": "./src/services",
              "@controllers": "./src/controllers",
              "@middlewares": "./src/middlewares",
              "@typing": "./src/typing",
              "@routes": "./src/routes",
              "@utils": "./src/utils",
            },
          },
        ],
      },
    ],
  },
};
