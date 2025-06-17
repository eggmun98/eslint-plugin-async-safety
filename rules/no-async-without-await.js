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
  
      function hasAwait(node) {
        let found = false;
      
        function search(n) {
          if (!n || found) return;
      
          if (n.type === 'AwaitExpression') {
            found = true;
            return;
          }
      
          for (const key in n) {
            if (!Object.prototype.hasOwnProperty.call(n, key)) continue;
      
            const value = n[key];
      
            if (Array.isArray(value)) {
              value.forEach(child => {
                if (child && typeof child.type === 'string') {
                  search(child);
                }
              });
            } else if (value && typeof value.type === 'string') {
              search(value);
            }
          }
        }

        search(node);
        return found;
      }
    },
  };
  