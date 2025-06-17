module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Warns when an async function has no await expression.',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    const functionStack = [];

    function enterFunction(node) {
      if (!node.async) return;
      functionStack.push({ node, hasAwait: false });
    }

    function exitFunction() {
      const fn = functionStack.pop();
      if (fn && !fn.hasAwait) {
        context.report({
          node: fn.node,
          message: 'Async function has no await expression.',
        });
      }
    }

    return {
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,

      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,

      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,

      AwaitExpression() {
        const currentFn = functionStack[functionStack.length - 1];
        if (currentFn) {
          currentFn.hasAwait = true;
        }
      },
    };
  },
};
