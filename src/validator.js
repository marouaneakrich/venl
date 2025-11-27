export function validateEnv(env, schema, strict = false) {
  const result = {};

  for (const key in schema) {
    const rule = schema[key];
    const optional = rule.endsWith("?");
    const type = optional ? rule.slice(0, -1) : rule;

    const raw = env[key];

    if (raw === undefined) {
      if (!optional && strict) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
      continue;
    }

    switch (type) {
      case "number":
        const num = Number(raw);
        if (isNaN(num)) throw new Error(`Env ${key} must be a number`);
        result[key] = num;
        break;

      case "boolean":
        result[key] = raw === "true" || raw === true;
        break;

      case "string":
        result[key] = String(raw);
        break;

      default:
        throw new Error(`Unknown schema type "${type}" for ${key}`);
    }
  }

  return result;
}
