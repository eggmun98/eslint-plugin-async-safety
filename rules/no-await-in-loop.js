module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Discourages use of await inside loops, which can cause performance issues.',
        recommended: true,
      },
      schema: [],
    },
    create(context) {
      return {
        AwaitExpression(node) {
          let current = node;
          while (current) {
            if (
              current.type === 'ForStatement' ||
              current.type === 'WhileStatement' ||
              current.type === 'ForOfStatement' ||
              current.type === 'ForInStatement'
            ) {
              context.report({
                node,
                message: 'Avoid using await inside loops. Consider using Promise.all for parallel execution.',
              });
              break;
            }
            current = current.parent;
          }
        },
      };
    },
  };