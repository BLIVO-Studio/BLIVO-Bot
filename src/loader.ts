import fs from 'node:fs'
import path from 'node:path'

import { commands_folder_dir } from '../config.json'

function loadCommands(iter: Function) {
  const commandsPath = commands_folder_dir
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    iter(command)
  }
}

export { loadCommands }
