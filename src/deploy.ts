import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { applicationId, guildId } from '../config.json';
import { getToken } from './token'
import { loadCommands } from './loader';
import { Command } from './type';

const commands: any[] = [];

loadCommands((command: Command) => {
   commands.push(command.data.toJSON()); 
});

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
