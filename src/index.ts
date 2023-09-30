import figlet from "figlet";
import { Command } from "commander";
import { exec } from "child_process";
import { executeCommands } from "./helpers";

const program = new Command();

console.log(figlet.textSync("CLI Manager"));

program
  .version("1.0.0")
  .description("An CLI Manager for Linux")
  .option("-d, --distro [value]", "Declare the distro you are using")
  .option("-u, --update", "Update the system")
  .option("-c, --clean", "Clean the system")
  .parse(process.argv);

const options = program.opts();

if (options.distro === "archlinux" && options.update) {
  exec("yay -Syu", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

if (options.distro === "archlinux" && options.clean) {
  const commands: string[] = [
    "sudo pacman -Scc --noconfirm",
    "sudo pacman -Rns $(pacman -Qdtq) --noconfirm",
    "sudo journalctl --vacuum-time=7d",
    "sudo rm -rf /tmp/*",
    "yay -Sc --noconfirm",
  ];

  executeCommands(commands);
}
