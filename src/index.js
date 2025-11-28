import { loadEnvFiles } from "./loader.js";
import { validateEnv } from "./validator.js";

function createVenl() {
  const venl = {};

  venl.schema = null;
  venl.strict = false;
  venl.envFiles = null;
  venl.autoCast = false;

  venl.load = function () {
    let env = loadEnvFiles({
      envFiles: venl.envFiles,
      autoCast: venl.autoCast
    });

    if (venl.schema) {
      env = {
        ...env,
        ...validateEnv(env, venl.schema, venl.strict)
      };
    }

    for (const key in env) {
      venl[key] = env[key];

      if (!process.venl) {
        process.venl = {}; 
      }
      process.venl[key] = env[key];

      if (process.env[key] === undefined) {
        process.env[key] = env[key];
      }
    }

    return venl;
  };

  venl.reload = function () {
    return venl.load();
  };

  venl.config = function (options = {}) {
    if (options.schema) venl.schema = options.schema;
    if (options.strict !== undefined) venl.strict = options.strict;
    if (options.envFiles) venl.envFiles = options.envFiles;
    if (options.autoCast !== undefined) venl.autoCast = options.autoCast;

    return venl.load();
  };

  return venl;
}

const venl = createVenl();

export default venl;
export { venl };
