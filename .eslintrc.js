module.exports = {
    "parser": "babel-eslint",
    "plugins": [
      "import",
    ],
    "extends": ["airbnb"],
    "rules": {
      // Soften some rules.
      "default-case": 0, // Required default case is nonsense.
      "key-spacing": [2, {"beforeColon": false, "afterColon": true, "mode": "minimum"}], // Enable use of nice block object creation.
      "max-len": [0, {"code": 120, "ignoreComments": true}],
      "new-cap": [2, {"capIsNew": false, "newIsCap": true}], // For Record() etc.
      "newline-after-var": 2,
      "newline-before-return": 2,
      "no-floating-decimal": 0, // .5 is just fine.
      "no-shadow": 2, // Shadowing is a nice language feature, but it can kick
      "no-unused-expressions": 0,
      "no-use-before-define": 0, // Enable to define styles after using them in component.
      "react/jsx-no-bind": 0, // Enable arrow functions in Props definitions.
      "react/prefer-stateless-function": 0, // Enable functions with state.
      "react/prop-types": 0,
      // eslint-plugin-import
      "import/no-unresolved": [2, {"commonjs": true}],
      "import/named": 2,
      "import/default": 2,
      "import/namespace": 2,
      "import/export": 2,
    },
    "globals": {
      "after": false,
      "afterEach": false,
      "before": false,
      "beforeEach": false,
      "console": false,
      "describe": false,
      "it": false,
      "module": false,
      "process": false,
      "require": false,
      "window": false,
      "faker": false,
    },
    "settings": {
      "import/ignore": [
        "node_modules",
        "\\.json$",
        "\\.svg",
      ],
      "import/parser": "babel-eslint",
      "import/resolve": {
        "extensions": [
          ".js",
          ".jsx",
          ".json",
        ]
      }
    }
  }
  