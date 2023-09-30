import { exec } from "child_process";

export const executeCommands = (commands: string[], index = 0) => {
  if (index < commands.length) {
    const command = commands[index];
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(stderr);
      } else {
        console.log(`Output of command: ${command}`);
        console.log(stdout);
      }
      executeCommands(commands, index + 1);
    });
  }
};
