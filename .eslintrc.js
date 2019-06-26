module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            0,
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": [
            2,
            "always-multiline"
        ],
        "import/imports-first": 2,
        "import/newline-after-import": 2,
        "import/no-dynamic-require": 2,
        "import/no-unresolved": 2,
        "no-multi-spaces": 2,
        "react/display-name": 0,
    },
    "globals": {
        '__DEV__': true
    },
    "parser": "babel-eslint"
};
