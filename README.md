# venl

A modern, zero-dependency environment loader for Node.js, using `.venl` files instead of `.env`.

`venl` automatically loads environment files, validates them, casts values, lets you control modes with `NODE_VENL`, and even includes a CLI for running apps with configuration pre-loaded.

---

## 🚀 Features

- 🔄 Auto-loads `.venl`, `.venl.local`, and `.venl.{development|production|test}`
- 🌍 Controlled by `NODE_VENL` (not `NODE_ENV`)
- 🧩 Supports schema validation (`string`, `number`, `boolean`, optional fields)
- 🔢 Optional automatic type casting
- 🧪 TypeScript support out of the box
- ♻ Hot reloading (`venl.reload()`)
- 🔥 CLI: `venl run node app.js`
- 📦 Zero dependencies
- 🧹 Clean, modern API

---

## 📦 Installation

```bash
npm install venl
```

---

# 📁 File Structure Used by venl

`venl` automatically loads files in this priority:

```
.venl
.venl.development     (if NODE_VENL=development)
.venl.production      (if NODE_VENL=production)
.venl.test            (if NODE_VENL=test)
.venl.local           (always loaded last)
```

Highest priority → `.venl.local`

---

# 🎉 Basic Usage

Create a `.venl` file:

```
PORT=3000
DEBUG=true
API_KEY="ABC123"
```

Load it:

```js
import venl from "venl";

venl.load();

console.log(venl.PORT);
console.log(venl.DEBUG);
console.log(venl.API_KEY);
```
---

# 📦 Usage in CommonJS and ESM
``venl`` works in both ES modules and CommonJS.

**ES Modules (default)**
```js
import venl from "venl";

venl.load();

console.log(venl.PORT);
console.log(venl.DEBUG);
console.log(venl.API_KEY); 
```

**CommonJS (require)**

```js
const venl = require("venl");

venl.load();

console.log(venl.PORT);
console.log(venl.DEBUG);
console.log(venl.API_KEY);
```


---

# 🌍 Using NODE_VENL Modes

Set the mode:

```bash
NODE_VENL=production node app.js
```

This loads:

```
.venl
.venl.production
.venl.local
```

---

# 🧩 Schema Validation

```js
import venl from "venl";

venl.schema = {
  PORT: "number",
  SECRET_KEY: "string?",
  DEBUG: "boolean?"
};

venl.strict = true;
venl.load();
```

If a required variable is missing → throws an error.

---

# 🔢 Auto-Casting

```js
venl.autoCast = true;
venl.load();
```

This converts:

```
"true"   → true
"false"  → false
"123"    → 123
```

---

# 📁 Custom File List

```js
venl.envFiles = [".config.venl", ".secrets.venl"];
venl.load();
```

---

# ♻ Reloading

```js
venl.reload();
```

---

# 🖥️ CLI Usage

Run any command with venl pre-loaded:

```bash
venl run node app.js
```

Example:

```bash
venl run nodemon server.js
```

---

# 🛠 package.json Configuration

To enable the CLI and ESM/CommonJS support, `package.json` includes:



```json
{
  "type": "module",
  "main": "index.cjs",
  "exports": {
    "import": "./src/index.js",
    "require": "./index.cjs"
  },
  "bin": {
    "venl": "bin/venl.js"
  }
}
```

### `"bin"`  
Creates the terminal command `venl`.

### `"type": "module"`  
Enables ES module syntax (`import/export`).

### `"exports"` and `"main"`
Allow both:

- `import venl from "venl";`

- `const venl = require("venl");`



---

# 📘 TypeScript Support

Included automatically:

```ts
import venl from "venl";
```

---

# ❤️ License

MIT
