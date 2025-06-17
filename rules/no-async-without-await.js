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
    function checkFunction(node) {
      if (node.async && !hasAwait(node.body)) {
        context.report({
          node,
          message: 'Async function has no await expression.',
        });
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };

    function hasAwait(node) {
      if (!node || !node.body) return false;

      const body = node.body.type === 'BlockStatement' ? node.body.body : [node.body];

      return body.some(traverse);

      function traverse(n) {
        if (!n || typeof n !== 'object') return false;
        if (n.type === 'AwaitExpression') return true;

        for (const key of Object.keys(n)) {
          const child = n[key];

          if (Array.isArray(child)) {
            if (child.some(traverse)) return true;
          } else if (child && typeof child.type === 'string') {
            if (traverse(child)) return true;
          }
        }

        return false;
      }
    }
  },
};
