import { spawn } from "child_process";
import venl from "../src/index.js";

const args = process.argv.slice(2);

if (args[0] === "run") {
  venl.load();

  const command = args[1];
  const commandArgs = args.slice(2);

  const child = spawn(command, commandArgs, {
    stdio: "inherit",
    shell: true
  });

  child.on("exit", code => {
    process.exit(code);
  });

} else {
  console.log("venl CLI");
  console.log("Usage:");
  console.log("  venl run node app.js");
}
