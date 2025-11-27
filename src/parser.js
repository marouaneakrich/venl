export function parseEnv(content, options = {}) {
  const { autoCast = false } = options;
  const result = {};

  const lines = content.split(/\r?\n/);

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;

    let [key, ...rest] = line.split("=");
    let value = rest.join("=");

    if (!key) continue;

    key = key.trim();
    value = value.trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (autoCast) {
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (value === "null") value = null;
      else if (!isNaN(value) && value !== "") value = Number(value);
    }

    result[key] = value;
  }

  return result;
}
