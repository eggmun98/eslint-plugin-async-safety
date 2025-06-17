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
      return {
        FunctionDeclaration(node) {
          if (node.async && !hasAwait(node.body)) {
            context.report({
              node,
              message: 'Async function has no await expression.',
            });
          }
        },
        FunctionExpression(node) {
          if (node.async && !hasAwait(node.body)) {
            context.report({
              node,
              message: 'Async function has no await expression.',
            });
          }
        },
        ArrowFunctionExpression(node) {
          if (node.async && !hasAwait(node.body)) {
            context.report({
              node,
              message: 'Async function has no await expression.',
            });
          }
        },
      };
  
      function hasAwait(body) {
        let has = false;
        context.getSourceCode().traverse(body, {
          AwaitExpression() {
            has = true;
          },
        });
        return has;
      }
    },
  };
  