module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'Detects Promises that are not awaited or handled.',
        recommended: true,
      },
      schema: [],
    },
    create(context) {
      return {
        ExpressionStatement(node) {
          if (
            node.expression &&
            node.expression.type === 'CallExpression' &&
            isLikelyPromise(node.expression)
          ) {
            context.report({
              node,
              message: 'Promise is not awaited or handled with .then/.catch.',
            });
          }
        },
      };
  
      function isLikelyPromise(expr) {
        return (
          expr.callee &&
          expr.callee.type === 'Identifier' &&
          !hasHandledChain(expr)
        );
      }
  
      function hasHandledChain(expr) {
        return (
          expr.parent &&
          expr.parent.type === 'MemberExpression' &&
          ['then', 'catch', 'finally'].includes(expr.parent.property.name)
        );
      }
    },
  };