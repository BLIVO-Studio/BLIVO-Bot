import fs from 'node:fs'

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { applicationId, guildId, commands_folder_dir } from '../config.json';
import { getToken } from './token'

const commands: any[] = [];

const commandFiles = fs.readdirSync(commands_folder_dir).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {    
	const command = require(`./commands/${file.replace('.ts', '')}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(getToken());

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data: any = await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {	
		console.error(error);
	}
})();
