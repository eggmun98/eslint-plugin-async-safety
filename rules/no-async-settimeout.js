module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow using async functions as setTimeout/setInterval callbacks.',
        recommended: true,
      },
      schema: [],
    },
    create(context) {
      return {
        CallExpression(node) {
          const isSetTimeout =
            node.callee.type === 'Identifier' &&
            ['setTimeout', 'setInterval'].includes(node.callee.name);
  
          const firstArg = node.arguments[0];
  
          if (
            isSetTimeout &&
            firstArg &&
            (firstArg.type === 'FunctionExpression' || firstArg.type === 'ArrowFunctionExpression') &&
            firstArg.async
          ) {
            context.report({
              node: firstArg,
              message: 'Avoid using async functions with setTimeout or setInterval. Errors inside cannot be caught.',
            });
          }
        },
      };
    },
  };