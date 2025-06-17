module.exports = {
    rules: {
      'no-async-without-await': require('./rules/no-async-without-await'),
      'no-floating-promises': require('./rules/no-floating-promises'),
      'no-await-in-loop': require('./rules/no-await-in-loop'),
      'no-async-settimeout': require('./rules/no-async-settimeout'),
      'require-catch-in-async': require('./rules/require-catch-in-async')
    },
  };