module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require await expressions to be wrapped in try/catch blocks.',
        recommended: true,
      },
      schema: [],
    },
    create(context) {
      return {
        AwaitExpression(node) {
          let current = node;
          while (current) {
            if (current.type === 'TryStatement') {
              return;
            }
            current = current.parent;
          }
          context.report({
            node,
            message: 'Await expression is not inside a try/catch block.',
          });
        },
      };
    },
  };