# eslint-plugin-async-safety

> 🛡 ESLint plugin for catching async/await anti-patterns and ensuring safe, reliable async code.

---

## ✨ Why use this plugin?

Writing `async/await` code looks simple — but it's surprisingly easy to make mistakes that don’t throw errors at compile time but *will* bite you at runtime.

Most existing ESLint plugins, including excellent ones like [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise), help enforce best practices for Promises and chaining patterns.

**However, `eslint-plugin-async-safety` focuses specifically on the safety and reliability of `async/await` usage**—covering real-world issues like:

- Forgotten `try/catch` blocks
- Misused `await` inside loops (performance bottlenecks)
- Uncaught errors in `setTimeout(async () => {})`
- Promises executed without handling
- Async functions declared without actually using `await`

✅ **No TypeScript required**  
✅ **Works out-of-the-box with plain JS or TS**  
✅ **Great for frontend, backend, and fullstack projects**

---

## 🚫 Common issues this plugin prevents

| Problem | Example | Rule |
|--------|---------|------|
| Async function with no `await` | `async function doSomething() { return 1; }` | `no-async-without-await` |
| Unhandled Promise | `fetch('/api/data')` | `no-floating-promises` |
| Slow performance from `await` in loop | `for (...) await fn()` | `no-await-in-loop` |
| Uncaught errors in `setTimeout` | `setTimeout(async () => { ... })` | `no-async-settimeout` |
| Missing try/catch | `const res = await getData()` | `require-catch-in-async` |

---

## 📦 Installation

```bash
npm install eslint-plugin-async-safety --save-dev
# or
yarn add eslint-plugin-async-safety --dev
```



## 🛠 Usage
In your ESLint config (.eslintrc.js):

```js
module.exports = {
  plugins: ['async-safety'],
  rules: {
    'async-safety/no-async-without-await': 'warn',
    'async-safety/no-floating-promises': 'error',
    'async-safety/no-await-in-loop': 'warn',
    'async-safety/no-async-settimeout': 'warn',
    'async-safety/require-catch-in-async': 'warn',
  },
};
```


## 📘 Rules
| Rule                     | Description                                                        | Level          |
| ------------------------ | ------------------------------------------------------------------ | -------------- |
| `no-async-without-await` | Warn if an async function doesn't contain any `await`              | 🔧 Recommended |
| `no-floating-promises`   | Warn if Promises are used without `await` or `.then/.catch`        | 🔧 Recommended |
| `no-await-in-loop`       | Warn against using `await` inside loops (suggest `Promise.all`)    | 🔧 Recommended |
| `no-async-settimeout`    | Disallow using `async` functions inside `setTimeout`/`setInterval` | 🔧 Recommended |
| `require-catch-in-async` | Require `await` to be wrapped in a `try/catch` block               | 🔧 Recommended |


