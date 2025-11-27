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

      if (process.env[key] === undefined) {
        process.env[key] = env[key];
      }
    }

    return venl;
  };

  venl.reload = function () {
    return venl.load();
  };

  return venl;
}

const venl = createVenl();

export default venl;
export { venl };
