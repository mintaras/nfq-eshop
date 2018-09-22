module.exports = { 
    "extends": "airbnb-base",
    "env": {
        "es6": true
    },
    "rules": {
        "brace-style": ["error", "stroustrup"],
        "arrow-body-style": ["error", "as-needed"],
        "arrow-parens": ["error", "as-needed"],
        "no-unused-vars": 2
    },
    "globals": {
        "window": true,
        "document": true
    },
    "parser": "babel-eslint"
};