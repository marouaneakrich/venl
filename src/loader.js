import fs from "fs";
import path from "path";
import { parseEnv } from "./parser.js";

export function loadEnvFiles(options = {}) {
  const cwd = process.cwd();
  const { envFiles = null, autoCast = false } = options;

  const venlMode = process.env.NODE_VENL || null;

  if (venlMode && !["development", "production", "test"].includes(venlMode)) {
    console.warn(
      `[venl] Warning: Invalid NODE_VENL="${venlMode}". Expected "development", "production", or "test".`
    );
  }

  const defaultFiles = [
    ".venl",
    venlMode ? `.venl.${venlMode}` : null,
    ".venl.local",
  ].filter(Boolean);

  const finalFiles = envFiles || defaultFiles;

  let merged = {};

  for (const file of finalFiles) {
    const location = path.join(cwd, file);

    if (!fs.existsSync(location)) continue;

    const raw = fs.readFileSync(location, "utf8");
    const parsed = parseEnv(raw, { autoCast });

    merged = { ...merged, ...parsed };
  }

  return merged;
}
